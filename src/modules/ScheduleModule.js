import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_SCHEDULE = "schedule/POST_SCHEDULE";


const actions = createActions({
  [POST_SCHEDULE]: () => {},
});

const scheduleReducer = handleActions(
  {
    [POST_SCHEDULE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default scheduleReducer;
