import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckboxTree from 'react-checkbox-tree';
import Calendar from '@toast-ui/react-calendar';
import coreCSS from '../../@core/vendor/css/core.module.css';
import payCSS from '../../@core/css/pay.module.css';
import { callScheduleSearchAPI } from '../../apis/ScheduleAPICalls';
import { callOrganizationTreeAPI } from '../../apis/OrganizationChartAPICalls';
import { callScheduleSearETCAPI } from '../../apis/ScheduleSearchETCAPICalls';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import 'tui-calendar/dist/tui-calendar.css';
import ScheduleDetails from './ScheduleDetails';

function Schedule() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const calendarRef = useRef();
    const [calendar, setCalendar] = useState(null);
    const [rootElement, setRootElement] = useState(null);
    const [calendarTheme, setCalendarTheme] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [yearMonth, setYearMonth] = useState(null);
    const scheduleList = useSelector((state) => state.scheduleReducer);
    const ETCList = useSelector((state) => state.scheduleSearchETCReducer);
    const departmentList = useSelector((state) => state.organizationChartReducer);
    const [checked, setChecked] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [expanded, setExpanded] = useState(['동물원병원']);
    const [events, setEvents] = useState([]);
    const [currentTime1, setCurrentTime1] = useState(new Date());

    console.log('ETCList', ETCList);

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
                            title: schedule.schType + ' ' + schedule.allowanceList.length + '명',
                            start: day,
                            end: day,
                            category: 'allday',
                            backgroundColor: schedule.schColor,
                        });
                    }
                });
            });
        });


        setEvents(updatedEvents);
    };

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    const getDayName = (dayCode) => {
        return dayNames[dayCode];
    };

    useEffect(() => {
        dispatch(callOrganizationTreeAPI());
    }, [dispatch]);

    useEffect(() => {
        dispatch(callScheduleSearETCAPI());
    }, [dispatch]);

    useEffect(() => {
        updateEvents(currentDate);
    }, [scheduleList, currentDate]);

    useEffect(() => {
        const options = {
            month: {
                dayNames: dayNames,
                gridSelection: {
                    enableDblClick: false,
                    enableClick: false,
                },
                isAlways6Weeks: false,
            },
        };

        if (calendarRef.current) {
            const calendar = calendarRef.current.getInstance();
            calendar.setOptions(options);
        }
    }, []);

    useEffect(() => {
        const calendarInstance = calendarRef.current.getInstance();
        const rootElement = calendarRef.current.getRootElement();
        if (calendarInstance && rootElement) {
            setCalendar(calendarInstance);
            setRootElement(rootElement);
        }
    }, [calendarRef.current]);

    useEffect(() => {
        const formattedDate = formatDate(currentDate);
        setYearMonth(formattedDate);
        dispatch(callScheduleSearchAPI({ yearMonth: formattedDate }));
        updateEvents(currentDate);
    }, []);

    function scheduleAdd() {
        navigate(`/main/scheduleAdd`, { replace: true });
    }

    function schedulePattenAdd() {
        navigate(`/main/SchedulePattenAdd`, { replace: true });
    }

    function formatDate(date) {
        const month2 = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${date.getFullYear()}-${month2}`;
    }

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

    const onClicktree = (name) => {
        console.log(name, '클릭');
    };

    const setYearMonthFunction = (calendar) => {
        const Date = calendar.getDate();
        const Year = Date.getFullYear();
        const Month = (Date.getMonth() + 1).toString().padStart(2, '0');
        setYearMonth(`${Year}-${Month}`);
    };

    const onClickToday = () => {
        calendar.today();
        setYearMonthFunction(calendar);
        updateEvents(calendar.getDate());
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

    const onClickGetMemCode = (e) => {
        console.log(e);
    };

    const searchMethod = (node, searchQuery) => node.label.toLowerCase().includes(searchQuery.toLowerCase());

    const [form, setForm] = useState({
        searchDate: '',
    });

    useEffect(() => {
        const calendar = calendarRef.current.getInstance();
        console.log('------>y ', calendarRef.current);

        const handleSelectDateTime = async (eventInfo) => {
            const year = new Date(eventInfo.start).getFullYear();
            const month = (new Date(eventInfo.start).getMonth() + 1).toString().padStart(2, '0');
            const day = new Date(eventInfo.start).getDate().toString().padStart(2, '0');
            const dayOfWeek = dayNames[new Date(eventInfo.start).getDay()];

            console.log('------>y ', year);
            console.log('------>m ', month);
            console.log('------>d ', day);

            calendar.clearGridSelections();

            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;

            const windowWidth = 1600;
            const windowHeight = 800;
            const left = (screenWidth - windowWidth) / 2;
            const top = (screenHeight - windowHeight) / 2;
            window.open(
                `/ScheduleDetails?date=${year}-${month}-${day}-${dayOfWeek}`,
                '_blank',
                `width=${windowWidth},height=${windowHeight},left=${left},top=${top},menubar=no,toolbar=no,location=no,resizable=yes`
            );
        };

        calendar?.on('selectDateTime', handleSelectDateTime);
    }, [currentTime1]);

    const nodes =
        departmentList && departmentList.children
            ? [
                  {
                      value: departmentList.depName,
                      label: departmentList.depName,
                      expandDisabled: true,
                      children: departmentList.children.map((dep) => ({
                          value: dep.depName === '인사팀' ? dep.depName : dep.depName,
                          label: dep.depName === '인사팀' ? dep.depName : dep.depName,
                          children:
                              dep.depName === '인사팀'
                                  ? dep.memberList.map((mem) => ({
                                        value: mem.memCode,
                                        label: mem.memName + ' ' + mem.posName,
                                    }))
                                  : dep.children.map((chi) => ({
                                        value: chi.depCode,
                                        label: chi.depName,
                                        children: chi.memberList.map((mem) => ({
                                            value: mem.memCode,
                                            label: mem.memName + ' ' + mem.posName,
                                        })),
                                    })),
                      })),
                  },
              ]
            : [];

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        console.log(searchQuery);
    };

    return (
        <div className={`${coreCSS['col-xxl']}`}>
            <div className={`${coreCSS['card']} ${coreCSS['mb-4']}`}>
                <div className={`${payCSS['scheduleWrapper']}`}>
                    <div className={`${payCSS['department']}`}>
                        <div className={`${payCSS['input-group5']}`}>
                            <div className={`${payCSS['input-group-text5']}`}>전체 조직도</div>
                            <CheckboxTree
                                nodes={nodes}
                                checked={checked}
                                expanded={expanded}
                                onCheck={setChecked}
                                onExpand={setExpanded}
                                onClick={onClickGetMemCode}
                                icons={{
                                    check: <span className='bx bx-checkbox-checked' />,
                                    uncheck: <span className='bx bx-checkbox' />,
                                    halfCheck: <span className='bx bx-checkbox-square' />,
                                    expandClose: <span className='bx bx-chevron-right' />,
                                    expandOpen: <span className='bx bx-chevron-down' />,
                                    expandAll: <span className='rct-icon rct-icon-expand-all' />,
                                    collapseAll: <span className='bx folder-open' />,
                                    parentClose: <span className='bx bx-folder' />,
                                    parentOpen: <span className='bx bx-folder-open' style={{ color: '#696cff' }} />,
                                    leaf: <span className='bx bx-user' />,
                                }}
                                searchQuery={searchQuery}
                                searchMethod={searchMethod}
                            />
                        </div>
                    </div>
                    <div className={`${payCSS['Wrapper']}`} style={{ flex: 3 }}>
                        <div className={`${payCSS['btnWrapper']}`}>
                            <input
                                type='text'
                                className={`${payCSS['form-control4']}`}
                                placeholder='검색어를 입력하세요'
                                aria-describedby='basic-addon11'
                                value={searchQuery}
                                onChange={handleSearchChange}
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
                            events={events}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Schedule;
