import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { callAttendanceAPI } from '../../apis/SettingMemberListAPICalls';

function SettingAttendance() {
    const dispatch = useDispatch();
    const [yearMonth, setYearMonth] = useState('');
    const [events, setEvents] = useState([]);
    const firstDayOfMonth = new Date().toISOString().slice(0, 7);
    const [currentYearMonth, setCurrentYearMonth] = useState(firstDayOfMonth);
    const resultList = useSelector((state) => state.settingReducer);
    const [loading, setLoading] = useState(true);

    console.log('resultList', resultList)

    useEffect(() => {
        console.log('currentYearMonth', currentYearMonth);
        dispatch(callAttendanceAPI({
            yearMonth: currentYearMonth
        }))
    }, [currentYearMonth]);


    console.log('yearMonth', yearMonth)
    console.log('currentYearMonth', yearMonth)

    const resources = Array.isArray(resultList) ? resultList.map(list => ({
        id: list.memCode,
        title: list.memName
    })) : [];




    const eventsList = Array.isArray(resultList) ? resultList.map(list => ({
        resourceId: list.memCode,
        title: list.attendances.attStatus,
        start: `${list.attendances.attWorkDate}T${list.attendances.attStartTime}`,
        end: `${list.attendances.attWorkDate}T${list.attendances.attEndTime}`,
    })) : [];

    console.log(';;;;;;;;;;;;;;;;;;;',events)

    const handleDatesSet = (arg) => {
        const currentDate = arg.view.currentStart;
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
        setCurrentYearMonth(formattedDate);
        console.log('Year and Month:', formattedDate);
    };

    return (
        <div>
                        <FullCalendar
                slotMinWidth={150}
                resourceMinWidth={150}
                locale={'kr'}
                plugins={[dayGridPlugin, timeGridPlugin, resourceTimelinePlugin]}
                initialView="resourceTimelineMonth"
                resources={resources}
                events={eventsList}
                datesSet={handleDatesSet}
                resourceAreaWidth="8rem"
                resourceAreaHeaderContent='이름'
            />
        </div>
    );
}

export default SettingAttendance