import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_PATTERN_DAY = "schedule/GET_PATTERN_DAY";

const actions = createActions({
  [GET_PATTERN_DAY]: () => {},
});

const schedulePatternDayReducer = handleActions(
  {
    [GET_PATTERN_DAY]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default schedulePatternDayReducer;
