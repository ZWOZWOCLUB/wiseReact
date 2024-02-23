import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const PUT_SALAY = "settingMember/PUT_SALAY";
export const PUT_SALAY_FILE = "settingMember/PUT_SALAY_FILE";

const actions = createActions({
  [PUT_SALAY]: () => {},
  [PUT_SALAY_FILE]: () => {},
});

const settingSalaryUpdateReducer = handleActions(
  {
    [PUT_SALAY]: (state, { payload }) => {
      return payload;
    },
    [PUT_SALAY_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingSalaryUpdateReducer;
