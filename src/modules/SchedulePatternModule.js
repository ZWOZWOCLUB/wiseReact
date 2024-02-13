import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_PATTERN = "schedule/GET_PATTERN";

const actions = createActions({
  [GET_PATTERN]: () => {},
});

const schedulePatternReducer = handleActions(
  {
    [GET_PATTERN]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default schedulePatternReducer;
