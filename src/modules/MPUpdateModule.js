import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const PUT_MEM = "login/PUT_MEM";

const actions = createActions({
  [PUT_MEM]: () => {},
});

/* 리듀서 */
const mpUpdateReducer = handleActions(
  {
    [PUT_MEM]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default mpUpdateReducer;
