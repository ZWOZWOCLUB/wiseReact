import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const PUT_DEGREE = "settingMember/PUT_DEGREE";
export const PUT_DEGREE_FILE = "settingMember/PUT_DEGREE_FILE";

const actions = createActions({
  [PUT_DEGREE]: () => {},
  [PUT_DEGREE_FILE]: () => {},
});

const settingDegreeUpdateReducer = handleActions(
  {
    [PUT_DEGREE]: (state, { payload }) => {
      return payload;
    },
    [PUT_DEGREE_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingDegreeUpdateReducer;
