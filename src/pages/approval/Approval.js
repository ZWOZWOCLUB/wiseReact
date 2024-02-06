import '../../@core/vendor/css/core.css';
import './approval.css';
import '../../@core/vendor/css/themeDefault.css';
import '../../@core/css/demo.css';
import '../../@core/css/pay.css';
import '../../@core/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import '../../@core/vendor/libs/apex-charts/apex-charts.css';

// const { useDispatch, useSelector } = require('react-redux');
const { useNavigate } = require('react-router-dom');

function Approval() {
    const navigate = useNavigate();
    // const dipatch = useDispatch();
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

    return (
        <>
            <div class='layout-wrapper layout-content-navbar'>
                <div class='layout-container'>
                    <div class='layout-page'>
                        <div class='content-wrapper'>
                            <div class='container-xxl flex-grow-1 container-p-y'>
                                <h4 class='fw-bold py-3 mb-4'>
                                    <span class='text-muted fw-light'>결재 {'>'}</span> 받은 결재
                                </h4>
                                <div class='payment-line'>
                                    <ul class='nav nav-pills flex-column flex-md-row mb-3'>
                                        <li class='nav-item'>
                                            <button class='nav-link active' onClick={onClickReceiveApproval}>
                                                {' '}
                                                받은 결재
                                            </button>
                                        </li>
                                        <li class='nav-item'>
                                            <button class='nav-link' onClick={onClickSendApproval}>
                                                {' '}
                                                보낸 결재
                                            </button>
                                        </li>
                                        <li class='nav-item'>
                                            <button class='nav-link' onClick={onClickAssignment}>
                                                {' '}
                                                전결자 지정
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div class='col-xxl'>
                                    <div class='card mb-4'>
                                        <div class='pay-top-wrapper'>
                                            <div></div>
                                            <input class='inputDate' type='date' /> ~
                                            <input class='inputDate' type='date' />
                                            <select name='payment-type' class='payment-type' id='payment-type'>
                                                <option value='0'>결재유형</option>
                                            </select>
                                            <select name='payment-status' class='payment-status' id='payment-status'>
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
                                            <button class='payment-insert-button'>결재신청</button>
                                        </div>
                                        <table class='table table-hover'>
                                            <thead>
                                                <tr style={{ backgroundColor: '#DCDCFF' }}>
                                                    <th>보낸이</th>
                                                    <th>제목</th>
                                                    <th>요청일</th>
                                                    <th>반려/승인일</th>
                                                    <th>결재 유형</th>
                                                    <th>상태</th>
                                                    <th>참조자</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <td>이현강</td>
                                            <td>휴가가겠읍니다</td>
                                            <td>2024-01-22</td>
                                            <td></td>
                                            <td>연차</td>
                                            <td>대기</td>
                                            <td>아이콘</td>
                                            <td>:</td>
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
