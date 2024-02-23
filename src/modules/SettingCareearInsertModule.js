import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_CAREEAR = "settingMember/POST_CAREEAR";
export const POST_CAREEAR_FILE = "settingMember/POST_CAREEAR_FILE";

const actions = createActions({
  [POST_CAREEAR]: () => {},
  [POST_CAREEAR_FILE]: () => {},
});

const settingCareerInsertReducer = handleActions(
  {
    [POST_CAREEAR]: (state, { payload }) => {
      return payload;
    },
    [POST_CAREEAR_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingCareerInsertReducer;
