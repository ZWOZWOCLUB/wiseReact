import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const DELETE_SALAY = "settingMember/DELETE_SALAY";
export const DELETE_SALAY_FILE = "settingMember/DELETE_SALAY_FILE";

const actions = createActions({
  [DELETE_SALAY]: () => {},
  [DELETE_SALAY_FILE]: () => {},
});

const settingSalaryDeleteReducer = handleActions(
  {
    [DELETE_SALAY]: (state, { payload }) => {
      return payload;
    },
    [DELETE_SALAY_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingSalaryDeleteReducer;
