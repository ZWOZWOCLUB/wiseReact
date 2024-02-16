import '../../assets/vendor/libs/jquery/jquery.js';
import '../../assets/vendor/libs/popper/popper.js';
import '../../assets/vendor/js/bootstrap.js';
import '../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js';
import '../../assets/vendor/js/menu.js';
import '../../assets/js/config.js';
import '../../@core/vendor/css/themeDefault.css';
import '../../@core/vendor/css/core.module.css';
import './noticeDetail.css';
import { decodeJwt } from '../../utils/tokenUtils.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callDetailNoticeAPI } from '../../apis/NoticeAPICalls.js';
import { callNoticeCommentAPI } from '../../apis/NoticeCommentAPICall.js';
import { useEffect, useState } from 'react';
import { callNoticeCommentInsertAPI } from '../../apis/NoticeCommentAPICall.js';

function NoticeDetail() {
    const { data } = useSelector((state) => state.someReducer) || {};
    console.log('useSelector : ', useSelector);
    // console.log("data : ",data);
const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const { notCode } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const detail = useSelector((state) => state.noticeReducer);
    const comment = useSelector((state) => state.notCommentReducer);
    console.log("commmmmment",comment);
    
    // const comment = useSelector((state) => state.noticeReducer);
    console.log('!!!!!!!!!!!!!!!!', detail);
    // console.log('ccoommmmeenntt', comment);
    const comDate = new Date();
    const formattedDate = comDate.toISOString().slice(0, 10);
    const [currentDate, setCurrentDate] = useState(formattedDate);
    // const noticeDetail = useSelector(state => state.noticeDetail);
    const [noticeDetail, setNoticeDetail] = useState();
    const [searchNotice, setSearchNotice] = useState([]);
    const [updateState, setUpdateState] = useState(false);
    console.log('notCode: ', notCode);

    useEffect(() => {
        dispatch(callDetailNoticeAPI({ notCode }));
    }, [notCode]);

    useEffect(() => {
        if (notCode) {
            dispatch(callNoticeCommentAPI({ notCode }));
        }
    }, [notCode]);

    // 댓글 데이터를 리덕스 스토어에서 가져오기
    const comments = useSelector((state) => state.notCommentReducer);
    console.log('commentscomments', comments);
    console.log('file', detail[0]?.notAttachedFile);
    console.log('cm', comments);

    const onClickNoticeMain = () => {
        // 목록
        console.log('NoticeMain click');
        navigate(`/main/notice`, { replace: false });
    };
    
    const [form, setForm] = useState({
        comCode: '',
        comContents: '',
        comDate: currentDate,
        memCode: token.memCode,
        comDeleteState: 'N',
        notCode: notCode,
    });
    console.log(form);
    console.log("comments.comMember",comments);
    
    

    const onClickNoticeCommentInsertHandler = (e) => {
        e.preventDefault();
        console.log('onClickNoticeCommentInsertHandler', onClickNoticeCommentInsertHandler);

        const commentData = {
            comContents: form.comContents,
            comDate: form.comDate,
            comMember: { memCode: form.memCode }, // 객체 형태로 memCode 지정
            comDeleteState: form.comDeleteState,
            notCode: { notCode: form.notCode }, // 객체 형태로 notCode 지정
        };
        
        dispatch(callNoticeCommentInsertAPI({form: commentData}))
            
    };
    
    console.log("댓글 등록");
    console.log('form',form);
    console.log('comments', comments);

    const onChangeHandler = (e) => {
        setUpdateState(true);

        const { name, value } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        console.log(form);
    };

    return (
        <>
            <div className='layout-wrapper layout-content-navbar'>
                <div className='layout-container'>
                    <div className='layout-page'>
                        <div className='content-wrapper'>
                            <div className='container-xxl flex-grow-1 container-p-y'>
                                <h4 className='fw-bold py-3 mb-4'>
                                    <span className='text-muted fw-light' />
                                </h4>
                                <div className='col-xxl'>
                                    <div className='card mb-4'>
                                        <div className='row'>
                                            <div className='col-xl'>
                                                <div
                                                    className='pay-top-wrapper'
                                                    style={{ width: '80%', margin: '0 auto' }}
                                                >
                                                    <div style={{ color: '#8184ff' }}>
                                                        <b>공지사항</b>
                                                    </div>
                                                </div>
                                                <div className='card-body' style={{ width: '80%', margin: '0 auto' }}>
                                                    <div className='card-title' style={{ fontSize: 20 }}>
                                                        {detail.length > 0 && detail[0].notName}
                                                    </div>
                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ width: '20%' }}>
                                                            작성일 :{' '}
                                                            {detail.length > 0 &&
                                                                new Date(detail[0].notCreateDate)
                                                                    .toLocaleDateString('ko-KR', {
                                                                        year: 'numeric',
                                                                        month: '2-digit',
                                                                        day: '2-digit',
                                                                    })
                                                                    .replace(/. /g, '-')
                                                                    .slice(0, -1)}
                                                        </div>

                                                        <div style={{ width: '25%' }}>
                                                            작성자 :{' '}
                                                            {detail.length > 0 && detail[0].notMember?.posCode?.posName}{' '}
                                                            {detail.length > 0 && detail[0].notMember?.memName}
                                                        </div>
                                                        <div>조회수 : {detail.length > 0 && detail[0].notView}</div>
                                                    </div>
                                                    <br />
                                                    <hr className='m-0' />
                                                    <br />
                                                    <div
                                                        style={{
                                                            height: '90%',
                                                            backgroundColor: '#fafafa',
                                                            padding: '3%',
                                                            borderRadius: 5,
                                                            border: '1px solid #e6e6e6',
                                                        }}
                                                    >
                                                        {/* {내용}  */}
                                                        {detail.length > 0 && detail[0].notComment}
                                                    </div>

                                                    <br />
                                                    <hr className='m-0' />
                                                    <br />
                                                    <label className='form-label' htmlFor='basic-default-message'>
                                                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAMVJREFUSEvt1jGKAkEQheHPUxisiG6yXsBEEPcGnscb6IU2FTfeyEwEUTDxFCsDIyj0TDEzTjadVtX7ux5Fdfe0fHot60sBllhjUgI/YIFbdMEU4IqPqBBHzCNICvCfixfZ94hnaSfMyiBNAGeMok6aAAb4xWdZJ00AWW0fO3wVQZoAUnPwh+lzoA5gi++SKXvRrAMo0k5OXwd4tquzKFx/nUXvs+iCYSiXTshW+DjaRdmTuck3ZBXOHiv8RIAqomFu67+KO/FSNxktQEWgAAAAAElFTkSuQmCC' />{' '}
                                                        첨부파일
                                                    </label>
                                                    <div style={{ display: 'flex' }}>
                                                        {detail.length > 0 &&
                                                            detail[0].notAttachedFile.length > 0 &&
                                                            detail[0]?.notAttachedFile?.map((file, index) => (
                                                                <div
                                                                    key={index}
                                                                    style={{
                                                                        backgroundColor: '#d9d9d9',
                                                                        borderRadius: 5,
                                                                        fontSize: 12,
                                                                        padding: 2,
                                                                        display: 'inline-block',
                                                                        marginRight: '4px', // 오른쪽 여백 추가
                                                                    }}
                                                                >
                                                                    {file.notAtcName}
                                                                </div>
                                                            ))}
                                                    </div>

                                                    <br />
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        {comments.length > 0 &&
                                                            comments.map((comment, index) => (
                                                                <div
                                                                    key={index}
                                                                    style={{ display: 'flex', marginBottom: '10px' }}
                                                                >
                                                                    <div style={{ padding: 3, fontSize: 'small' }}>
                                                                        {comment.comMember.posCode.posName}{' '}
                                                                        {comment.comMember.memName}
                                                                    </div>
                                                                    <div style={{ width: '2%' }} />
                                                                    <div
                                                                        style={{
                                                                            position: 'relative',
                                                                            width: '75%',
                                                                            padding: 3,
                                                                            borderRadius: 5,
                                                                            border: '1px solid #e6e6e6',
                                                                        }}
                                                                    >
                                                                        {comment.comContents}
                                                                        <div
                                                                            className='date'
                                                                            style={{
                                                                                fontSize: 12,
                                                                                color: 'lightgray',
                                                                                textAlign: 'right',
                                                                            }}
                                                                        >
                                                                            {new Date(comment.comDate)
                                                                                .toLocaleDateString('ko-KR', {
                                                                                    year: 'numeric',
                                                                                    month: '2-digit',
                                                                                    day: '2-digit',
                                                                                })
                                                                                .replace(/\./g, '-')
                                                                                .slice(0, -1)}
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                position: 'absolute',
                                                                                top: '-10px',
                                                                                right: '-10px',
                                                                            }}
                                                                        >
                                                                            <img
                                                                                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAgBJREFUSEu11UuojlEUBuDnjFASUZJyG7hEKEPXiXIZYaCkDChGUsrINWODkyKGZGIgA6WUXDOSZCAkl6IkRSly963af/a/7e//zzl11uzb31rrXet91157wCjbwCjn1w9gDLZgHZZgFv7gFR7iKi7hR1uhvQDW41RK2qvR59iD6zWnNoCjTaVHhkHfbxzAiTKmBnAMh4eRPHfdh8H8oATYiCsjTB5h0clK3OvkyAHG4xmmVQA+NpVNKs5rZ+HytBF+Mb7HRw4QQp2uJA+6LuA2pqf/b7EKO1ro3ITLJUBQExTl9rVxXJo6m4Nb6Wckf4m5eIQY59zOYncJ8CarMHd+hzWp9dmJ59dYgBtN11MrXT/AshLgC8a1CPwBKxJIuCxsQG9iSov/p45muQafEULXrASYh7s9ACLXhLKDJ4jA0t43VKxG/I9VERarIii6g8mVmMepy64piknZVjh/wyLEOojkkTAs6Aod5qedVIp8Lk1YF8B2nK9U0zamy7EThyoxW3GxpCgEDhpmVAJqlyqEnFjxjcsaFy26/29dr8W1FqGHchyrIka6Q2X1PTiI40PJVvHZ24h+Mj9vW9fBa2zVfg9SJ9cv7C83aY2iHDzWxpmW2537xYTtytZIV2P9Khzb7JrN2JCEm5mezBe4n/SKpfazjdJ+ACOU4l/YqAP8BfGTXRkJ43i2AAAAAElFTkSuQmCC'
                                                                                alt='Close'
                                                                                style={{ width: 20, height: 20 }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                                        
                                                    <form>
                                                        <label className='form-label' htmlFor='basic-default-message'>
                                                            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAg5JREFUSEu11cvLTlEUBvDfJ7diQohMpEgp/gFEch0g90syMXDJwMTAX+CbKdcSCUXIRCRJGZAywMCAJBMUQim5FM6qvevY3s8576tv19tbe6+9nrWevZ7n9Bnk1TfI+TUBjMNiLMVsTMEvvMQj3MBNfBio0IEAZuIQFrToMABvYReel/GdADbiLIbiKy7gcqr0R0owLHW2HhswAt+wBtfqICVAUBEBQ3ARu/G+oYsJOIEViALmVZTez3fqAKPxDJNwHDtb0JNDoqDoejOeYha+x2EdYB/6q9bvYS5+dgEQoSPxsKJ0BrbiXAnwOCHPrx73Ti35kfSARxNlcdRpL/bXJWpjupaVAJ8RNI3ClxpATElJaae9iJmIN1Uh7xBv8wdFb6vKxqeDCMirmw7GJE18xNgSIGZ5Yfrd7pL/HL48TeHdShtzSoAdOJZEs6gHgNDGg6T4PThcAgzHi2qmJ2MvDnYBEmN6BlvwGtPyO5ZCC5EEVVFNWMWBdOFfWFk3WWircL2T0PLeWpxPVhFauFoZW1yqr7CGJZWoNmE1ovtXyTaC/7/GrqxwauogHi1TGQZ4BdOL4FDsyUq5+/GpTNRk13netydxReWRMOz6SaLzUpr7jjS2BciXwwC3JZdtNQNtAULZ4aynW2Vt8QY5JCgKd1yZ/rvN3/jJPJWMLj48Pa0minpK2mZM/ztxTvAbP2loGSXw8dEAAAAASUVORK5CYII=' />{' '}
                                                            댓글
                                                        </label>
                                                        <div className='mb-3' style={{ display: 'flex' }}>
                                                            <textarea
                                                                id='basic-default-message'
                                                                name='comContents'
                                                                className='form-control'
                                                                placeholder='내용을 입력해주세요.'
                                                                onChange={onChangeHandler}
                                                                value={form.comContents}
                                                            />
                                                            </div>
                                                            </form>
                                                            
                                                            <div style={{ width: '3%' }} />
                                                            <button
                                                                type='submit'
                                                                className='btn btn-primary'
                                                                style={{ width: '11%' }}
                                                                onClick={onClickNoticeCommentInsertHandler}
                                                                >
                                                                등록하기
                                                            </button>
                                                            <div style={{ width: '1%' }} />
                                                </div>
                                                <br />
                                            </div>
                                        </div>
                                        <div className='pay-top-wrapper' style={{ width: '80%', margin: '0 auto' }}>
                                            {/* 삭제버튼입니다 */}
                                            <div />
                                            <a
                                                className='btn btn btn-primary'
                                                style={{ width: '10%' }}
                                                onClick={onClickNoticeMain}
                                            >
                                                목록
                                            </a>
                                            {/* <button type="submit" class="btn btn-primary" style="width: 10%;">목록</button> */}
                                            <div style={{ width: '67%' }} />
                                            <div className='btn btn-danger' style={{ width: '10%' }}>
                                                <b>삭제</b>
                                            </div>
                                            <div style={{ width: '2%' }} />
                                            <button type='submit' className='btn btn-primary' style={{ width: '10%' }}>
                                                수정
                                            </button>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                                {/* Content wrapper */}
                            </div>
                            {/* / Layout page */}
                        </div>
                        {/* Overlay */}
                        <div className='layout-overlay layout-menu-toggle' />
                    </div>
                    {/* / Layout wrapper */}
                    {/* Core JS */}
                    {/* build:js assets/vendor/js/core.js */}
                    {/* endbuild */}
                    {/* Vendors JS */}
                    {/* Main JS */}
                    {/* Page JS */}
                    {/* Place this tag in your head or just before your close body tag. */}
                </div>
            </div>
        </>
    );
}

export default NoticeDetail;
