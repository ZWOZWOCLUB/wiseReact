import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import coreCSS from '../../@core/vendor/css/core.module.css';
import payCSS from '../../@core/css/pay.module.css'
import Tree from 'tui-tree';
import 'tui-tree/dist/tui-tree.css';
import Calendar from '@toast-ui/react-calendar';
import { options } from '@fullcalendar/core/preact';

function Schedule(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
//   useEffect(() => {
//     dispatch(({
//     }))
// }, []);
  useEffect(() => {
    const options = {
      data: [{
        text: 'rootA',
        children: [
          { text: 'root-1A' },
          { text: 'root-1B' },
          { text: 'root-1C' },
          {
            text: 'root-2A',
            children: [{ text: 'sub_sub_1A' }]
          },
          { text: 'sub_2A' }
        ],
      }],
      nodeIdPrefix: 'tui-tree-node-',
      nodeDefaultState: 'closed',
      stateLabels: {
        opened: '-',
        closed: '+'
      },
    };

    const tree = new Tree('#tree', options);
  }, []); 
  
  useEffect(() => {
    const options = {
      defaultView: 'month',
      month: {
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      },
      useDetailPopup: true, // 상세 일정 팝업 사용 여부
      useCreationPopup: true, // 일정 생성 팝업 사용 여부
      schedules: [
        {
          id: '1',
          calendarId: '0',
          title: 'Test event',
          category: 'time',
          dueDateClass: '',
          start: '2024-02-01T10:30:00+09:00',
          end: '2024-02-01T12:30:00+09:00'
        },
        {
          id: '2',
          calendarId: '1',
          title: 'Company event',
          category: 'time',
          dueDateClass: '',
          start: '2024-02-15T14:30:00+09:00',
          end: '2024-02-15T15:30:00+09:00'
        }
      ]
    };

    if (calendarRef.current) {
      const calendar = calendarRef.current.getInstance();
      calendar.setOptions(options);
      setCurrentDate(new Date());
    }
    
  }, []);
  
  return(
    <div className={`${coreCSS['col-xxl']}`}>
  <div className={`${coreCSS['card']} ${coreCSS['mb-4']}`}>
    <div className={`${payCSS['scheduleWrapper']}`}>
      <div className={`${payCSS['department']}`}>
        <div className={`${payCSS['input-group5']}`}>
          <div className={`${payCSS['input-group-text5']}`}>전체 조직도</div>
          <div id="tree" class="tui-tree-wrap"></div>
        </div>
      </div>
      <div className={`${payCSS['Wrapper']}`} style={{ flex: 3 }}>
        <div className={`${payCSS['btnWrapper']}`}>
          <input
            type="text"
            className={`${payCSS['form-control4']}`}
            placeholder="검색어를 입력하세요"
            aria-describedby="basic-addon11"
          />
          <span className={`${payCSS['input-group-text4']}`} id="basic-addon-search31">
            <i className="bx bx-search" />
          </span>
          <button className={`${payCSS['prev']}`}>
            <i className="bx bx-chevron-left" style={{ fontSize: "2rem" }} />
          </button>
          <div className={`${payCSS['range']}`} />
          <button className={`${payCSS['next']}`}>
            <i className="bx bx-chevron-right" style={{ fontSize: "2rem" }} />
          </button>
          <button className={`${payCSS['today']}`}>Today</button>
          <button
            className={`${payCSS['patternInscription']}`}
            onClick={() => window.open('../schedule/make_schedule.html', 'new', 'width=1500, height=1000')}
          >
            <span
              className="bx bx-calendar-edit"
              style={{ paddingBottom: 3 }}
            />
            근무패턴등록
          </button>
          <button
            className={`${payCSS['scheduleAdd']}`}
            onClick={() => window.open('../schedule/scheduleAdd.html', 'new', 'width=1500, height=900')}
          >
            <span
              className="bx bx-calendar-plus"
              style={{ paddingBottom: 3 }}
            />
            근무일정추가
          </button>
        </div>

        <Calendar
              ref={calendarRef}
              height="70vh"

            />

      </div>
    </div>
  </div>
</div>

);
}
export default Schedule;