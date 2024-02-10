import memberReducer from './MemberModule';
import payReducer from './PayModule';
import otherReducer from './OtherModule'
import settingReducer from './SettingModule'
import mypageReducer from "./MypageModule";
import approvalReducer from './ApprovalModule';
import settingMemberReducer from './SettingMemberModule';
import settingCareerReducer from './SettingCareearModule';
import settingDegreeReducer from './SettingDegreeModule';
import settingCertificateReducer from './SettingCertificateModule';
import settingInfoSearchReducer from './SettingInfoSearchModuel';

const { combineReducers } = require('redux');

// 사용할 리듀서들을 여기서 모아놓고 사용합니다.

const rootReducer = combineReducers({
    memberReducer,
    payReducer,
    settingReducer,
    mypageReducer,
    approvalReducer,
    otherReducer,
    settingReducer,
    settingMemberReducer,
    settingCareerReducer,
    settingDegreeReducer,
    settingCertificateReducer,
    settingInfoSearchReducer,

});

export default rootReducer;
