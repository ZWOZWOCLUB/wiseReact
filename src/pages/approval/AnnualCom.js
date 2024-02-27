import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callAprovalCompleteAPI } from '../../apis/ApprovalAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';

function AnnualCom(props) {
    console.log('props', props);

    console.log('ss', props.data?.approvalComplete[0]?.appCode);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('token', token.memCode);
    console.log('propsCode', props.data?.approvalComplete[0]?.approval.approvalMember.memCode);

    console.log('머여 ', props.data?.approvalComplete[0]?.approval.approvalMember.memCode === token.memCode);
    // console.log('래퍼런스', props.data?.refApprovalList[0]);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    const formattedDate = year + '-' + month + '-' + day;

    const [form, setForm] = useState({
        appCode: props?.data?.approvalComplete[0]?.appCode,
        appState: '',
        appComment: '',
        appDate: formattedDate,
    });

    useEffect(() => {
        setForm({
            appCode: props?.data?.approvalComplete[0]?.appCode,
            appState: '',
            appComment: '',
            appDate: formattedDate,
        });
    }, []);

    const onClickDocFileDown = async (index) => {
        try {
            const urlPath =
                'http://localhost:8001' +
                '/memberFiles/' +
                props.data.approvalType.approval.approvalMember.memCode +
                '/' +
                props.data.approvalAttachment[0]?.payAtcName +
                '.png';

            console.log(urlPath);

            const response = await fetch(urlPath); //파일 경로 지정
            const blob = await response.blob(); //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
            console.log('blobs', blob);
            const url = window.URL.createObjectURL(blob); //다운로드 링크 생성
            const link = document.createElement('a'); //a 요소 생성
            link.href = url; //url을 a태그의 href속성으로 지정
            link.setAttribute('download', props.data.approvalAttachment[0]?.payAtcOriginalName); //다운로드 파일 이름 지정
            document.body.appendChild(link); //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
            link.click(); //생성한 링크 클릭해서 파일 다운
            link.parentNode.removeChild(link); //a요소 제거
        } catch (error) {
            console.log('등록된 파일이 없습니다');
        }
    };

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const approvalComplete = () => {
        console.log('form', form);

        form.appCode = props?.data?.approvalComplete[0]?.appCode;
        dispatch(
            callAprovalCompleteAPI({
                form: form,
            })
        );

        // navigate(`/main/Approval`, { replace: false });
    };

    return (
        <>
            {props.data?.approvalComplete[0]?.appState !== '대기' ? (
                <div>
                    <div id='appDiv'>
                        <h1 style={{ color: '#bbbdfc' }}>{props.data?.approvalComplete[0]?.appState}</h1>
                    </div>
                    <div id='appComentBox'>
                        <span>결재의견 </span>
                        <div name='appComment' id='commentBox' style={{ padding: '20px' }}>
                            {props.data?.approvalComplete[0]?.appComment}
                        </div>
                    </div>
                </div>
            ) : props.data?.approvalComplete[0]?.appState === '대기' &&
              props.data?.approvalComplete[0]?.approval.approvalMember.memCode !== token.memCode ? (
                <div>
                    <div id='appDiv'>
                        <select id='comType' name='appState' onChange={onChange}>
                            <option value='0'>-- 선택 --</option>
                            <option value='승인'>승인</option>
                            <option value='반려'>반려</option>
                        </select>
                        <button
                            type='button'
                            className='btn btn-primary'
                            id='complete-payment1'
                            onClick={approvalComplete}
                        >
                            결재
                        </button>
                    </div>
                    <div id='appComentBox'>
                        <textarea
                            name='appComment'
                            onChange={onChange}
                            id='comentBox'
                            placeholder='결재 의견을 입력해주세요'
                        ></textarea>
                    </div>
                </div>
            ) : (
                <div></div>
            )}

            <hr style={{ marginTop: '50px' }} />

            <div className='approvalTemp'>
                <div id='margintop2'>
                    <div>제목</div>
                    <div>연차구분</div>
                    <div>신청일</div>
                    <div>내용</div>
                    {props.data.approvalAttachment[0] ? (
                        <>
                            <div>첨부파일</div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <div id='margintop'>
                    <div>{props.data.approvalComplete[0]?.approval?.payName}</div>
                    <div>{props.data.approvalType?.vacKind}</div>
                    <div>
                        {props.data.approvalType?.vacStartDate} ~ {props.data.approvalType?.vacEndDate}
                    </div>
                    <div name='vacContents' id='document-contents2'>
                        {props.data.approvalType?.vacContents}
                    </div>

                    {props.data.approvalAttachment[0] ? (
                        <div style={{ marginTop: '12%' }}>
                            {props.data.approvalAttachment[0]?.payAtcOriginalName}
                            <i
                                className='bx bx-down-arrow-alt'
                                style={{ cursor: 'pointer', marginLeft: 'auto', color: 'blue', marginRight: '0' }}
                                onClick={() => onClickDocFileDown()}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}

export default AnnualCom;
