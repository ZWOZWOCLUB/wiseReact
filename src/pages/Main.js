import { useNavigate, useParams } from 'react-router-dom';
import './Main.css';
import { useEffect, useRef, useState } from 'react';
import '../@core/css/customMain.css';
import Calendar from '@toast-ui/react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { searchAttendanceDateInfoAPICalls } from '../apis/SearchAttendanceDateInfoAPICalls';
import { decodeJwt } from '../utils/tokenUtils';

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
    const dispatch = useDispatch();
    const token = decodeJwt(window.localStorage.getItem('accessToken'));

    const [form, setForm] = useState({
        memCode: token.memCode,
        searchDate: '',
    });

    useEffect(() => {
        setCalendar(calendarRef.current.getInstance());
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

        if (calendarRef.current) {
            const calendar = calendarRef.current.getInstance();
            calendar.setOptions(options);
            setCurrentDate(new Date());
        }
    }, []);

    function setYearMonthFunction(calendar) {
        const Date = calendar.getDate();
        const Year = Date.getFullYear();
        const Month = (Date.getMonth() + 1).toString().padStart(2, '0');
        console.log(Year, Month);
        setYearMonth(Year + '년' + Month + '월');
        console.log(yearMonth);
    }

    useEffect(() => {
        const formattedDate = formatDate2(currentDate);

        setYearMonth(formattedDate);
    }, [currentDate]);

    const onClickToday = () => {
        calendar.today();
        setYearMonthFunction(calendar);
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
        const calendar = calendarRef.current.getInstance();

        const handleSelectDateTime = async (eventInfo) => {
            const year = new Date(eventInfo.start).getFullYear();
            const month = (new Date(eventInfo.start).getMonth() + 1).toString().padStart(2, '0');
            const day = new Date(eventInfo.start).getDate().toString().padStart(2, '0');

            console.log('------>y ', year);
            console.log('------>m ', month);
            console.log('------>d ', day);

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

        return () => {
            // Clean up: Remove the event listener when the component unmounts
            calendar?.off('selectDateTime', handleSelectDateTime);
        };
    }, [currentTime1]);

    const attendanceList = useSelector((state) => state.attendanceInfoReducer);
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
                                            <div style={{ color: 'blue' }}>1</div>
                                            <div className='marginTopMain'>승인</div>
                                        </div>
                                        <div className='cardStyle'>
                                            <div style={{ color: 'red' }}>1 </div>
                                            <div className='marginTopMain'>반려</div>
                                        </div>
                                        <div className='cardStyle'>
                                            <div style={{ color: 'aquamarine' }}>1</div>
                                            <div className='marginTopMain'>대기</div>
                                        </div>
                                        <div className='cardStyle'>
                                            <div style={{ color: 'yellow' }}>1 </div>
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
                                        <button className='btn btn-primary btn-lg'>출근</button>
                                        <p className='card-text main-att-time'>AM 09:00</p>
                                    </div>
                                    <div className='main-att-btn'>
                                        <button className='btn btn-secondary btn-lg'>퇴근</button>
                                        <p className='card-text main-att-time' style={{ color: '#d3d3d3' }}>
                                            PM 06:00
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
                                calendars={calendarRef.current && calendarTheme}
                                height={'700px'}
                                style={{ paddingRight: '20px' }}
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
                                    <tr>
                                        <td style={{ backgroundColor: '#DCDCFF' }}>출근시간</td>
                                        <td>{attendanceList[0]?.startTime}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ backgroundColor: '#DCDCFF' }}>퇴근시간</td>
                                        <td>{attendanceList[0]?.endTime}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <div className='mainAline'>근무자</div>
                                <table
                                    className='table table-hover'
                                    style={{ border: 'solid 1px rgba(67, 89, 113, 0.1)' }}
                                >
                                    <thead>
                                        <tr style={{ backgroundColor: '#DCDCFF' }}>
                                            <td>이름</td>
                                            <td>직위</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(attendanceList) && attendanceList?.length > 0
                                            ? attendanceList?.map((b) => (
                                                  <tr key={b?.memName}>
                                                      <td>{b?.memName}</td>
                                                      <td>{b?.posName}</td>
                                                  </tr>
                                              ))
                                            : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
