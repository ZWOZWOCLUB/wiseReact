import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import coreCSS from '../../@core/vendor/css/core.module.css';
import payCSS from '../../@core/css/pay.module.css';
import Tree from 'tui-tree';
import 'tui-tree/dist/tui-tree.css';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import { options } from '@fullcalendar/core/preact';
import { callScheduleSearchAPI } from '../../apis/ScheduleAPICalls';
import { callOrganizationTreeAPI } from '../../apis/OrganizationChartAPICalls';

function Schedule() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const calendarRef = useRef();
    const [calendar, setCalendar] = useState(null);
    const [rootElement, setRootElement] = useState(null);
    const [calendarTheme, setCalendarTheme] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const scheduleList = useSelector((state) => state.scheduleReducer);
    const departmentList = useSelector((state) => state.organizationChartReducer);
    let [yearMonth, setYearMonth] = useState(null);

    console.log(departmentList);

    console.log('scheduleList : ', scheduleList);
    function scheduleAdd() {
        navigate(`/main/scheduleAdd`, { replace: true });
    }

    function schedulePattenAdd() {
        navigate(`/main/schedulePattenAdd`, { replace: true });
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${year}-${month}`;
    }
    useEffect(() => {
        const formattedDate = formatDate(currentDate);
        setYearMonth(formattedDate);
        dispatch(
            callScheduleSearchAPI({
                yearMonth: formattedDate,
            })
        );
    }, [currentDate]);

    console.log(yearMonth);
    console.log(scheduleList);

    useEffect(() => {
        dispatch(callOrganizationTreeAPI());
    }, []);

    console.log(departmentList);

    useEffect(() => {
        if (departmentList && departmentList.children) {
            const options = {
                data: [
                    {
                        text: departmentList.depName,
                        children: departmentList.children.map((dep) => ({
                            text: dep.depName === '인사팀' ? dep.depName : dep.depName,
                            children:
                                dep.depName === '인사팀'
                                    ? dep.memberList.map((mem) => ({
                                          text: mem.memName + ' ' + mem.posName,
                                          nodeValue: mem.memCode,
                                      }))
                                    : dep.children.map((chi) => ({
                                          text: chi.depName,
                                          state: 'closed',
                                          children: chi.memberList.map((mem) => ({
                                              text: mem.memName + ' ' + mem.posName,
                                              nodeValue: mem.memCode,
                                          })),
                                      })),
                        })),
                    },
                ],
                nodeIdPrefix: 'tui-tree-node-',
                nodeDefaultState: 'opened',
                stateLabels: {
                    opened: '-',
                    closed: '+',
                },
            };

            const tree = new Tree('#tree', options);
        }
    }, [departmentList]);

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

    useEffect(() => {
        setCalendar(calendarRef.current.getInstance());
        setRootElement(calendarRef.current.getRootElement());
    }, []);

    function getThisDays() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const days = [];

        // 이번 달의 1일의 요일을 구함
        const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 일요일 ~ 6 토요일

        // 이번 달의 첫 번째 요일부터 시작하여 각 요일을 구함
        for (let i = 0; i < 42; i++) {
            // 35일까지 반복 (최대 5주)
            const day = new Date(firstDayOfMonth);
            day.setDate(firstDayOfMonth.getDate() + i - firstDayOfWeek); // 1일의 요일을 기준으로 올바른 요일을 계산
            days.push(day);
        }

        return days;
    }

    const days = getThisDays();

    const [
        firstSunday,
        firstMonday,
        firstTuesday,
        firstWednesday,
        firstThursday,
        firstFriday,
        firstSaturday,
        secondSunday,
        secondMonday,
        secondTuesday,
        secondWednesday,
        secondThursday,
        secondFriday,
        secondSaturday,
        thirdSunday,
        thirdMonday,
        thirdTuesday,
        thirdWednesday,
        thirdThursday,
        thirdFriday,
        thirdSaturday,
        fourthSunday,
        fourthMonday,
        fourthTuesday,
        fourthWednesday,
        fourthThursday,
        fourthFriday,
        fourthSaturday,
        fifthSunday,
        fifthMonday,
        fifthTuesday,
        fifthWednesday,
        fifthThursday,
        fifthFriday,
        fifthSaturday,
        sixSunday,
        sixMonday,
        sixTuesday,
        sixWednesday,
        sixThursday,
        sixFriday,
        sixSaturday,
    ] = days;

    const onClicktree = (name) => {
        console.log(name, '클릭');
    };

    function setYearMonthFunction(calendar) {
        const Date = calendar.getDate();
        const Year = Date.getFullYear();
        const Month = (Date.getMonth() + 1).toString().padStart(2, '0');
        console.log(Year, Month);
        setYearMonth(Year + '-' + Month);
        console.log(yearMonth);
    }

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

    return (
        <div className={`${coreCSS['col-xxl']}`}>
            <div className={`${coreCSS['card']} ${coreCSS['mb-4']}`}>
                <div className={`${payCSS['scheduleWrapper']}`}>
                    <div className={`${payCSS['department']}`}>
                        <div className={`${payCSS['input-group5']}`}>
                            <div className={`${payCSS['input-group-text5']}`}>전체 조직도</div>
                            <div id='tree' class='tui-tree-wrap' onClick={(e) => onClicktree(e)}></div>
                        </div>
                    </div>
                    <div className={`${payCSS['Wrapper']}`} style={{ flex: 3 }}>
                        <div className={`${payCSS['btnWrapper']}`}>
                            <input
                                type='text'
                                className={`${payCSS['form-control4']}`}
                                placeholder='검색어를 입력하세요'
                                aria-describedby='basic-addon11'
                            />
                            <span className={`${payCSS['input-group-text4']}`} id='basic-addon-search31'>
                                <i className='bx bx-search' />
                            </span>
                            <button className={`${payCSS['prev']}`} onClick={onClickPrev}>
                                <i className='bx bx-chevron-left' style={{ fontSize: '2rem' }} />
                            </button>
                            <div className={`${payCSS['range']}`}>{yearMonth}</div>
                            <button className={`${payCSS['next']}`} onClick={onClickNext}>
                                <i className='bx bx-chevron-right' style={{ fontSize: '2rem' }} />
                            </button>
                            <button className={`${payCSS['today']}`} onClick={onClickToday}>
                                Today
                            </button>
                            <button className={`${payCSS['patternInscription']}`} onClick={schedulePattenAdd}>
                                <span className='bx bx-calendar-edit' style={{ paddingBottom: 3 }} />
                                근무패턴등록
                            </button>
                            <button className={`${payCSS['scheduleAdd']}`} onClick={scheduleAdd}>
                                <span className='bx bx-calendar-plus' style={{ paddingBottom: 3 }} />
                                근무일정추가
                            </button>
                        </div>
                        <Calendar
                            height='70vh'
                            ref={calendarRef}
                            view='month'
                            calendars={calendarRef.current && calendarTheme}
                            events={
                                Array.isArray(scheduleList) && scheduleList.length > 0
                                    ? scheduleList
                                          .reduce((events, schedule) => {
                                              if (
                                                  Array.isArray(schedule.patternDayList) &&
                                                  schedule.patternDayList.length > 0
                                              ) {
                                                  schedule.patternDayList.forEach((patternDay) => {
                                                      let start, end;

                                                      switch (patternDay.patternDayID.dayCode) {
                                                          case 1:
                                                              start = firstMonday;
                                                              end = firstMonday;
                                                              break;
                                                          case 2:
                                                              start = firstTuesday;
                                                              end = firstTuesday;
                                                              break;
                                                          case 3:
                                                              start = firstWednesday;
                                                              end = firstWednesday;
                                                              break;
                                                          case 4:
                                                              start = firstThursday;
                                                              end = firstThursday;
                                                              break;
                                                          case 5:
                                                              start = firstFriday;
                                                              end = firstFriday;
                                                              break;
                                                          case 6:
                                                              start = firstSaturday;
                                                              end = firstSaturday;
                                                              break;
                                                          case 7:
                                                              start = firstSunday;
                                                              end = firstSunday;
                                                              break;
                                                          default:
                                                              break;
                                                      }

                                                      events.push({
                                                          id: `event_${patternDay.patternDayID.dayCode}`,
                                                          calendarId: 'cal1',
                                                          title: schedule.schType,
                                                          start: start,
                                                          end: end,
                                                          category: 'allday',
                                                          backgroundColor: schedule.patternList.wokColor,
                                                      });
                                                  });
                                              }
                                              return events;
                                          }, [])
                                          .concat(
                                              Array.isArray(scheduleList) && scheduleList.length > 0
                                                  ? scheduleList.reduce((events, schedule) => {
                                                        if (
                                                            Array.isArray(schedule.patternDayList) &&
                                                            schedule.patternDayList.length > 0
                                                        ) {
                                                            schedule.patternDayList.forEach((patternDay) => {
                                                                let start, end;

                                                                switch (patternDay.patternDayID.dayCode) {
                                                                    case 1:
                                                                        start = secondMonday;
                                                                        end = secondMonday;
                                                                        break;
                                                                    case 2:
                                                                        start = secondTuesday;
                                                                        end = secondTuesday;
                                                                        break;
                                                                    case 3:
                                                                        start = secondWednesday;
                                                                        end = secondWednesday;
                                                                        break;
                                                                    case 4:
                                                                        start = secondThursday;
                                                                        end = secondThursday;
                                                                        break;
                                                                    case 5:
                                                                        start = secondFriday;
                                                                        end = secondFriday;
                                                                        break;
                                                                    case 6:
                                                                        start = secondSaturday;
                                                                        end = secondSaturday;
                                                                        break;
                                                                    case 7:
                                                                        start = secondSunday;
                                                                        end = secondSunday;
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }

                                                                events.push({
                                                                    id: `event_${patternDay.patternDayID.dayCode}`,
                                                                    calendarId: 'cal1',
                                                                    title: schedule.schType,
                                                                    start: start,
                                                                    end: end,
                                                                    category: 'allday',
                                                                    backgroundColor: schedule.patternList.wokColor,
                                                                });
                                                            });
                                                        }
                                                        return events;
                                                    }, [])
                                                  : []
                                          )
                                          .concat(
                                              Array.isArray(scheduleList) && scheduleList.length > 0
                                                  ? scheduleList.reduce((events, schedule) => {
                                                        if (
                                                            Array.isArray(schedule.patternDayList) &&
                                                            schedule.patternDayList.length > 0
                                                        ) {
                                                            schedule.patternDayList.forEach((patternDay) => {
                                                                let start, end;

                                                                switch (patternDay.patternDayID.dayCode) {
                                                                    case 1:
                                                                        start = thirdMonday;
                                                                        end = thirdMonday;
                                                                        break;
                                                                    case 2:
                                                                        start = thirdTuesday;
                                                                        end = thirdTuesday;
                                                                        break;
                                                                    case 3:
                                                                        start = thirdWednesday;
                                                                        end = thirdWednesday;
                                                                        break;
                                                                    case 4:
                                                                        start = thirdThursday;
                                                                        end = thirdThursday;
                                                                        break;
                                                                    case 5:
                                                                        start = thirdFriday;
                                                                        end = thirdFriday;
                                                                        break;
                                                                    case 6:
                                                                        start = thirdSaturday;
                                                                        end = thirdSaturday;
                                                                        break;
                                                                    case 7:
                                                                        start = thirdSunday;
                                                                        end = thirdSunday;
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }

                                                                events.push({
                                                                    id: `event_${patternDay.patternDayID.dayCode}`,
                                                                    calendarId: 'cal1',
                                                                    title: schedule.schType,
                                                                    start: start,
                                                                    end: end,
                                                                    category: 'allday',
                                                                    backgroundColor: schedule.patternList.wokColor,
                                                                });
                                                            });
                                                        }
                                                        return events;
                                                    }, [])
                                                  : []
                                          )
                                          .concat(
                                              Array.isArray(scheduleList) && scheduleList.length > 0
                                                  ? scheduleList.reduce((events, schedule) => {
                                                        if (
                                                            Array.isArray(schedule.patternDayList) &&
                                                            schedule.patternDayList.length > 0
                                                        ) {
                                                            schedule.patternDayList.forEach((patternDay) => {
                                                                let start, end;

                                                                switch (patternDay.patternDayID.dayCode) {
                                                                    case 1:
                                                                        start = fourthMonday;
                                                                        end = fourthMonday;
                                                                        break;
                                                                    case 2:
                                                                        start = fourthTuesday;
                                                                        end = fourthTuesday;
                                                                        break;
                                                                    case 3:
                                                                        start = fourthWednesday;
                                                                        end = fourthWednesday;
                                                                        break;
                                                                    case 4:
                                                                        start = fourthThursday;
                                                                        end = fourthThursday;
                                                                        break;
                                                                    case 5:
                                                                        start = fourthFriday;
                                                                        end = fourthFriday;
                                                                        break;
                                                                    case 6:
                                                                        start = fourthSaturday;
                                                                        end = fourthSaturday;
                                                                        break;
                                                                    case 7:
                                                                        start = fourthSunday;
                                                                        end = fourthSunday;
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }

                                                                events.push({
                                                                    id: `event_${patternDay.patternDayID.dayCode}`,
                                                                    calendarId: 'cal1',
                                                                    title: schedule.schType,
                                                                    start: start,
                                                                    end: end,
                                                                    category: 'allday',
                                                                    backgroundColor: schedule.patternList.wokColor,
                                                                });
                                                            });
                                                        }
                                                        return events;
                                                    }, [])
                                                  : []
                                          )
                                          .concat(
                                              Array.isArray(scheduleList) && scheduleList.length > 0
                                                  ? scheduleList.reduce((events, schedule) => {
                                                        if (
                                                            Array.isArray(schedule.patternDayList) &&
                                                            schedule.patternDayList.length > 0
                                                        ) {
                                                            schedule.patternDayList.forEach((patternDay) => {
                                                                let start, end;

                                                                switch (patternDay.patternDayID.dayCode) {
                                                                    case 1:
                                                                        start = fifthMonday;
                                                                        end = fifthMonday;
                                                                        break;
                                                                    case 2:
                                                                        start = fifthTuesday;
                                                                        end = fifthTuesday;
                                                                        break;
                                                                    case 3:
                                                                        start = fifthWednesday;
                                                                        end = fifthWednesday;
                                                                        break;
                                                                    case 4:
                                                                        start = fifthThursday;
                                                                        end = fifthThursday;
                                                                        break;
                                                                    case 5:
                                                                        start = fifthFriday;
                                                                        end = fifthFriday;
                                                                        break;
                                                                    case 6:
                                                                        start = fifthSaturday;
                                                                        end = fifthSaturday;
                                                                        break;
                                                                    case 7:
                                                                        start = fifthSunday;
                                                                        end = fifthSunday;
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }

                                                                events.push({
                                                                    id: `event_${patternDay.patternDayID.dayCode}`,
                                                                    calendarId: 'cal1',
                                                                    title: schedule.schType,
                                                                    start: start,
                                                                    end: end,
                                                                    category: 'allday',
                                                                    backgroundColor: schedule.patternList.wokColor,
                                                                });
                                                            });
                                                        }
                                                        return events;
                                                    }, [])
                                                  : []
                                          )
                                          .concat(
                                              Array.isArray(scheduleList) && scheduleList.length > 0
                                                  ? scheduleList.reduce((events, schedule) => {
                                                        if (
                                                            Array.isArray(schedule.patternDayList) &&
                                                            schedule.patternDayList.length > 0
                                                        ) {
                                                            schedule.patternDayList.forEach((patternDay) => {
                                                                let start, end;

                                                                switch (patternDay.patternDayID.dayCode) {
                                                                    case 1:
                                                                        start = sixMonday;
                                                                        end = sixMonday;
                                                                        break;
                                                                    case 2:
                                                                        start = sixTuesday;
                                                                        end = sixTuesday;
                                                                        break;
                                                                    case 3:
                                                                        start = sixWednesday;
                                                                        end = sixWednesday;
                                                                        break;
                                                                    case 4:
                                                                        start = sixThursday;
                                                                        end = sixThursday;
                                                                        break;
                                                                    case 5:
                                                                        start = sixFriday;
                                                                        end = sixFriday;
                                                                        break;
                                                                    case 6:
                                                                        start = sixSaturday;
                                                                        end = sixSaturday;
                                                                        break;
                                                                    case 7:
                                                                        start = sixSunday;
                                                                        end = sixSunday;
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }

                                                                events.push({
                                                                    id: `event_${patternDay.patternDayID.dayCode}`,
                                                                    calendarId: 'cal1',
                                                                    title: schedule.schType,
                                                                    start: start,
                                                                    end: end,
                                                                    category: 'allday',
                                                                    backgroundColor: schedule.patternList.wokColor,
                                                                });
                                                            });
                                                        }
                                                        return events;
                                                    }, [])
                                                  : []
                                          )
                                    : []
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Schedule;
