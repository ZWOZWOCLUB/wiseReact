import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_SEARCH_ETC = "settingMember/GET_SEARCH_ETC";

const actions = createActions({
  [GET_SEARCH_ETC]: () => {},
});

const scheduleSearchETCReducer = handleActions(
  {
    [GET_SEARCH_ETC]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default scheduleSearchETCReducer;
