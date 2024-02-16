import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { callScheduleSearchAPI } from "../../apis/ScheduleAPICalls";
import { callOrganizationTreeAPI } from "../../apis/OrganizationChartAPICalls";

function ScheduleAdd() {
  const dispatch = useDispatch();
  const [yearMonth, setYearMonth] = useState("");
  const [events, setEvents] = useState([]);
  const firstDayOfMonth = new Date().toISOString().slice(0, 7);
  const [currentYearMonth, setCurrentYearMonth] = useState(firstDayOfMonth);
  const [loading, setLoading] = useState(true);
  const scheduleList = useSelector((state) => state.scheduleReducer);

  console.log("scheduleList", scheduleList);

  useEffect(() => {
    console.log("currentYearMonth", currentYearMonth);
    dispatch(
      callScheduleSearchAPI({
        yearMonth: currentYearMonth,
      })
    );
  }, [currentYearMonth]);

  console.log("yearMonth", yearMonth);
  console.log("currentYearMonth", yearMonth);

  const resources = Array.isArray(scheduleList)
    ? scheduleList.map((list) => ({
        id: list.children.memberList.memName,
        title: list.children.memberList.memName,
      }))
    : [];
  // const eventsList = {};

  console.log(";;;;;;;;;;;;;;;;;;;", events);

  const handleDatesSet = (arg) => {
    const currentDate = arg.view.currentStart;
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    setCurrentYearMonth(formattedDate);
    console.log("Year and Month:", formattedDate);
  };

  return (
    <div>
      <FullCalendar
        slotMinWidth={70}
        resourceMinWidth={100}
        locale={"kr"}
        plugins={[dayGridPlugin, timeGridPlugin, resourceTimelinePlugin]}
        initialView="resourceTimelineMonth"
        resources={resources}
        // events={eventsList}
        datesSet={handleDatesSet}
        resourceAreaWidth="8rem"
        resourceAreaHeaderContent="이름"
      />
    </div>
  );
}

export default ScheduleAdd;
