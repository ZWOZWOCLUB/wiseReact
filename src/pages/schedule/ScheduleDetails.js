import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import payCSS from "../../@core/css/pay.module.css";
import { callScheduleSearcValueAPI } from "../../apis/ScheduleSearchValueAPICalls";
import { callScheduleSearcValueNotAPI } from "../../apis/ScheduleSearchValueNotAPICalls";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ScheduleDetails() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const getDate = searchParams.get("date");
  const dayOfWeek = decodeURI(getDate.split("-")[3]);
  const scheduleList = useSelector((state) => state.scheduleSearchValueReducer);
  const notContain = useSelector(
    (state) => state.scheduleSearchValueNotReducer
  );

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

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // 드래그가 유효한 목적지에 도착한 경우
    if (destination) {
      // 드래그가 notContainDroppable에서 시작한 경우에만 처리
      if (source.droppableId === "notContainDroppable") {
        // 옮겨진 아이템 정보를 찾아서 처리
        const item = notContain.find((n) => n.memName === draggableId);
        if (item) {
          // notContain에서 아이템 제거
          const newNotContain = notContain.filter(
            (n) => n.memName !== draggableId
          );

          // scheduleList에 아이템 추가
          const newScheduleList = [...scheduleList, item];

          // 변경된 상태 출력
          console.log("New notContain:", newNotContain);
          console.log("New scheduleList:", newScheduleList);

          // 변경된 상태를 redux store에 dispatch 할 수 있음
        }
      }
    }
  };

  const getItemStyle = (draggableStyle, isDragging) => ({
    userSelect: "none",
    padding: "8px",
    marginBottom: "8px",
    width: "130px",
    background: isDragging ? "lightgreen" : "white",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "white",
    padding: "8px",
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                    <Droppable droppableId={"notContainDroppable"}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={payCSS.leftWrapperName}
                          style={getListStyle(snapshot.isDraggingOver)}
                        >
                          {Array.isArray(s.allowanceList) &&
                          s.allowanceList.length > 0
                            ? s.allowanceList.map((a, index) => (
                                <Draggable
                                  key={a.memberList.memCode}
                                  draggableId={a.memberList.memName}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={payCSS.notContainName}
                                      style={getItemStyle(
                                        provided.draggableProps.style,
                                        snapshot.isDragging
                                      )}
                                    >
                                      {a.memberList.memName}{" "}
                                      {a.memberList.posCode.posName}
                                    </div>
                                  )}
                                </Draggable>
                              ))
                            : ""}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))
              : ""}
          </div>
          <div className={payCSS.scheduleDetailsMiddleRightWrapper}>
            <div>근무일정 미등록</div>
            <Droppable droppableId="notContainDroppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={payCSS.bottom}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <div className={payCSS.wrapperName}>
                    {Array.isArray(notContain) && notContain.length > 0 ? (
                      notContain.map((n, index) => (
                        <Draggable
                          key={n.memCode}
                          draggableId={n.memName}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={payCSS.notContainName}
                              style={getItemStyle(
                                provided.draggableProps.style,
                                snapshot.isDragging
                              )}
                            >
                              {n.memName}{" "}
                              {n.posList && n.posList.posName
                                ? n.posList.posName
                                : " "}
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div>No data available</div>
                    )}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default ScheduleDetails;
