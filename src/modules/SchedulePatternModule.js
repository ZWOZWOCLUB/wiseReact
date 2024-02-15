import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_PATTERN = "schedule/GET_PATTERN";
export const POST_PATTERN_INSERT = "schedule/POST_PATTERN_INSERT";

const actions = createActions({
  [GET_PATTERN]: () => {},
  [POST_PATTERN_INSERT]: () => {},
});

const schedulePatternReducer = handleActions(
  {
    [GET_PATTERN]: (state, { payload }) => {
      return payload;
    },
    [POST_PATTERN_INSERT]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default schedulePatternReducer;
