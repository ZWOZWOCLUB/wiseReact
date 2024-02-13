import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import coreCSS from "../../@core/vendor/css/core.module.css";
import payCSS from "../../@core/css/pay.module.css";
import Tree from "tui-tree";
import "tui-tree/dist/tui-tree.css";
import Calendar from "@toast-ui/react-calendar";
import { options } from "@fullcalendar/core/preact";
import { callScheduleSearchAPI } from "../../apis/ScheduleAPICalls";

function Schedule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const scheduleList = useSelector((state) => state.scheduleReducer);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월을 2자리 숫자로 만들고, 필요하다면 앞에 0을 채웁니다.
    return `${year}-${month}`;
  }

  const yearMonth = formatDate(currentDate);
  console.log(yearMonth);

  useEffect(() => {
    dispatch(
      callScheduleSearchAPI({
        yearMonth: yearMonth,
      })
    );
  }, [yearMonth]);
  console.log(yearMonth);
  console.log(scheduleList);

  useEffect(() => {
    const options = {
      data: [
        {
          text: "rootA",
          children: [
            { text: "root-1A" },
            { text: "root-1B" },
            { text: "root-1C" },
            {
              text: "root-2A",
              children: [{ text: "sub_sub_1A" }],
            },
            { text: "sub_2A" },
          ],
        },
      ],
      nodeIdPrefix: "tui-tree-node-",
      nodeDefaultState: "closed",
      stateLabels: {
        opened: "-",
        closed: "+",
      },
    };

    const tree = new Tree("#tree", options);
  }, []);

  useEffect(() => {
    const options = {
      month: {
        dayNames: ["일", "월", "화", "수", "목", "금", "토"],
      },
    };

    if (calendarRef.current) {
      const calendar = calendarRef.current.getInstance();
      calendar.setOptions(options);
      setCurrentDate(new Date());
    }
  }, []);

  function getThisMonthMondays() {
    const today = new Date();
    const year = today.getFullYear(); // 현재 연도를 가져옵니다.
    const month = today.getMonth(); // 현재 월을 가져옵니다.
    const firstDayOfMonth = new Date(year, month, 1); // 이번 달의 첫 번째 날을 가져옵니다.
    const firstMonday = new Date(firstDayOfMonth); // 이번 달의 첫 번째 날을 복사합니다.

    // 첫 번째 날이 월요일이 아니라면 첫 번째 월요일을 찾을 때까지 날짜를 증가시킵니다.
    while (firstMonday.getDay() !== 1) {
      firstMonday.setDate(firstMonday.getDate() + 1);
    }

    const mondays = []; // 월요일들을 담을 배열을 선언합니다.

    // 이번 달의 모든 월요일의 날짜를 구합니다.
    while (firstMonday.getMonth() === month) {
      mondays.push(new Date(firstMonday)); // 월요일을 배열에 추가합니다.
      firstMonday.setDate(firstMonday.getDate() + 7); // 다음 주의 월요일로 이동합니다.
    }

    return mondays; // 월요일들이 담긴 배열을 반환합니다.
  }

  // 이번 달의 모든 월요일의 날짜를 구합니다.
  const mondays = getThisMonthMondays();

  // 각각의 월요일의 날짜를 변수에 담습니다.
  const [firstMonday, secondMonday, thirdMonday, fourthMonday, fifthMonday] =
    mondays;

  console.log(firstMonday);
  console.log(secondMonday);

  return (
    <div className={`${coreCSS["col-xxl"]}`}>
      <div className={`${coreCSS["card"]} ${coreCSS["mb-4"]}`}>
        <div className={`${payCSS["scheduleWrapper"]}`}>
          <div className={`${payCSS["department"]}`}>
            <div className={`${payCSS["input-group5"]}`}>
              <div className={`${payCSS["input-group-text5"]}`}>
                전체 조직도
              </div>
              <div id="tree" class="tui-tree-wrap"></div>
            </div>
          </div>
          <div className={`${payCSS["Wrapper"]}`} style={{ flex: 3 }}>
            <div className={`${payCSS["btnWrapper"]}`}>
              <input
                type="text"
                className={`${payCSS["form-control4"]}`}
                placeholder="검색어를 입력하세요"
                aria-describedby="basic-addon11"
              />
              <span
                className={`${payCSS["input-group-text4"]}`}
                id="basic-addon-search31"
              >
                <i className="bx bx-search" />
              </span>
              <button className={`${payCSS["prev"]}`}>
                <i
                  className="bx bx-chevron-left"
                  style={{ fontSize: "2rem" }}
                />
              </button>
              <div className={`${payCSS["range"]}`} />
              <button className={`${payCSS["next"]}`}>
                <i
                  className="bx bx-chevron-right"
                  style={{ fontSize: "2rem" }}
                />
              </button>
              <button className={`${payCSS["today"]}`}>Today</button>
              <button
                className={`${payCSS["patternInscription"]}`}
                onClick={() =>
                  window.open(
                    "../schedule/make_schedule.html",
                    "new",
                    "width=1500, height=1000"
                  )
                }
              >
                <span
                  className="bx bx-calendar-edit"
                  style={{ paddingBottom: 3 }}
                />
                근무패턴등록
              </button>
              <button
                className={`${payCSS["scheduleAdd"]}`}
                onClick={() =>
                  window.open(
                    "../schedule/scheduleAdd.html",
                    "new",
                    "width=1500, height=900"
                  )
                }
              >
                <span
                  className="bx bx-calendar-plus"
                  style={{ paddingBottom: 3 }}
                />
                근무일정추가
              </button>
            </div>

            <Calendar
              height="70vh"
              ref={calendarRef}
              view="month"
              usageStatistics={false}
              events={[
                {
                  id: "event1",
                  calendarId: "cal1",
                  title: "주간 회의",
                  start: firstMonday,
                  end: firstMonday,
                },
                {
                  id: "event2",
                  calendarId: "cal1",
                  title: "점심 약속",
                  start: "2024-02-08",
                  end: "2024-02-08",
                  isAllday: true,
                  category: "allday",
                },
                {
                  id: "event3",
                  calendarId: "cal1",
                  title: "휴가",
                  start: "2024-02-09",
                  end: "2024-02-10",
                  isAllday: true,
                  category: "allday",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Schedule;
