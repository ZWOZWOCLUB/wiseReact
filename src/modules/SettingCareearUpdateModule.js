import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const PUT_CAREEAR = "settingMember/PUT_CAREEAR";
export const PUT_CAREEAR_FILE = "settingMember/PUT_CAREEAR_FILE";

const actions = createActions({
  [PUT_CAREEAR]: () => {},
  [PUT_CAREEAR_FILE]: () => {},
});

const settingCareerUpdateReducer = handleActions(
  {
    [PUT_CAREEAR]: (state, { payload }) => {
      return payload;
    },
    [PUT_CAREEAR_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingCareerUpdateReducer;
