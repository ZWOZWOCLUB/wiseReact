import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_SCHEDULE_MEMBER_INSERT =
  "schedule/POST_SCHEDULE_MEMBER_INSERT";

const actions = createActions({
  [POST_SCHEDULE_MEMBER_INSERT]: () => {},
});

const scheduleInsetMemReducer = handleActions(
  {
    [POST_SCHEDULE_MEMBER_INSERT]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default scheduleInsetMemReducer;
