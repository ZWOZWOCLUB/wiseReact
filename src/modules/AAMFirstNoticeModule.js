import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_FIRST_NOTICE   = 'login/GET_FIRST_NOTICE';

const actions = createActions({
    [GET_FIRST_NOTICE]: () => {},

});

/* 리듀서 */
const aamFirstNoticeReducer = handleActions(
    {
        [GET_FIRST_NOTICE]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamFirstNoticeReducer;