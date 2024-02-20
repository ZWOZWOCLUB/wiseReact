import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_SCHEDULE = "schedule/POST_SCHEDULE";
export const GET_PATTERN_DAY = "schedule/GET_PATTERN_DAY";
export const POST_SCHEDUEL_INSERT = "schedule/POST_SCHEDUEL_INSERT";

const actions = createActions({
  [POST_SCHEDULE]: () => {},
  [GET_PATTERN_DAY]: () => {},
  [POST_SCHEDUEL_INSERT]: () => {},
});

const scheduleReducer = handleActions(
  {
    [POST_SCHEDULE]: (state, { payload }) => {
      return payload;
    },
    [GET_PATTERN_DAY]: (state, { payload }) => {
      return payload;
    },
    [POST_SCHEDUEL_INSERT]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default scheduleReducer;
