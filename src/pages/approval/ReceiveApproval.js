import coreCSS from '../../@core/vendor/css/core.module.css';
import styles from './css/approval.module.css';
import thenmeCSS from '../../@core/vendor/css/themeDefault.module.css';

// const { useDispatch, useSelector } = require('react-redux');
const { useNavigate } = require('react-router-dom');

function ReceiveApproval() {
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
            <div className={`${coreCSS[`content-wrapper`]}`}>
                <div className={`${coreCSS[`container-xxl`]} ${coreCSS[`flex-grow-1`]} ${coreCSS[`container-p-y`]}`}>
                    <h4 className={`${coreCSS[`fw-bold`]} ${coreCSS[`py-`]} ${coreCSS[`mb-4`]}`}>
                        <span className={`${coreCSS[`text-muted`]} ${coreCSS[`fw-light`]}`}>결재 {'>'}</span>
                        받은 결재
                    </h4>
                    <div className={`${coreCSS[`payment-line`]}`}>
                        <ul
                            className={`${coreCSS[`nav`]} ${coreCSS[`nav-pills`]} ${coreCSS[`flex-column`]} ${
                                coreCSS[`flex-md-row`]
                            } ${coreCSS[`mb-3`]}`}
                        >
                            <li className={`${coreCSS[`nav-item`]}`}>
                                <button
                                    className={`${coreCSS[`nav-link`]} ${coreCSS[`active`]}`}
                                    onClick={onClickReceiveApproval}
                                >
                                    {' '}
                                    받은 결재
                                </button>
                            </li>
                            <li className={`${coreCSS[`nav-item`]}`}>
                                <button
                                    className={`${coreCSS[`nav-link`]} ${coreCSS[`active`]}`}
                                    onClick={onClickSendApproval}
                                >
                                    {' '}
                                    보낸 결재
                                </button>
                            </li>
                            <li className={`${coreCSS[`nav-item`]}`}>
                                <button
                                    className={`${coreCSS[`nav-link`]} ${coreCSS[`active`]}`}
                                    onClick={onClickAssignment}
                                >
                                    {' '}
                                    전결자 지정
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className={`${coreCSS[`col-xxl`]}`}>
                        <div className={`${coreCSS[`card mb-4`]}`}>
                            <div className={`${styles[`payTopWrapper`]}`}>
                                <input className={`${styles[`inputDate`]}`} type='date' /> ~
                                <input className={styles.inputDate} type='date' />
                                <select name='paymentType' className={styles.paymentType} id='paymentType'>
                                    <option value='0'>결재유형</option>
                                </select>
                                <select name='paymentStatus' className={styles.paymentStatus} id='paymentStatus'>
                                    <option value='0'>결재상태</option>
                                    <option value='1'>반려</option>
                                    <option value='2'>승인</option>
                                    <option value='3'>대기</option>
                                </select>
                                <input type='search' placeholder='결재 제목을 알려주세요 ' style={{ width: '400px' }} />
                                <img
                                    src='../../assets/img/paymentimg/search.png'
                                    style={{ width: '20px', marginLeft: '5px' }}
                                    alt='Search Icon'
                                />
                                <button className={styles.paymentInsertButton}>결재신청</button>
                            </div>
                            <table className='table table-hover'>
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
                                <tbody>
                                    <td>이현강</td>
                                    <td>휴가가겠읍니다</td>
                                    <td>2024-01-22</td>
                                    <td></td>
                                    <td>연차</td>
                                    <td>대기</td>
                                    <td>아이콘</td>
                                    <td>:</td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReceiveApproval;
