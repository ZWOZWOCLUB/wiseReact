import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const DELETE_CAREEAR = "settingMember/DELETE_CAREEAR";
export const DELETE_CAREEAR_FILE = "settingMember/DELETE_CAREEAR_FILE";

const actions = createActions({
  [DELETE_CAREEAR]: () => {},
  [DELETE_CAREEAR_FILE]: () => {},
});

const settingCareerDeleteReducer = handleActions(
  {
    [DELETE_CAREEAR]: (state, { payload }) => {
      return payload;
    },
    [DELETE_CAREEAR_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingCareerDeleteReducer;
