import memberReducer from './MemberModule';
import payReducer from './PayModule';
import otherReducer from './OtherModule';
import settingReducer from './SettingModule';
import organizationChartReducer from './OrganizationChartModule';
import mypageReducer from './MPModule';
import approvalReducer from './ApprovalModule';
import mpCareerReducer from './MPCareerModule';
import mpCerReducer from './MPCerModule';
import mpDegreeReducer from './MPDegreeModule';
import aamAllAlarmReducer from './AAMAllAlarmModule';
import aamPerAlarmReducer from './AAMPerAlarmModule';
import aamSendMessageReducer from './AAMSendMessageModule';
import aamRecMessageReducer from './AAMRecMessageModule';
import settingMemberReducer from './SettingMemberModule';
import mpDocReducer from './MPDocModule';
import mpATTReducer from './MPATTModule';
import mpVacHisReducer from './MPVacHisModule';
import mpVacReducer from './MPVacModule';
import settingCareerReducer from './SettingCareearModule';
import settingDegreeReducer from './SettingDegreeModule';
import settingCertificateReducer from './SettingCertificateModule';
import settingInfoSearchReducer from './SettingInfoSearchModuel';
import settingDocumentReducer from './SettingDocumentModule';
import noticeReducer from './NoticeModule';
import scheduleReducer from './ScheduleModule';
import mpUpdateReducer from './MPUpdateModule';
import approvalTypeReducer from './ApprovalTypeModule';
import approvalCompleteReducer from './ApprovalCompleteInfoModule';
import approvalInfoReducer from './ApprovalInfoModule';
// import notCommentReducer from "./NotCommentModule";
import mpProReducer from './MPProfileModule';
import mpSignReducer from './MPSignModule';
import schedulePatternReducer from './SchedulePatternModule';
import attendanceInfoReducer from './AttendanceMoudle';

const { combineReducers } = require('redux');

// 사용할 리듀서들을 여기서 모아놓고 사용합니다.

const rootReducer = combineReducers({
    memberReducer,
    payReducer,
    settingReducer,
    organizationChartReducer,
    mypageReducer,
    approvalReducer,
    mpCareerReducer,
    mpCerReducer,
    mpDegreeReducer,
    aamAllAlarmReducer,
    aamPerAlarmReducer,
    aamSendMessageReducer,
    aamRecMessageReducer,
    otherReducer,
    settingMemberReducer,
    mpDocReducer,
    mpATTReducer,
    mpVacHisReducer,
    mpVacReducer,
    settingCareerReducer,
    settingDegreeReducer,
    settingCertificateReducer,
    settingInfoSearchReducer,
    settingDocumentReducer,
    noticeReducer,
    // notCommentReducer,
    scheduleReducer,
    mpUpdateReducer,
    approvalInfoReducer,
    approvalCompleteReducer,
    approvalTypeReducer,
    mpProReducer,
    mpSignReducer,
    schedulePatternReducer,
    attendanceInfoReducer,
});

export default rootReducer;
