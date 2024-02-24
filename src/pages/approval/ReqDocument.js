import '../../@core/vendor/css/core.css';
import './approval.css';
import './req-document.css';
import '../../@core/vendor/css/themeDefault.css';
import '../../@core/css/demo.css';
import '../../@core/css/pay.css';
import '../../@core/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import '../../@core/vendor/libs/apex-charts/apex-charts.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import { callAprovalRequestDocumentAPI } from '../../apis/ApprovalAPICalls';

function ReqDocument({ appCodes, refCodes }) {
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const navigate = useNavigate();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    const formattedDate = year + '-' + month + '-' + day;

    const memberCode = appCodes;
    const refCode = refCodes;

    const [form, setForm] = useState({
        reqKind: '',
        reqUse: '',
        approval: {
            payDate: formattedDate,
            payKind: '서류 요청',
            approvalMember: {
                memCode: token.memCode,
            },
            payName: '서류 요청',
        },
        cMember: {
            memCode: memberCode,
        },
    });

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);

        const formattedDate = year + '-' + month + '-' + day;
        setForm({
            approval: {
                payDate: formattedDate,
                payKind: '서류 요청',
                approvalMember: {
                    memCode: token.memCode,
                },
                payName: '서류 요청',
            },
            cMember: {
                memCode: memberCode,
            },
            rMember: refCode,
        });
    }, [memberCode, refCode]);

    const dispatch = useDispatch();

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        console.log(form);
    };

    const approvalComplete = () => {
        const formData = new FormData();

        formData.append('reqKind', form.reqKind);
        formData.append('reqUse', form.reqUse);
        formData.append('approval.payDate', form.approval.payDate);
        formData.append('approval.approvalMember.memCode', form.approval.approvalMember.memCode);
        formData.append('approval.payName', form.approval.payName);
        formData.append('approval.payKind', form.approval.payKind);
        formData.append('cMember.memCode', form.cMember.memCode);
        form.rMember.forEach((memCode, index) => {
            formData.append(`rMember[${index}]`, memCode);
        });

        dispatch(
            callAprovalRequestDocumentAPI({
                form: formData,
            }),
            console.log('dt')
        );

        navigate(`/main/Approval`, { replace: false });
    };
    return (
        <>
            <div id='req-document-div1'>
                <span style={{ paddingLeft: '50px' }}>종류</span>
                <span style={{ color: 'red', marginRight: '40px' }}>*</span>
                <select name='reqKind' id='req-document' onChange={onChange}>
                    <option value='0'>--선택--</option>
                    <option value='재직증명서'>재직증명서</option>
                    <option value='경력증명서'>경력증명서</option>
                    <option value='연차확인서'>연차확인서</option>
                    <option value='소득증명서'>소득증명서</option>
                    <option value='근로계약서'>근로계약서</option>
                </select>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '50px',
                }}
            >
                <label htmlFor='basic-default-message' style={{ paddingBottom: '100px' }}>
                    내용<span style={{ color: 'red' }}>*</span>
                </label>
                <textarea
                    onChange={onChange}
                    name='reqUse'
                    id='document-contents'
                    placeholder='증명서 용도 및 기간(년) 등 구체적인 내용을 입력해주세요.'
                ></textarea>
            </div>
            <hr />
            <div id='last-thing'>
                <div
                    className='btn btn-danger'
                    id='clean-btn1'
                    style={{
                        width: '20%',
                        boxShadow: '0px 0px 10px #bbbdfc',
                        backgroundColor: '#bbbdfc',
                        borderColor: '#bbbdfc',
                    }}
                >
                    <b>초기화</b>
                </div>
                <button type='button' className='btn btn-primary' id='complete-payment1' onClick={approvalComplete}>
                    작성 완료
                </button>
            </div>
        </>
    );
}

export default ReqDocument;
