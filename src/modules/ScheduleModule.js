import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_SCHEDULE = "schedule/POST_SCHEDULE";
export const GET_PATTERN_DAY = "schedule/GET_PATTERN_DAY";

const actions = createActions({
  [POST_SCHEDULE]: () => {},
  [GET_PATTERN_DAY]: () => {},
});

const scheduleReducer = handleActions(
  {
    [POST_SCHEDULE]: (state, { payload }) => {
      return payload;
    },
    [GET_PATTERN_DAY]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default scheduleReducer;
