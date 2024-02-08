import memberReducer from './MemberModule';
import payReducer from './PayModule';
import yearReducer from './YearModule'
import settingReducer from './SettingModule'
import mypageReducer from "./MPModule";
import approvalReducer from './ApprovalModule';
import mpCareerReducer from './MPCareerModule';
import mpCerReducer from './MPCerModule';
import mpDegreeReducer from './MPDegreeModule';
import aamAllAlarmReducer from './AAMAllAlarmModule';
import aamPerAlarmReducer from './AAMPerAlarmModule';
import aamSendMessageReducer from './AAMSendMessageModule';
import aamRecMessageReducer from './AAMRecMessageModule';

const { combineReducers } = require('redux');

// 사용할 리듀서들을 여기서 모아놓고 사용합니다.

const rootReducer = combineReducers({
    memberReducer,
    payReducer,
    yearReducer,
    settingReducer,
    mypageReducer,
    approvalReducer,
    mpCareerReducer,
    mpCerReducer,
    mpDegreeReducer,
    aamAllAlarmReducer,
    aamPerAlarmReducer,
    aamSendMessageReducer,
    aamRecMessageReducer,
});

export default rootReducer;
