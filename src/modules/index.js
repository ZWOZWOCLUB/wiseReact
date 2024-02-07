import memberReducer from './MemberModule';
import payReducer from './PayModule';
import yearReducer from './YearModule'
import settingReducer from './SettingModule'
import mypageReducer from "./MypageModule";
import approvalReducer from './ApprovalModule';

const { combineReducers } = require('redux');

// 사용할 리듀서들을 여기서 모아놓고 사용합니다.

const rootReducer = combineReducers({
    memberReducer,
    payReducer,
    yearReducer,
    settingReducer,
    mypageReducer,
    approvalReducer,
});

export default rootReducer;
