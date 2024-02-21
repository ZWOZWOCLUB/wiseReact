import { createActions, handleActions } from "redux-actions";

const intitialState = [];

export const GET_YEAR = "pay/GET_YEAR";

const actions = createActions({
  [GET_YEAR]: () => {},
});

const otherReducer = handleActions(
  {
    [GET_YEAR]: (state, { payload }) => {
      return payload;
    },
  },
  intitialState
);

export default otherReducer;
