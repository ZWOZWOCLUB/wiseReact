import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import payCSS from "../../@core/css/pay.module.css";
import { callScheduleSearcValueAPI } from "../../apis/ScheduleSearchValueAPICalls";
import { callScheduleSearcValueNotAPI} from '../../apis/ScheduleSearchValueNotAPICalls';


function ScheduleDetails() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const getDate = searchParams.get("date");
  const dayOfWeek = decodeURI(getDate.split("-")[3]);
const scheduleList = useSelector((state) => state.scheduleSearchValueReducer);
const notContain = useSelector((state) => state.scheduleSearchValueNotReducer);

  console.log(dayOfWeek);
  console.log(notContain);
  useEffect(() => {
    if (getDate) {
      dispatch(
        callScheduleSearcValueAPI({
          yearMonth: getDate,
        })
      );
    }
  }, [getDate]);

  useEffect(() => {
    if (getDate) {
      dispatch(
        callScheduleSearcValueNotAPI({
            notContain: getDate,
        })
      );
    }
  }, [getDate]);


  const filteredScheduleList = [];

  scheduleList.forEach(schedule => {
      const patternDayList = schedule.patternDayList || [];
      
      const filteredPatternDayList = patternDayList.filter(patternDay => {
          const weekDay = patternDay.weekDay || {};
          const dayName = weekDay.dayName;
          return dayName === dayOfWeek ;
      });
      
      if (filteredPatternDayList.length > 0) {
          filteredScheduleList.push({ ...schedule, patternDayList: filteredPatternDayList });
      }
  });
  
  console.log(filteredScheduleList);
    return(
        <div>
            <div className={payCSS.scheduleDetailsTopWrapper}>
                {getDate}
            </div>
            <div className={payCSS.scheduleDetailsMiddleWrapper}>
                <div className={payCSS.detailLeftWrapper}>
                {Array.isArray(filteredScheduleList) && filteredScheduleList.length > 0
                ? filteredScheduleList.map((s, index) => (
                    <div key={index} className={payCSS.detailWrapper}>
                        <div className={payCSS.timeNameWrapper} style={{background: s.schColor}}>

                        <div className={payCSS.schType}>
                            {s.schType}
                        </div>
                        <div className={payCSS.wokTime}>
                        {s.patternList.wokStartTime.slice(0, -3)} ~ {s.patternList.wokEndTime.slice(0, -3)}
                            </div>
                        </div>
                        <div className= {payCSS.leftWrapperName}>
                        {Array.isArray(s.allowanceList) && s.allowanceList.length > 0
                ? s.allowanceList.map((a, index) => (
                        <div key={index} className={payCSS.notContainName}>
                            {a.memberList.memName}   {a.memberList.posCode.posName}
                        </div>
                )): ''}</div>
                        </div>

                )): ''}
                </div>
                <div className={payCSS.scheduleDetailsMiddleRightWrapper}>
                    <div>근무일정 미등록</div>
                    <div className={payCSS.bottom}>

                      <div className={payCSS.wrapperName}>

                {Array.isArray(notContain) && notContain.length > 0
                ? notContain.map((n, index) => (
                <div className={payCSS.notContainName}>
{n.memName} 
                </div>

                )): ''}
                </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ScheduleDetails;
