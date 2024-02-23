import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_DEGREE = "settingMember/POST_DEGREE";
export const POST_DEGREE_FILE = "settingMember/POST_DEGREE_FILE";

const actions = createActions({
  [POST_DEGREE]: () => {},
  [POST_DEGREE_FILE]: () => {},
});

const settingDegreeInsertReducer = handleActions(
  {
    [POST_DEGREE]: (state, { payload }) => {
      return payload;
    },
    [POST_DEGREE_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingDegreeInsertReducer;
