import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const PUT_PATTERN_UPDATE = "schedule/PUT_PATTERN_DELETE";

const actions = createActions({
  [PUT_PATTERN_UPDATE]: () => {},
});

const schedulePatternUpdateReducer = handleActions(
  {
    [PUT_PATTERN_UPDATE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default schedulePatternUpdateReducer;
