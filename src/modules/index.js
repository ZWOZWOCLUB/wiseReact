import memberReducer from "./MemberModule";
import payReducer from "./PayModule";
import otherReducer from "./OtherModule";
import settingReducer from "./SettingModule";
import organizationChartReducer from "./OrganizationChartModule";
import mypageReducer from "./MPModule";
import approvalReducer from "./ApprovalModule";
import mpCareerReducer from "./MPCareerModule";
import mpCerReducer from "./MPCerModule";
import mpDegreeReducer from "./MPDegreeModule";
import aamAllAlarmReducer from "./AAMAllAlarmModule";
import aamPerAlarmReducer from "./AAMPerAlarmModule";
import aamSendMessageReducer from "./AAMSendMessageModule";
import aamRecMessageReducer from "./AAMRecMessageModule";
import settingMemberReducer from "./SettingMemberModule";
import mpDocReducer from "./MPDocModule";
import mpATTReducer from "./MPATTModule";
import mpVacHisReducer from "./MPVacHisModule";
import mpVacReducer from "./MPVacModule";
import settingCareerReducer from "./SettingCareearModule";
import settingDegreeReducer from "./SettingDegreeModule";
import settingCertificateReducer from "./SettingCertificateModule";
import settingInfoSearchReducer from "./SettingInfoSearchModuel";
import settingDocumentReducer from "./SettingDocumentModule";
import noticeReducer from "./NoticeModule";
import scheduleReducer from "./ScheduleModule";
import mpUpdateReducer from "./MPUpdateModule";
import approvalTypeReducer from "./ApprovalTypeModule";
import approvalCompleteReducer from "./ApprovalCompleteInfoModule";
import approvalInfoReducer from "./ApprovalInfoModule";
// import notCommentReducer from "./NotCommentModule";
import mpProReducer from "./MPProfileModule";
import mpSignReducer from "./MPSignModule";
import schedulePatternReducer from "./SchedulePatternModule";
import organizationItemReducer from "./OrganizationRefListModule";
import organizationMemberReducer from "./OrganizationMemberModule";
import organizationCreateReducer from "./OrganizationCreateModule";
import organizationListReducer from "./OrganizationListModule";
import organizationModifyReducer from "./OrganizationModifyModule";
import organizationDeleteReducer from "./OrganizationDeleteModule";
import organizationEditReducer from "./OrganizationEditModule";
import schedulePatternUpdateReducer from "./SchedulePatternUpdateModule";
import schedulePatternInsertReducer from "./SchedulePatternInsertModule";
import schedulePatternDeleteReducer from "./SchedulePatternDeleteModule";
import aamPutReducer from "./AAMModule";
import aamPutAlarmReducer from "./AAMPutAlarmModule";
import mpSalReducer from "./MPSalaryModule";
import aamSendNewMsgReducer from "./AAMSendNewMsgModule";

const { combineReducers } = require("redux");

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
  // notCommentReducer,
  scheduleReducer,
  mpUpdateReducer,
  approvalInfoReducer,
  approvalCompleteReducer,
  approvalTypeReducer,
  mpProReducer,
  mpSignReducer,
  schedulePatternReducer,
  organizationItemReducer,
  organizationMemberReducer,
  organizationCreateReducer,
  organizationListReducer,
  organizationModifyReducer,
  organizationDeleteReducer,
  organizationEditReducer,
  schedulePatternUpdateReducer,
  schedulePatternInsertReducer,
  schedulePatternDeleteReducer,
  aamPutReducer,
  aamPutAlarmReducer,
  mpSalReducer,
  aamSendNewMsgReducer,
});

export default rootReducer;
