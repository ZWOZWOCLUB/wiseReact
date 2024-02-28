import '../../@core/vendor/css/core.css';
import './approval.css';
import '../../@core/vendor/css/themeDefault.css';
import '../../@core/css/demo.css';
import '../../@core/css/pay.css';
import '../../@core/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import '../../@core/vendor/libs/apex-charts/apex-charts.css';
import '../../@core/css/payment-annual.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { callAprovalCommuteAPI } from '../../apis/ApprovalAPICalls';

function EditCommute({ appCodes, refCodes }) {
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    const formattedDate = year + '-' + month + '-' + day;

    const memberCode = appCodes;
    const refCode = refCodes;

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);

        const formattedDate = year + '-' + month + '-' + day;
        setForm({
            approval: {
                payDate: formattedDate,
                payKind: '출퇴근 정정',
                approvalMember: {
                    memCode: token.memCode,
                },
                payName: '출퇴근 정정',
            },
            cMember: {
                memCode: memberCode,
            },
            rMember: refCode,
        });
    }, [memberCode, refCode]);
    function clearClick() {
        window.location.replace('/main/requestApproval');
    }

    const [img, setImg] = useState(null);

    const [form, setForm] = useState({
        ediKind: '',
        ediDate: '',
        ediContents: '',
        ediTime2: '',
        approval: {
            payDate: formattedDate,
            payKind: '출퇴근 정정',
            approvalMember: {
                memCode: token.memCode,
            },
            payName: '',
        },
        cMember: {
            memCode: memberCode,
        },
    });

    const dispatch = useDispatch();

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        console.log(form);
    };

    const changePayname = (payname) => {
        setForm((prevForm) => ({
            ...prevForm,
            approval: {
                ...prevForm.approval,
                payName: payname,
            },
        }));

        console.log(form);
    };

    const fileChange = (e) => {
        const file = e.target.files[0];

        console.log('file name : ', file.name);

        setImg(file);

        setForm((prevForm) => ({
            ...prevForm,
            file: file,
        }));
    };

    const approvalComplete = () => {
        console.log('form : ', form);

        const formData = new FormData();

        formData.append('ediKind', form.ediKind);
        formData.append('ediDate', form.ediDate);
        formData.append('ediTime', form.ediTime2);
        formData.append('ediContents', form.ediContents);
        formData.append('approval.payDate', form.approval.payDate);
        formData.append('approval.approvalMember.memCode', form.approval.approvalMember.memCode);
        formData.append('approval.payName', form.approval.payName);
        formData.append('approval.payKind', form.approval.payKind);
        formData.append('cMember.memCode', form.cMember.memCode);
        form.rMember.forEach((memCode, index) => {
            formData.append(`rMember[${index}]`, memCode);
        });

        if (form.file) {
            formData.append('approvalFile', form.file);
        }

        const confirmLeave = window.confirm('결재를 상신하시겠습니까? ');

        dispatch(
            callAprovalCommuteAPI({
                form: formData,
            })
        );
        if (confirmLeave) {
            navigate(`/main/Approval`, { replace: false });
        }

        console.log('time', formData.get('ediTime'));

        // navigate(`/main/Approval`, { replace: false });
    };

    return (
        <>
            <div>
                제목<span style={{ color: 'red' }}> *</span>{' '}
                <input type='text' id='input-name' onChange={(e) => changePayname(e.target.value)} name='payName' />
            </div>
            <div id='margintop'>
                <div>
                    신청구분<span style={{ color: 'red' }}> *</span>
                    <select
                        name='ediKind'
                        id='annual-type'
                        style={{ marginLeft: '10px', width: '77%' }}
                        onChange={onChange}
                    >
                        <option value='0'>--선택--</option>
                        <option value='퇴근시간'>퇴근시간</option>
                        <option value='출근시간'>출근시간</option>
                        <option value='결근'>결근</option>
                    </select>
                </div>
                <div>
                    정정일 / 시간<span style={{ color: 'red' }}> *</span>
                    <input type='date' id='annual-date' onChange={onChange} name='ediDate' />
                    <input type='time' id='annual-time' onChange={onChange} name='ediTime2' />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label for='basic-default-message'>
                        내용<span style={{ color: 'red' }}>*</span>
                    </label>
                    <textarea
                        id='annual-content'
                        placeholder='내용을 작성해주세요.'
                        style={{
                            height: '200px',
                            width: '80%',
                            marginLeft: '20px',
                        }}
                        onChange={onChange}
                        name='ediContents'
                    ></textarea>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label for='formFileMultiple' className='form-label' onChange={onChange}>
                        파일첨부
                    </label>

                    <div
                        className='input-group'
                        style={{
                            marginLeft: '20px',
                            width: '80%',
                            paddingBottom: '45px',
                        }}
                    >
                        <input
                            type='file'
                            className='form-control'
                            id='inputGroupFile02'
                            style={{
                                width: '70%',
                                height: '30px',
                                paddingBottom: '30px',
                            }}
                            name='approvalFile'
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={fileChange}
                        />
                    </div>
                </div>
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
                    onClick={clearClick}
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

export default EditCommute;
