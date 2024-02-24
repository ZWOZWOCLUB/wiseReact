import { useNavigate, useParams } from 'react-router-dom';
import './Main.css';
import { useEffect, useRef, useState, useMemo } from 'react';
import '../@core/css/customMain.css';
import Calendar from '@toast-ui/react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { searchAttendanceDateInfoAPICalls } from '../apis/SearchAttendanceDateInfoAPICalls';
import { decodeJwt } from '../utils/tokenUtils';
import { callAttendanceTodayInfoAPI } from '../apis/ApprovalInfoAPICalls';
import { attendanceEndAPICalls, attendanceStartAPICalls } from '../apis/AttendanceAPICalls';
import { callScheduleSearchAPI } from '../apis/ScheduleAPICalls';
import { callScheduleSearETCAPI } from '../apis/ScheduleSearchETCAPICalls';
import { callScheduleMainSearchAPI } from '../apis/ApprovalTypeInfo';

function Main() {
    const navigate = useNavigate();

    console.log('-------토큰-------', window.localStorage.getItem('accessToken'));

    const [calendar, setCalendar] = useState(null);
    let [yearMonth, setYearMonth] = useState(null);
    const [calendarTheme, setCalendarTheme] = useState(null);
    const calendarRef = useRef();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentTime1, setCurrentTime1] = useState(new Date());
    const [check, setCheck] = useState({ id: '' });
    const dispatch = useDispatch();
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const [events, setEvents] = useState([]);
    const ETCList = useSelector((state) => state.scheduleSearchETCReducer);
    const scheduleList = useSelector((state) => state.approvalTypeReducer);

    const [form, setForm] = useState({
        memCode: token.memCode,
        searchDate: '',
    });

    const [start, setStart] = useState({
        attStartTime: '',
        attEndTime: '',
        attWorkDate: '',
        attendanceMember: {
            memCode: token.memCode,
        },
        attValue: '0',
    });

    const attendance = useSelector((state) => state.approvalInfoReducer);

    console.log('attendance', attendance);

    useEffect(() => {
        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
        const day = new Date().getDate().toString().padStart(2, '0');

        form.searchDate = `${year}-${month}-${day}`;

        dispatch(
            callAttendanceTodayInfoAPI({
                form,
            })
        );
        // }, [currentTime]);
    }, []);

    function getMonthDays(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    }

    function getWeekDays(daysInMonth, firstDayOfWeek) {
        const weeks = [];
        let currentWeek = [];
        daysInMonth.forEach((day) => {
            if (day.getDay() === firstDayOfWeek && currentWeek.length > 0) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
            currentWeek.push(day);
        });
        if (currentWeek.length > 0) {
            weeks.push(currentWeek);
        }
        return weeks;
    }

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    const getDayName = (dayCode) => {
        return dayNames[dayCode];
    };

    const updateEvents = (date) => {
        const days = getMonthDays(date.getFullYear(), date.getMonth());
        const firstDayOfWeek = days[0].getDay();
        const weeks = getWeekDays(days, firstDayOfWeek);
        const updatedEvents = [];

        weeks.forEach((week) => {
            week.forEach((day) => {
                const matchingSchedules = scheduleList.filter((schedule) => {
                    const startDate = new Date(schedule.schStartDate);
                    const endDate = new Date(schedule.schEndDate);
                    return day >= startDate && day <= endDate;
                });

                matchingSchedules.forEach((schedule) => {
                    let shouldDisplayEvent = false;

                    schedule.patternDayList.forEach((pattern) => {
                        if (pattern.weekDay.dayName === getDayName(day.getDay())) {
                            shouldDisplayEvent = true;
                        }
                    });

                    if (shouldDisplayEvent) {
                        updatedEvents.push({
                            id: `event_${day.getDate()}_${schedule.schCode}`,
                            calendarId: 'cal1',
                            title: schedule.schType + ' ',
                            start: day,
                            end: day,
                            category: 'allday',
                            backgroundColor: schedule.schColor,
                        });
                    }
                });
            });
        });
        console.log('업데이트 이벤트 ');

        setEvents(updatedEvents);
    };

    useEffect(() => {
        setCalendar(calendarRef?.current?.getInstance());
    }, []);

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

        if (calendarRef?.current) {
            const calendar = calendarRef.current.getInstance();
            calendar.setOptions(options);
            setCurrentDate(new Date());
        }
    }, []);

    function setYearMonthFunction(calendar) {
        const Date = calendar.getDate();
        const Year = Date.getFullYear();
        const Month = (Date.getMonth() + 1).toString().padStart(2, '0');
        setYearMonth(Year + '년' + Month + '월');
    }

    useEffect(() => {
        const formattedDate = formatDate2(currentDate);

        setYearMonth(formattedDate);
    }, [currentDate]);

    const onClickToday = () => {
        calendar.today();
        setYearMonthFunction(calendar);
        updateEvents(calendar.getDate());
        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
        const day = new Date().getDate().toString().padStart(2, '0');

        form.searchDate = `${year}-${month}-${day}`;
        setCurrentTime1(new Date());

        dispatch(
            searchAttendanceDateInfoAPICalls({
                form,
            })
        );
    };
    const onClickPrev = () => {
        calendar.prev();
        setYearMonthFunction(calendar);
        updateEvents(calendar.getDate());
    };

    const onClickNext = () => {
        calendar.next();
        setYearMonthFunction(calendar);
        updateEvents(calendar.getDate());
    };

    useEffect(() => {
        dispatch(callScheduleSearETCAPI());
    }, [dispatch]);

    useEffect(() => {
        updateEvents(currentDate);
    }, [scheduleList, currentDate]);

    useEffect(() => {
        const formattedDate = formatDatee(currentDate);
        setYearMonth(formattedDate);
        form.searchDate = formattedDate;
        dispatch(callScheduleMainSearchAPI({ yearMonth: form }));
        console.log('yearMonth : ', yearMonth);
        console.log('formattedDate : ', formattedDate);

        updateEvents(currentDate);
    }, []);

    function formatDatee(date) {
        const month2 = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${date.getFullYear()}-${month2}`;
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
    }

    function formatDate2(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${year}년 ${month}월`;
    }

    function formatDate3(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function formatDate4(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
        const day = new Date().getDate().toString().padStart(2, '0');

        form.searchDate = `${year}-${month}-${day}`;

        dispatch(
            searchAttendanceDateInfoAPICalls({
                form,
            })
        );
    }, []);

    useEffect(() => {
        const calendar = calendarRef?.current?.getInstance();

        const handleSelectDateTime = async (eventInfo) => {
            const year = new Date(eventInfo.start).getFullYear();
            const month = (new Date(eventInfo.start).getMonth() + 1).toString().padStart(2, '0');
            const day = new Date(eventInfo.start).getDate().toString().padStart(2, '0');

            calendar.clearGridSelections();

            form.searchDate = `${year}-${month}-${day}`;

            setCurrentTime1(eventInfo.start);

            await dispatch(
                searchAttendanceDateInfoAPICalls({
                    form,
                })
            );
        };

        calendar?.on('selectDateTime', handleSelectDateTime);
    }, []);

    const attendanceList = useSelector((state) => state.attendanceInfoReducer);

    function clickStart() {
        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
        const day = new Date().getDate().toString().padStart(2, '0');
        const hours = new Date().getHours().toString().padStart(2, '0');
        const minutes = new Date().getMinutes().toString().padStart(2, '0');
        const seconds = new Date().getSeconds().toString().padStart(2, '0');

        start.attWorkDate = `${year}-${month}-${day}`;
        start.attStartTime = `${hours}:${minutes}:${seconds}`;

        dispatch(
            attendanceStartAPICalls({
                start,
            })
        );
        window.location.reload();
    }

    function clickEnd() {
        const hours = new Date().getHours().toString().padStart(2, '0');
        const minutes = new Date().getMinutes().toString().padStart(2, '0');
        const seconds = new Date().getSeconds().toString().padStart(2, '0');

        start.attEndTime = `${hours}:${minutes}:${seconds}`;
        start.attValue = 1;

        dispatch(
            attendanceEndAPICalls({
                start,
            })
        );

        window.location.reload();
    }
    return (
        <>
            <div className='container-xxl flex-grow-1 container-p-y'>
                {/*결재 관리*/}
                <div className='card-body'>
                    <div className='row main-flex'>
                        <div className='col-lg-4'>
                            <div className='card mb-4 mb-lg-0'>
                                <div className='card-body'>
                                    <p className='main-att-date'>결재 현황</p>
                                    <div id='flexCard'>
                                        <div className='cardStyle'>
                                            <div style={{ color: 'blue' }}>{attendance?.completeNumber}</div>
                                            <div className='marginTopMain'>승인</div>
                                        </div>
                                        <div className='cardStyle'>
                                            <div style={{ color: 'red' }}>{attendance?.nagativeNumber}</div>
                                            <div className='marginTopMain'>반려</div>
                                        </div>
                                        <div className='cardStyle'>
                                            <div style={{ color: 'aquamarine' }}>{attendance?.stayNumber}</div>
                                            <div className='marginTopMain'>대기</div>
                                        </div>
                                        <div className='cardStyle'>
                                            <div style={{ color: 'yellow' }}>{attendance?.referencerNumber}</div>
                                            <div className='marginTopMain'>참조</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 근태관리 */}
                        <div className='col-lg-8'>
                            <div className='card mb-4'>
                                <div className='main-flex main-between'>
                                    <p className='card-header main-att-date'>{formatDate(currentTime)}</p>
                                </div>
                                <div className='card-body main-flex main-between' style={{ marginTop: '4%' }}>
                                    <div className='main-att-btn'>
                                        <button
                                            className='btn btn-primary btn-lg'
                                            onClick={clickStart}
                                            disabled={
                                                attendance?.attValue === 1 ||
                                                attendance?.attValue === 2 ||
                                                attendance?.startTime === null
                                            }
                                            style={
                                                attendance?.attValue === 1 ||
                                                attendance?.attValue === 2 ||
                                                attendance?.startTime === null
                                                    ? {
                                                          color: '#fff',
                                                          backgroundColor: '#8592a3',
                                                          borderColor: '#8592a3',
                                                          boxShadow: '0 0.125rem 0.25rem 0 rgba(133, 146, 163, 0.4)',
                                                      }
                                                    : {
                                                          color: '#fff',
                                                          backgroundColor: '#5f61e6',
                                                          borderColor: '#5f61e6',
                                                          boxShadow:
                                                              'rgba(133, 146, 163, 0.4) 0px 0.125rem 0.25rem 0px',
                                                      }
                                            }
                                        >
                                            출근
                                        </button>
                                        <p
                                            className='card-text main-att-time'
                                            style={
                                                attendance?.attValue === 1 ||
                                                attendance?.attValue === 2 ||
                                                attendance?.startTime === null
                                                    ? {
                                                          color: 'rgb(211, 211, 211)',
                                                      }
                                                    : {
                                                          color: 'black',
                                                      }
                                            }
                                        >
                                            {attendance?.attStartTime || attendance?.startTime || '  일정이 없습니다.'}
                                        </p>
                                    </div>
                                    <div className='main-att-btn'>
                                        <button
                                            className='btn btn-secondary btn-lg'
                                            onClick={clickEnd}
                                            disabled={
                                                attendance?.attValue === 0 ||
                                                attendance?.attValue === 2 ||
                                                attendance?.startTime === null
                                            }
                                            style={
                                                attendance?.attValue === 0 || attendance?.attValue === 2
                                                    ? {
                                                          color: '#fff',
                                                          backgroundColor: '#8592a3',
                                                          borderColor: '#8592a3',
                                                          boxShadow: '0 0.125rem 0.25rem 0 rgba(133, 146, 163, 0.4)',
                                                      }
                                                    : {
                                                          color: '#fff',
                                                          backgroundColor: '#5f61e6',
                                                          borderColor: '#5f61e6',
                                                          boxShadow:
                                                              'rgba(133, 146, 163, 0.4) 0px 0.125rem 0.25rem 0px',
                                                      }
                                            }
                                        >
                                            퇴근
                                        </button>
                                        <p
                                            className='card-text main-att-time'
                                            style={
                                                attendance?.attValue === 0 || attendance?.attValue === 2
                                                    ? {
                                                          color: 'rgb(211, 211, 211)',
                                                      }
                                                    : {
                                                          color: 'black',
                                                      }
                                            }
                                        >
                                            {attendance?.attEndTime || attendance?.endTime}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='calendarDiv'>
                        <div id='calendarSize2'>
                            <div id='assignmentArea'>
                                <div style={{ marginBottom: '5%', marginTop: '5%' }}>
                                    <button className='prev1' id='prev' onClick={onClickPrev}>
                                        {'<'}
                                    </button>
                                    <span className='range1' id='range'>
                                        {yearMonth}
                                    </span>
                                    <button className='next1' id='next' onClick={onClickNext}>
                                        {'>'}
                                    </button>
                                    <button className='today1' id='today' onClick={onClickToday}>
                                        Today
                                    </button>
                                </div>
                            </div>
                            <Calendar
                                className='payment-calendar'
                                id='calendar'
                                ref={calendarRef}
                                view='month'
                                calendars={calendarRef?.current && calendarTheme}
                                height={'700px'}
                                style={{ paddingRight: '20px' }}
                                events={events}
                            />
                        </div>
                        <div id='calendarTool'>
                            <table className='table table-hover' style={{ border: 'solid 1px rgba(67, 89, 113, 0.1)' }}>
                                <thead>
                                    <tr>
                                        <td colSpan={2}>{formatDate4(currentTime1)}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(attendanceList) && attendanceList.length > 0 ? (
                                        <>
                                            <tr>
                                                <td style={{ backgroundColor: '#DCDCFF' }}>출근시간</td>
                                                <td>{attendanceList[0]?.startTime}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: '#DCDCFF' }}>퇴근시간</td>
                                                <td>{attendanceList[0]?.endTime}</td>
                                            </tr>
                                        </>
                                    ) : null}
                                </tbody>
                            </table>
                            <div>
                                {Array.isArray(attendanceList) && attendanceList.length > 0 ? (
                                    <>
                                        <div className='mainAline'>근무자</div>
                                        <table
                                            className='table table-hover'
                                            style={{ border: 'solid 1px rgba(67, 89, 113, 0.1)' }}
                                        >
                                            <thead>
                                                <tr style={{ backgroundColor: '#DCDCFF' }}>
                                                    <td>이름</td>
                                                    <td>부서</td>
                                                    <td>직위</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {attendanceList.map((b) => (
                                                    <tr key={b?.memCode}>
                                                        <td>{b?.memName}</td>
                                                        <td>{b?.depName}</td>
                                                        <td>{b?.posName}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                ) : (
                                    <div style={{ textAlign: 'center' }}>일정이 없습니다.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
