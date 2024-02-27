import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_REFERENCE   = 'login/GET_REFERENCE';

const actions = createActions({
    [GET_REFERENCE]: () => {},

});

/* 리듀서 */
const aamReferenceReducer = handleActions(
    {
        [GET_REFERENCE]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamReferenceReducer;