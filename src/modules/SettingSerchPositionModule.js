import { createActions, handleActions } from "redux-actions";

const intitialState = [];

export const GET_POSITION = "setting/GET_POSITION";

const actions = createActions({
  [GET_POSITION]: () => {},
});

const settingSerchPositionReducer = handleActions(
  {
    [GET_POSITION]: (state, { payload }) => {
      return payload;
    },
  },
  intitialState
);

export default settingSerchPositionReducer;
