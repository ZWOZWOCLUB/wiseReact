import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_SEARCH_MEMLIST = "setting/GET_SEARCH_MEMLIST";

const actions = createActions({
  [GET_SEARCH_MEMLIST]: () => {},
});

const settingSearchMemListReducer = handleActions(
  {
    [GET_SEARCH_MEMLIST]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingSearchMemListReducer;
