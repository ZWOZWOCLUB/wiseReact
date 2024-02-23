import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const DELETE_DEGREE = "settingMember/DELETE_DEGREE";
export const DELETE_DEGREE_FILE = "settingMember/DELETE_DEGREE_FILE";

const actions = createActions({
  [DELETE_DEGREE]: () => {},
  [DELETE_DEGREE_FILE]: () => {},
});

const settingDegreeDeleteReducer = handleActions(
  {
    [DELETE_DEGREE]: (state, { payload }) => {
      return payload;
    },
    [DELETE_DEGREE_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingDegreeDeleteReducer;
