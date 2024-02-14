import { useState } from 'react';
import '../../@core/css/customApproval.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { useDispatch } from 'react-redux';
import { callAprovalCompleteAPI } from '../../apis/ApprovalAPICalls';
import { useNavigate } from 'react-router-dom';

function ReqDocumentCom(props) {
    console.log('props', props);

    console.log('ss', props.data?.approvalComplete[0]?.appCode);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    console.log('appCode', form.appCode);

    const approvalComplete = () => {
        console.log('form', form);
        dispatch(
            callAprovalCompleteAPI({
                form: form,
            })
        );

        // navigate(`/Approval`, { replace: false });
    };
    return (
        <>
            {props.data?.approvalComplete[0]?.appState === '대기' ? (
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
            <div id='req-document-div'>
                <span style={{ paddingLeft: '50px' }}>종류</span>
                <span id='appKind'>{props.data.approvalType?.reqKind}</span>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '50px',
                }}
            >
                <label htmlFor='basic-default-message' style={{ paddingBottom: '40px' }}>
                    내용
                </label>
                <div name='reqUse' id='document-contents1'>
                    {props.data.approvalType?.reqUse}
                </div>
            </div>
        </>
    );
}

export default ReqDocumentCom;
