import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const PUT_PATTERN_DELETE = "schedule/PUT_PATTERN_DELETE";

const actions = createActions({
  [PUT_PATTERN_DELETE]: () => {},
});

const schedulePatternDeleteReducer = handleActions(
  {
    [PUT_PATTERN_DELETE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default schedulePatternDeleteReducer;
