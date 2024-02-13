import '../../@core/vendor/css/core.css';
import './approval.css';
import '../../@core/vendor/css/themeDefault.css';
import '../../@core/css/demo.css';
import '../../@core/css/pay.css';
import '../../@core/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import '../../@core/vendor/libs/apex-charts/apex-charts.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callReceiveApprovalAPI } from '../../apis/ApprovalAPICalls';

// const { useDispatch, useSelector } = require('react-redux');
const { useNavigate } = require('react-router-dom');

function Approval() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const approvalList = useSelector((state) => state.approvalReducer);

    useEffect(() => {
        dispatch(
            callReceiveApprovalAPI({
                memCode: 3,
            })
        );
    }, []);

    // const approvals = useSelector((state) => state.approvalReducer);
    // const approvalList = approvals.data;

    // console.log('approvalList ', approvalList);

    const onClickSendApproval = () => {
        console.log('onClickSendApproval click');
        navigate(`/SendApproval`, { replace: false });
    };

    const onClickAssignment = () => {
        console.log('Assignment click');
        navigate(`/Assignment`, { replace: false });
    };

    const onClickReceiveApproval = () => {
        console.log('ReceiveApproval click');
        navigate(`/Approval`, { replace: false });
    };

    const ondblclickapproval = () => {
        console.log('왔냐');
    };

    const requestApproval = () => {
        navigate(`/RequestApproval`, { replace: false });
    };

    return (
        <>
            <div className='layout-wrapper layout-content-navbar'>
                <div className='layout-container'>
                    <div className='layout-page'>
                        <div className='content-wrapper'>
                            <div className='container-xxl flex-grow-1 container-p-y'>
                                <h4 className='fw-bold py-3 mb-4'>
                                    <span className='text-muted fw-light'>결재 {'>'}</span> 받은 결재
                                </h4>
                                <div className='payment-line'>
                                    <ul className='nav nav-pills flex-column flex-md-row mb-3'>
                                        <li className='nav-item'>
                                            <button className='nav-link active' onClick={onClickReceiveApproval}>
                                                {' '}
                                                받은 결재
                                            </button>
                                        </li>
                                        <li className='nav-item'>
                                            <button className='nav-link' onClick={onClickSendApproval}>
                                                {' '}
                                                보낸 결재
                                            </button>
                                        </li>
                                        <li className='nav-item'>
                                            <button className='nav-link' onClick={onClickAssignment}>
                                                {' '}
                                                전결자 지정
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className='col-xxl'>
                                    <div className='card mb-4'>
                                        <div className='pay-top-wrapper'>
                                            <div></div>
                                            <input className='inputDate' type='date' /> ~
                                            <input className='inputDate' type='date' />
                                            <select name='payment-type1' className='payment-type1' id='payment-type1'>
                                                <option value='0'>결재유형</option>
                                            </select>
                                            <select
                                                name='payment-status'
                                                className='payment-status'
                                                id='payment-status'
                                            >
                                                <option value='0'>결재상태</option>
                                                <option value='1'>반려</option>
                                                <option value='2'>승인</option>
                                                <option value='3'>대기</option>
                                            </select>
                                            <input
                                                type='search'
                                                placeholder='결재 제목을 알려주세요 '
                                                style={{ width: '400px' }}
                                            />
                                            <img
                                                src='../../assets/img/paymentimg/search.png'
                                                style={{ width: '20px', marginLeft: '5px' }}
                                            />
                                            <button className='payment-insert-button' onClick={requestApproval}>
                                                결재신청
                                            </button>
                                        </div>
                                        <table className='table table-hover'>
                                            <thead>
                                                <tr style={{ backgroundColor: '#DCDCFF' }}>
                                                    <th>상신자</th>
                                                    <th>제목</th>
                                                    <th>요청일</th>
                                                    <th>반려/승인일</th>
                                                    <th>결재 유형</th>
                                                    <th>상태</th>
                                                    <th>참조자</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(approvalList) && approvalList.length > 0 ? (
                                                    approvalList.map((a) => (
                                                        <tr key={a.approval.payCode} onDoubleClick={ondblclickapproval}>
                                                            <td>{a.approval.approvalMember.memName}</td>
                                                            <td>{a.approval.payName}</td>
                                                            <td>{a.approval.payDate}</td>
                                                            <td>{a.appDate}</td>
                                                            <td>{a.approval.payKind}</td>
                                                            <td>{a.appState}</td>
                                                            <td>:</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan={6}
                                                            style={{
                                                                display: 'flex',
                                                                textAlign: 'center',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            보낸 결재가 없습니다.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Approval;
