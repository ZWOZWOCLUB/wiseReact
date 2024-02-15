import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_PATTERN_INSERT = "schedule/POST_PATTERN_INSERT";

const actions = createActions({
  [POST_PATTERN_INSERT]: () => {},
});

const schedulePatternInsertReducer = handleActions(
  {
    [POST_PATTERN_INSERT]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default schedulePatternInsertReducer;
