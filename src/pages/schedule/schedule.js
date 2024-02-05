import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import coreCSS from '../../@core/vendor/css/core.module.css';
import payCSS from '../../@core/css/pay.module.css'


function Schedule(){
  const navigate = useNavigate();

  const dispatch = useDispatch();

return(
    <div className={`${coreCSS['col-xxl']}`}>
  <div className={`${coreCSS['card']} ${coreCSS['mb-4']}`}>
    <div className={`${coreCSS['scheduleWrapper']}`}>
      <div className={`${coreCSS['department']}`}>
        <div className={`${coreCSS['input-group5']}`}>
          <div className={`${coreCSS['input-group-text5']}`}>전체 조직도</div>
          <div id="tree" className={`${coreCSS['tui-tree-wrap']}`} />
        </div>
      </div>
      <div className={`${coreCSS['Wrapper']}`} style={{ flex: 3 }}>
        <div className={`${coreCSS['btnWrapper']}`}>
          <input
            type="text"
            className={`${coreCSS['form-control4']}`}
            placeholder="검색어를 입력하세요"
            aria-describedby="basic-addon11"
          />
          <span className={`${coreCSS['input-group-text4']}`} id="basic-addon-search31">
            <i className="bx bx-search" />
          </span>
          <button className={`${coreCSS['prev']}`}>
            <i className="bx bx-chevron-left" style={{ fontSize: "2rem" }} />
          </button>
          <div className={`${coreCSS['range']}`} />
          <button className={`${coreCSS['next']}`}>
            <i className="bx bx-chevron-right" style={{ fontSize: "2rem" }} />
          </button>
          <button className={`${coreCSS['today']}`}>Today</button>
          <button
            className={`${coreCSS['patternInscription']}`}
            onClick={() => window.open('../schedule/make_schedule.html', 'new', 'width=1500, height=1000')}
          >
            <span
              className="bx bx-calendar-edit"
              style={{ paddingBottom: 3 }}
            />
            근무패턴등록
          </button>
          <button
            className={`${coreCSS['scheduleAdd']}`}
            onClick={() => window.open('../schedule/scheduleAdd.html', 'new', 'width=1500, height=900')}
          >
            <span
              className="bx bx-calendar-plus"
              style={{ paddingBottom: 3 }}
            />
            근무일정추가
          </button>
        </div>
        <div id="calendar" />
      </div>
    </div>
  </div>
</div>

);
}
export default Schedule;