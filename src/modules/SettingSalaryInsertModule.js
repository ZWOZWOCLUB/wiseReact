import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_SALAY = "settingMember/POST_SALAY";
export const POST_SALAY_FILE = "settingMember/POST_SALAY_FILE";

const actions = createActions({
  [POST_SALAY]: () => {},
  [POST_SALAY_FILE]: () => {},
});

const settingSalaryInsertReducer = handleActions(
  {
    [POST_SALAY]: (state, { payload }) => {
      return payload;
    },
    [POST_SALAY_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingSalaryInsertReducer;
