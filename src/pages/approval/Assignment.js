import '../../@core/vendor/css/core.css';
import '../../@core/vendor/css/themeDefault.css';
import '../../@core/css/demo.css';
import '../../@core/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import '../../@core/vendor/libs/apex-charts/apex-charts.css';
import './approval.css';
import '../../@core/css/pay.css';
import '../../@core/css/payment-assignment.css';
import '../../@core/css/tui-tree.css';
import '../../@core/css/payment-annual.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { useNavigate } from 'react-router-dom';
import Calendar from '@toast-ui/calendar';
import { useEffect, useRef, useState } from 'react';

function Assignment() {
    const navigate = useNavigate();
    const calendarRef = useRef(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    // const dipatch = useDispatch();
    // const approvals = useSelector((state) => state.approvalReducer);
    // const approvalList = approvals.data;

    // console.log('approvalList ', approvalList);

    useEffect(() => {
        if (calendarRef.current) {
            const container = calendarRef.current;

            const options = {
                defaultView: 'month',
                month: {
                    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                },
                timezone: {
                    zones: [
                        {
                            timezoneName: 'Asia/Seoul',
                            displayLabel: 'Seoul',
                        },
                        {
                            timezoneName: 'Europe/London',
                            displayLabel: 'London',
                        },
                    ],
                },
            };
            const calendar = new Calendar(container, options);

            calendar.setTheme({
                month: {
                    weekend: {
                        backgroundColor: 'aliceblue',
                    },
                },
            });
            setCurrentDate(new Date());

            const todayButton = document.getElementById('today');
            todayButton.addEventListener('click', function () {
                calendar.today();
                displayMonth();
            });

            const prevButton = document.getElementById('prev');
            prevButton.addEventListener('click', function () {
                calendar.prev();
                displayMonth();
            });

            const nextButton = document.getElementById('next');
            nextButton.addEventListener('click', function () {
                calendar.next();
                displayMonth();
            });

            const range = document.querySelector('.range');

            function displayMonth() {
                var currentDate = calendar.getDate();
                var year = currentDate.getFullYear();
                var month = currentDate.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month;
                }

                range.textContent = year + '년 ' + month + '월';
            }

            displayMonth();
        }
    }, []);

    const onClickSendApproval = () => {
        console.log('onClickSendApproval click');
        navigate(`/main/SendApproval`, { replace: false });
    };

    const onClickAssignment = () => {
        console.log('Assignment click');
        navigate(`/main/Assignment`, { replace: false });
    };

    const onClickReceiveApproval = () => {
        console.log('ReceiveApproval click');
        navigate(`/main/Approval`, { replace: false });
    };

    return (
        <>
            <div className='layout-wrapper layout-content-navbar'>
                <div className='layout-container'>
                    <div className='layout-page'>
                        <div className='content-wrapper'>
                            <div className='container-xxl flex-grow-1 container-p-y'>
                                <h4 className='fw-bold py-3 mb-4'>
                                    <span className='text-muted fw-light'>결재 {'>'}</span> 전결자 지정
                                </h4>
                                <div className='payment-line'>
                                    <ul className='nav nav-pills flex-column flex-md-row mb-3'>
                                        <li className='nav-item'>
                                            <button className='nav-link' onClick={onClickReceiveApproval}>
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
                                            <button className='nav-link active' onClick={onClickAssignment}>
                                                {' '}
                                                전결자 지정
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                <div className='col-xxl'>
                                    <div className='card mb-4'>
                                        <div className='pay-top-wrapper'>
                                            <div className='container'>
                                                <div>
                                                    <button className='prev' id='prev'>
                                                        {'<'}
                                                    </button>
                                                    <span className='range' id='range'></span>
                                                    <button className='next' id='next'>
                                                        {'>'}
                                                    </button>
                                                    <button className='today' id='today'>
                                                        Today
                                                    </button>
                                                    <div
                                                        className='payment-calendar'
                                                        id='calendar'
                                                        ref={calendarRef}
                                                    ></div>
                                                </div>
                                                <div className='payment-table'>
                                                    <h5>결재선정보</h5>
                                                    <hr />
                                                    <div className='assign-name'>
                                                        위탁할 결재선
                                                        <select
                                                            name='payment-assignment'
                                                            id='select-assign'
                                                            className='select-assign'
                                                        >
                                                            <option value='0'>--선택--</option>
                                                            <option value='1'>전권</option>
                                                            <option value='2'>휴가</option>
                                                        </select>
                                                    </div>
                                                    <table className='table table-hover'>
                                                        <thead>
                                                            <tr style={{ backgroundColor: '#DCDCFF' }}>
                                                                <th
                                                                    style={{ width: '40px ', alignItems: 'center' }}
                                                                ></th>
                                                                <th>이름</th>
                                                                <th>직위</th>
                                                                <th>부서</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <td>
                                                                <input
                                                                    type='radio'
                                                                    value='0'
                                                                    style={{ width: '40px', alignItems: 'center' }}
                                                                ></input>
                                                            </td>
                                                            <td>이동락</td>
                                                            <td>과장</td>
                                                            <td>외과 1팀</td>
                                                        </tbody>
                                                        <tbody>
                                                            <td>
                                                                <input
                                                                    type='radio'
                                                                    value='0'
                                                                    style={{ width: '40px', alignItems: 'center' }}
                                                                ></input>
                                                            </td>
                                                            <td>이동락</td>
                                                            <td>과장</td>
                                                            <td>외과 1팀</td>
                                                        </tbody>
                                                    </table>
                                                    <div id='last-thing2'>
                                                        <div
                                                            className='btn btn-danger'
                                                            id='clean-btn'
                                                            style={{
                                                                width: '20%',
                                                                boxShadow: '0px 0px 10px #bbbdfc',
                                                                backgroundColor: '#bbbdfc',
                                                                borderColor: '#bbbdfc',
                                                            }}
                                                        >
                                                            <b>초기화</b>
                                                        </div>
                                                        <button
                                                            type='button'
                                                            className='btn btn-primary'
                                                            id='complete-payment'
                                                        >
                                                            저장
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='layout-overlay layout-menu-toggle'></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Assignment;
