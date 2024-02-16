import '../../@core/vendor/css/themeDefault.css';
import '../../assets/vendor/libs/jquery/jquery.js';
import '../../assets/vendor/libs/popper/popper.js';
import '../../assets/vendor/js/bootstrap.js';
import '../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js';
import '../../assets/vendor/js/menu.js';
import '../../assets/js/config.js';
import './noticeWrite.css';
import '../../assets/vendor/libs/apex-charts/apexcharts.js';
import { decodeJwt } from '../../utils/tokenUtils.js';
import { callNoticeInsertAPI } from '../../apis/NoticeAPICalls';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
function NoticeWrite() {
    const dispatch = useDispatch();
    const [noticeFiles, setNoticeFiles] = useState(null);
    const [noticefileUrl, setNoticefileUrl] = useState();
    const noticInput = useRef();
    const token = decodeJwt(window.localStorage.getItem('accessToken'));

    const createDate = new Date();
    const formattedDate = createDate.toISOString().slice(0, 10);
    const [currentDate, setCurrentDate] = useState(formattedDate);
    const [updateState, setUpdateState] = useState(false);
    const noticeList = useSelector((state) => state.noticeReducer);
    console.log('noticeList', noticeList);

    useEffect(() => {
        if (noticeFiles) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    setNoticefileUrl(result);
                }
            };
            fileReader.readAsDataURL(noticeFiles);
        }
    }, [noticeFiles]);

    const onChangeImageUpload = (e) => {
        const profile = e.target.files[0];
        setNoticeFiles(profile);
        console.log(profile);
    };

    const onClickImageUpload = () => {
        noticInput.current.click();
        console.log('~~~~~~~~~클릭');
    };

    const onChangeHandler = (e) => {
        setUpdateState(true);

        const { name, value } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        console.log(form);
    };

    const [form, setForm] = useState({
        notCode: '',
        notCodeNumber: '',
        notName: '',
        notComment: '',
        notView: 0,
        notCreateDate: currentDate,
        memCode: token.memCode,
        notDeleteStatus: 'N',
        notAllArmCheck: 'N',
    });
    console.log('form', form);

    const onClickNoticeInsertHandler = () => {
        console.log('onClickNoticeInsertHandler', onClickNoticeInsertHandler);

        const formData = new FormData();

        // formData.append("notCode", form.notCode)
        formData.append('notName', form.notName);
        formData.append('notComment', form.notComment);
        formData.append('notView', form.notView);
        formData.append('notCreateDate', form.notCreateDate);
        formData.append('memCode', form.memCode);
        formData.append('notDeleteStatus', form.notDeleteStatus);
        formData.append('notAllArmCheck', form.notAllArmCheck);

        formData.append('noticeFiles', noticeFiles);
        dispatch(callNoticeInsertAPI({ form: formData }));
    };

    const onClickNoticeUpdateHandler = () => {
        console.log('onClickNoticeUpdateHandler');

        const formData = new FormData();

        // 필요한 경우, 공지사항의 고유 ID를 formData에 추가
        // 이 예제에서는 'notId'를 공지사항의 고유 식별자로 가정
        formData.append('notCode', form.notCode); // 수정 대상 공지사항의 ID
        formData.append('notCodeNumber', form.notCodeNumber);
        formData.append('notName', form.notName);
        formData.append('notComment', form.notComment);
        formData.append('notView', form.notView);
        formData.append('notCreateDate', form.notCreateDate);
        formData.append('memCode', form.memCode);
        formData.append('notDeleteStatus', form.notDeleteStatus);
        formData.append('notAllArmCheck', form.notAllArmCheck);

        // 수정 API 호출
        // API 호출 함수와 엔드포인트는 프로젝트에 따라 다를 수 있습니다.
        // 예: dispatch(callNoticeUpdateAPI(formData));
    };

    return (
        <>
            <div className='layout-wrapper layout-content-navbar'>
                <div className='layout-container'>
                    <div className='layout-page'>
                        <div className='content-wrapper'>
                            <div className='container-xxl flex-grow-1 container-p-y'>
                                <h4 className='fw-bold py-3 mb-4'>
                                    <span className='text-muted fw-light'>공지사항 {'>'}</span> 공지작성
                                </h4>
                                {/* Basic Layout */}
                                <div className='col-xxl'>
                                    <div className='card mb-4'>
                                        <div className='row'>
                                            <div className='col-xl'>
                                                <div
                                                    className='pay-top-wrapper'
                                                    style={{ width: '60%', margin: '0 auto' }}
                                                >
                                                    <div style={{ width: '15%', color: '#8184ff' }}>
                                                        <b>공지작성</b>
                                                    </div>
                                                    {/* <div style="width: 100%;"></div> */}
                                                    {/* <div class="btn btn-primary" style="width: 15%;"><b>공지작성</b></div> */}
                                                </div>
                                                <div className='card-body' style={{ width: '60%', margin: '0 auto' }}>
                                                    <form>
                                                        <div className='mb-3'>
                                                            <label
                                                                className='form-label'
                                                                htmlFor='basic-default-fullname'
                                                            >
                                                                제목<span style={{ color: 'red' }}>*</span>
                                                            </label>
                                                            <input
                                                                className='form-control'
                                                                type='text'
                                                                id='notName'
                                                                name='notName'
                                                                placeholder='제목을 작성해 주세요.'
                                                                onChange={onChangeHandler}
                                                                value={form.notName}
                                                            />
                                                        </div>
                                                        <div className='mb-3'>
                                                            <label
                                                                className='form-label'
                                                                htmlFor='basic-default-message'
                                                            >
                                                                내용<span style={{ color: 'red' }}>*</span>
                                                            </label>
                                                            <textarea
                                                                id='basic-default-message'
                                                                name='notComment'
                                                                className='form-control'
                                                                placeholder='내용을 작성해주세요.'
                                                                style={{ height: 300 }}
                                                                onChange={onChangeHandler}
                                                                Value={form.notComment}
                                                            />
                                                        </div>
                                                        <div className='mb-3'>
                                                            <label htmlFor='formFileMultiple' className='form-label'>
                                                                파일 첨부
                                                            </label>
                                                            <div className='input-group'>
                                                                <input
                                                                    type='file'
                                                                    className='form-control'
                                                                    id='inputGroupFile02'
                                                                    name='noticeFiles'
                                                                    onChange={onChangeImageUpload}
                                                                    onClick={onClickImageUpload}
                                                                    ref={noticInput}
                                                                />
                                                                <label
                                                                    className='input-group-text'
                                                                    htmlFor='inputGroupFile02'
                                                                >
                                                                    Upload
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <label htmlFor='formFileMultiple' className='form-label'>
                                                            알림 설정
                                                        </label>
                                                        <div className='col-md'>
                                                            <div className='form-check form-check-inline mt-3'>
                                                                <input
                                                                    className='form-check-input'
                                                                    type='radio'
                                                                    name='notAllArmCheck'
                                                                    id='inlineRadio1'
                                                                    value='Y'
                                                                    checked={form.notAllArmCheck === 'Y'}
                                                                    onChange={onChangeHandler}
                                                                />
                                                                <label
                                                                    className='form-check-label'
                                                                    htmlFor='inlineRadio1'
                                                                >
                                                                    전송
                                                                </label>
                                                            </div>
                                                            <div className='form-check form-check-inline'>
                                                                <input
                                                                    className='form-check-input'
                                                                    type='radio'
                                                                    name='notAllArmCheck'
                                                                    id='inlineRadio2'
                                                                    value='N'
                                                                    checked={form.notAllArmCheck === 'N'}
                                                                    onChange={onChangeHandler}
                                                                />
                                                                <label
                                                                    className='form-check-label'
                                                                    htmlFor='inlineRadio2'
                                                                >
                                                                    전송하지 않음
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <br />
                                                    <hr className='m-0' />
                                                </div>
                                            </div>
                                            <div className='pay-top-wrapper'>
                                                {/* 삭제버튼입니다 */}
                                                <div style={{ width: '20%' }} />
                                                <div style={{ width: '37%' }} />
                                                <div
                                                    className='btn btn-danger'
                                                    style={{
                                                        width: '10%',
                                                        boxShadow: '0px 0px 10px #bbbdfc',
                                                        backgroundColor: '#bbbdfc',
                                                        borderColor: '#bbbdfc',
                                                    }}
                                                >
                                                    <b>닫기</b>
                                                </div>
                                                <div style={{ width: '2%' }} />
                                                <button
                                                    type='submit'
                                                    className='btn btn-primary'
                                                    style={{ width: '10%' }}
                                                    onClick={onClickNoticeInsertHandler}
                                                >
                                                    작성 완료
                                                </button>
                                                <div style={{ width: '20%' }} />
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
                    </div>
                </div>
            </div>
        </>
    );
}
export default NoticeWrite;
