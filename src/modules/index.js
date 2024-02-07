import memberReducer from './MemberModule';
import payReducer from './PayModule';
import otherReducer from './OtherModule'
import settingReducer from './SettingModule'
import mypageReducer from "./MypageModule";
import approvalReducer from './ApprovalModule';

const { combineReducers } = require('redux');

// 사용할 리듀서들을 여기서 모아놓고 사용합니다.

const rootReducer = combineReducers({
    memberReducer,
    payReducer,
    settingReducer,
    mypageReducer,
    approvalReducer,
    otherReducer,
    settingReducer
});

export default rootReducer;
