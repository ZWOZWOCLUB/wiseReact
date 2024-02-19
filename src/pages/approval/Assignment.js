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
import Calendar from '@toast-ui/react-calendar';
import { useEffect, useRef, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils.js';
import { useDispatch, useSelector } from 'react-redux';
import { callApprovalMemberInfoAPI } from '../../apis/ApprovalInfoAPICalls.js';
import { callRoleUpdateAPI } from '../../apis/ApprovalAPICalls.js';

function Assignment() {
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const navigate = useNavigate();
    const calendarRef = useRef();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendar, setCalendar] = useState(null);
    let [yearMonth, setYearMonth] = useState(null);
    const [calendarTheme, setCalendarTheme] = useState(null);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        proStartDate: '',
        proEndDate: '',
        proMemRole: token.memRole,
        roleMember: token.memCode,
        proMember: '',
    });
    // const dipatch = useDispatch();
    // const approvals = useSelector((state) => state.approvalReducer);
    // const approvalList = approvals.data;

    // console.log('approvalList ', approvalList);

    useEffect(() => {
        const options = {
            month: {
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                gridSelection: {
                    enableDblClick: false,
                    enableClick: true,
                },
            },
        };

        if (calendarRef.current) {
            const calendar = calendarRef.current.getInstance();
            calendar.setOptions(options);
            setCurrentDate(new Date());
        }
    }, []);

    let memberList = useSelector((state) => state.approvalInfoReducer);

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        console.log('foooorm', form);
    };

    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${year}년${month}월`;
    }

    function formatDate2(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const formattedDate = formatDate(currentDate);

        setYearMonth(formattedDate);
    }, [currentDate]);

    useEffect(() => {
        const calendar = calendarRef.current.getInstance();

        if (calendar) {
            calendar?.on('selectDateTime', (eventInfo) => {
                const proStartDate = formatDate2(eventInfo.start);
                const proEndDate = formatDate2(eventInfo.end);

                console.log('proStartDate---->', proStartDate);
                console.log('proEndDate---->', proEndDate);

                calendar.clearGridSelections();

                form.proEndDate = proEndDate;
                form.proStartDate = proStartDate;

                dispatch(
                    callApprovalMemberInfoAPI({
                        form: form,
                    })
                );
            });
        }
    }, []);

    function assignmentComplete() {
        console.log('comForm', form);

        dispatch(
            callRoleUpdateAPI({
                form: form,
            })
        );
        window.location.replace(`/main/Approval`);
    }

    console.log('dates', form.proStartDate);
    console.log('datee', form.proEndDate);

    useEffect(() => {
        setCalendar(calendarRef.current.getInstance());
    }, []);

    function setYearMonthFunction(calendar) {
        const Date = calendar.getDate();
        const Year = Date.getFullYear();
        const Month = (Date.getMonth() + 1).toString().padStart(2, '0');
        console.log(Year, Month);
        setYearMonth(Year + '년' + Month + '월');
        console.log(yearMonth);
    }

    const onClickToday = () => {
        calendar.today();
        setYearMonthFunction(calendar);
        console.log('c', form);
    };
    const onClickPrev = () => {
        calendar.prev();
        setYearMonthFunction(calendar);
        console.log(yearMonth);
    };
    const onClickNext = () => {
        calendar.next();
        setYearMonthFunction(calendar);
        console.log(yearMonth);
    };

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

    function clearClick() {
        window.location.replace('/main/Assignment');
    }

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
                                            <div className='container1'>
                                                <div id='calendarSize'>
                                                    <div id='assignmentArea'>
                                                        <div>
                                                            <button className='prev1' id='prev' onClick={onClickPrev}>
                                                                {'<'}
                                                            </button>
                                                            <span className='range1' id='range'>
                                                                {yearMonth}
                                                            </span>
                                                            <button className='next1' id='next' onClick={onClickNext}>
                                                                {'>'}
                                                            </button>
                                                        </div>
                                                        <button className='today1' id='today' onClick={onClickToday}>
                                                            Today
                                                        </button>
                                                    </div>
                                                    <Calendar
                                                        className='payment-calendar'
                                                        id='calendar'
                                                        ref={calendarRef}
                                                        view='month'
                                                        calendars={calendarRef.current && calendarTheme}
                                                        height={'350px'}
                                                        style={{ paddingRight: '20px' }}
                                                    />
                                                </div>
                                                <div className='payment-table'>
                                                    <h5>결재선정보</h5>
                                                    <hr />
                                                    <div className='assign-name'>
                                                        선택한 날짜
                                                        <input
                                                            type='date'
                                                            name='proStartDate'
                                                            id='select-assign'
                                                            className='select-assign1'
                                                            onChange={onChange}
                                                            readOnly
                                                            value={form.proStartDate}
                                                        />
                                                        <span id='spanMargind'>~</span>
                                                        <input
                                                            type='date'
                                                            name='proEndDate'
                                                            className='select-assign2'
                                                            onChange={onChange}
                                                            readOnly
                                                            value={form.proEndDate}
                                                        />
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
                                                            {Array.isArray(memberList) && memberList.length > 0 ? (
                                                                memberList.map((a) => (
                                                                    <tr key={a?.memCode}>
                                                                        <td>
                                                                            <input
                                                                                type='radio'
                                                                                value={a.memCode}
                                                                                onChange={onChange}
                                                                                name='proMember'
                                                                            />
                                                                        </td>
                                                                        <td>{a.memName}</td>
                                                                        <td>{a.position?.posName}</td>
                                                                        <td>{a.department?.depName}</td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan={4}>
                                                                        근무일정이 있는 인원이 없습니다.
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                    <div id='last-thing2'>
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
                                                        <button
                                                            type='button'
                                                            className='btn btn-primary'
                                                            id='complete-payment1'
                                                            onClick={assignmentComplete}
                                                        >
                                                            지정 완료
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
