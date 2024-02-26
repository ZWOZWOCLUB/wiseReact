import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_SCHEDUEL_INSERT = "schedule/POST_SCHEDUEL_INSERT";

const actions = createActions({
  [POST_SCHEDUEL_INSERT]: () => {},
});

const scheduleInsertReducer = handleActions(
  {
    [POST_SCHEDUEL_INSERT]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default scheduleInsertReducer;
