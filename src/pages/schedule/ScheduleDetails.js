import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import payCSS from "../../@core/css/pay.module.css";
import { callScheduleSearcValueAPI } from "../../apis/ScheduleSearchValueAPICalls";
import { callScheduleSearcValueNotAPI } from "../../apis/ScheduleSearchValueNotAPICalls";
import { callScheduleSearETCAPI } from "../../apis/ScheduleSearchETCAPICalls";

function ScheduleDetails() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const getDate = searchParams.get("date");
  const dayOfWeek = decodeURI(getDate.split("-")[3]);
  const scheduleList = useSelector((state) => state.scheduleSearchValueReducer);
  const notContain = useSelector(
    (state) => state.scheduleSearchValueNotReducer
  );
  const ETCList = useSelector((state) => state.scheduleSearchETCReducer);

  console.log("ETCList", ETCList);
  console.log("getDate", getDate);
  useEffect(() => {
    dispatch(callScheduleSearETCAPI());
  }, [dispatch]);

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

  scheduleList.forEach((schedule) => {
    const patternDayList = schedule.patternDayList || [];

    const filteredPatternDayList = patternDayList.filter((patternDay) => {
      const weekDay = patternDay.weekDay || {};
      const dayName = weekDay.dayName;
      return dayName === dayOfWeek;
    });

    if (filteredPatternDayList.length > 0) {
      filteredScheduleList.push({
        ...schedule,
        patternDayList: filteredPatternDayList,
      });
    }
  });

  console.log(filteredScheduleList);
  return (
    <div className={payCSS.scheduleDetailsTotalWrapper}>
      <div className={payCSS.scheduleDetailsTopWrapper}>{getDate}요일</div>
      <div className={payCSS.scheduleDetailsMiddleWrapper}>
        <div className={payCSS.detailLeftWrapper}>
          {Array.isArray(filteredScheduleList) &&
          filteredScheduleList.length > 0
            ? filteredScheduleList.map((s, index) => (
                <div key={index} className={payCSS.detailWrapper}>
                  <div
                    className={payCSS.timeNameWrapper}
                    style={{ background: s.schColor }}
                  >
                    <div className={payCSS.schType}>{s.schType}</div>
                    <div className={payCSS.wokTime}>
                      {s.patternList.wokStartTime.slice(0, -3)} ~{" "}
                      {s.patternList.wokEndTime.slice(0, -3)}
                    </div>
                  </div>
                  <div className={payCSS.leftWrapperName}>
                    {Array.isArray(s.allowanceList) &&
                    s.allowanceList.length > 0
                      ? s.allowanceList.map((a, index) => (
                          <div key={index} className={payCSS.notContainName}>
                            <div className={payCSS.depName}>
                              {a.memberList.depCode.depName}
                            </div>
                            <b>
                              {a.memberList.memName}{" "}
                              {a.memberList.posCode.posName}
                            </b>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              ))
            : ""}

          <div className={payCSS.detailWrapper}>
            <div
              className={payCSS.timeNameWrapper}
              style={{ background: "#696cff" }}
            >
              <div className={payCSS.schType}>ETC PATTERN</div>
              <div className={payCSS.wokTime}></div>
            </div>
            <div className={payCSS.leftWrapperName}>
              {ETCList
                ? ETCList.map((s, index) =>
                    s.etcDate === getDate.slice(0, -2) ? (
                      <div
                        key={index}
                        style={{ textAlign: "center", fontWeight: "bolder" }}
                      >
                        <div>
                          {s.etcKind === "0"
                            ? "OFF"
                            : s.etcKind === "1"
                            ? "DAY"
                            : s.etcKind === "2"
                            ? "EVENING"
                            : "NIGHT"}
                        </div>
                        <div className={payCSS.notContainName}>
                          <div className={payCSS.depName}>
                            {s.member.departmentDTO.depName}
                          </div>
                          <b>
                            {s.member.memName} {s.member.positionDTO.posName}
                          </b>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </div>
          </div>

          <div className={payCSS.detailWrapper}>
            <div
              className={payCSS.timeNameWrapper}
              style={{ background: "#696cff" }}
            >
              <div className={payCSS.schType}>
                <b>근무일정 미등록</b>
              </div>
              <div className={payCSS.wokTime}></div>
            </div>
            <div className={payCSS.leftWrapperName}>
              {Array.isArray(notContain) && notContain.length > 0
                ? notContain.map((n, index) => (
                    <div className={payCSS.notContainName}>
                      <div className={payCSS.depName}>
                        {n.depList && n.depList.depName
                          ? n.depList.depName
                          : ""}
                      </div>
                      <b>
                        {n.memName}{" "}
                        {n.posList && n.posList.posName
                          ? n.posList.posName
                          : " "}
                      </b>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleDetails;
