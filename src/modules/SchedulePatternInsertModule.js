import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_PATTERN_INSERT = "schedule/POST_PATTERN_INSERT";
export const POST_SCHEDUEL_INSERT = "schedule/POST_SCHEDUEL_INSERT";

const actions = createActions({
  [POST_PATTERN_INSERT]: () => {},
  [POST_SCHEDUEL_INSERT]: () => {},
});

const schedulePatternInsertReducer = handleActions(
  {
    [POST_PATTERN_INSERT]: (state, { payload }) => {
      return payload;
    },
    [POST_SCHEDUEL_INSERT]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default schedulePatternInsertReducer;
