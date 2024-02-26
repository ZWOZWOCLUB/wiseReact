import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_SCHEDUEL_TREE = "schedule/GET_SCHEDUEL_TREE";

const actions = createActions({
  [GET_SCHEDUEL_TREE]: () => {},
});

const scheduleTreeReducer = handleActions(
  {
    [GET_SCHEDUEL_TREE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default scheduleTreeReducer;
