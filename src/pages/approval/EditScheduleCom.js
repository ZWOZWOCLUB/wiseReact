import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callAprovalCompleteAPI } from '../../apis/ApprovalAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';

function EditScheduleCom(props) {
    console.log('props', props);

    console.log('ss', props.data?.approvalComplete[0]?.appCode);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = decodeJwt(window.localStorage.getItem('accessToken'));

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

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const approvalComplete = () => {
        console.log('form', form);
        dispatch(
            callAprovalCompleteAPI({
                form: form,
            })
        );

        // navigate(`/main/Approval`, { replace: false });
    };
    return (
        <>
            {props.data?.approvalComplete[0]?.appState === '대기' &&
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
            ) : props.data?.approvalComplete[0]?.approvalMember?.memCode !== token.memCode ? (
                <div></div>
            ) : (
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
            )}

            <hr style={{ marginTop: '50px' }} />

            <div className='approvalTemp'>
                <div id='margintop2'>
                    <div>제목</div>
                    <div>정정일</div>
                    <div>근무일</div>
                    <div>근무 시간</div>
                    <div style={{ marginTop: '115px' }}>내용</div>
                </div>
                <div id='margintop'>
                    <div>{props.data.approvalComplete[0]?.approval?.payName}</div>
                    <div>
                        {props.data.approvalType?.eshOffStartDate} ~ {props.data.approvalType?.eshOffEndDate}
                    </div>
                    <div>
                        {props.data.approvalType?.eshStartDate} ~ {props.data.approvalType?.eshEndDate}
                    </div>
                    <div>{props.data.approvalType?.eshDateType}</div>
                    <div name='vacContents' id='document-contents2'>
                        {props.data.approvalType?.eshContents}
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditScheduleCom;
