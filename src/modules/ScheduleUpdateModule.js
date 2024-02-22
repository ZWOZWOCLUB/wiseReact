import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const PUT_SCHEDULE = "schedule/PUT_SCHEDULE";

const actions = createActions({
  [PUT_SCHEDULE]: () => {},
});

const scheduleUpdateReducer = handleActions(
  {
    [PUT_SCHEDULE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default scheduleUpdateReducer;
