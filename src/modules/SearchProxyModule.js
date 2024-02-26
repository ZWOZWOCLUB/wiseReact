import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const POST_SEARCH_PROXY = "attendance/POST_SEARCH_PROXY";

const actions = createAction({
  [POST_SEARCH_PROXY]: () => {},
});

const searchProxyReducer = handleActions(
  {
    [POST_SEARCH_PROXY]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default searchProxyReducer;
