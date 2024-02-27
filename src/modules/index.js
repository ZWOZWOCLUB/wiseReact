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
import settingInfoSearchReducer from "./SettingInfoSearchModuel";
import noticeReducer from "./NoticeModule";
import scheduleReducer from "./ScheduleModule";
import mpUpdateReducer from "./MPUpdateModule";
import approvalTypeReducer from "./ApprovalTypeModule";
import approvalCompleteReducer from "./ApprovalCompleteInfoModule";
import approvalInfoReducer from "./ApprovalInfoModule";
import notCommentReducer from "./NotCommentModule";
import mpProReducer from "./MPProfileModule";
import mpSignReducer from "./MPSignModule";
import schedulePatternReducer from "./SchedulePatternModule";
import attendanceInfoReducer from "./AttendanceMoudle";
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
import scheduleSearchValueReducer from "./ScheduleSearchValueModule";
import scheduleSearchValueNotReducer from "./ScheduleSearchValueNotModule";
import scheduleSearchETCReducer from "./ScheduleSearchETCModule";
import aamSendNewMsgReducer from "./AAMSendNewMsgModule";
import aamRecNewMsgReducer from "./AAMRecNewMsgModule";
import mpATTListReducer from "./MPATTListModule";
import settingSerchPositionReducer from "./SettingSerchPositionModule";
import dataFormatReducer from "./DataFormatModule";
import schedulePatternDayReducer from "./SchedulePatternDayModule";
import scheduleUpdateReducer from "./ScheduleUpdateModule";
import settingSearchMemListReducer from "./SettingSearchMemListModule";
import scheduleInsertReducer from "./ScheduleInsertModule";
import settingCareerInsertReducer from "./SettingCareearInsertModule";
import settingCareerUpdateReducer from "./SettingCareearUpdateModule";
import settingCareerDeleteReducer from "./SettingCareearDeleteModule";
import settingDegreeInsertReducer from "./SettingDegreeInsertModule";
import settingDegreeUpdateReducer from "./SettingDegreeUpdateModule";
import settingDegreeDeleteReducer from "./SettingDegreeDeleteModule";
import settingCertificateInsertReducer from "./SettingCertificateInsertModule";
import settingCertificateUpdateReducer from "./SettingCertificateUpdateModule";
import settingCertificateDeleteReducer from "./SettingCertificateDeleteModule";
import settingDocumentInsertReducer from "./SettingDocumentInsertModule";
import settingDocumentUpdateReducer from "./SettingDocumentUpdateModule";
import settingDocumentDeleteReducer from "./SettingDocumentDeleteModule";
import settingSalaryInsertReducer from "./SettingSalaryInsertModule";
import settingSalaryUpdateReducer from "./SettingSalaryUpdateModule";
import settingSalaryDeleteReducer from "./SettingSalaryDeleteModule";
import scheduleTreeReducer from "./ScheduleTreeModule";
import searchProxyReducer from "./SearchProxyModule";
import scheduleUpdateTreeReducer from "./ScheduleUpdateTreeModule";
import organizationEditSearchReducer from "./OrganizationEditSearchModule";
import aamFirstNoticeReducer from "./AAMFirstNoticeModule";
import aamFirstRecReducer from "./AAMFirstRecModule";
import aamFirstSendReducer from "./AAMFirstSendModule";

const { combineReducers } = require("redux");

// 사용할 리듀서들을 여기서 모아놓고 사용합니다.

const rootReducer = combineReducers({
  aamFirstNoticeReducer,
  aamFirstRecReducer,
  aamFirstSendReducer,
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
  settingSerchPositionReducer,
  settingMemberReducer,
  mpDocReducer,
  mpATTReducer,
  mpVacHisReducer,
  mpVacReducer,
  settingInfoSearchReducer,
  noticeReducer,
  notCommentReducer,
  schedulePatternDayReducer,
  scheduleReducer,
  mpUpdateReducer,
  approvalInfoReducer,
  approvalCompleteReducer,
  approvalTypeReducer,
  mpProReducer,
  mpSignReducer,
  schedulePatternReducer,
  attendanceInfoReducer,
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
  scheduleSearchValueReducer,
  scheduleSearchValueNotReducer,
  scheduleSearchETCReducer,
  aamSendNewMsgReducer,
  aamRecNewMsgReducer,
  mpATTListReducer,
  scheduleUpdateReducer,
  scheduleInsertReducer,
  settingSearchMemListReducer,
  settingCareerInsertReducer,
  settingCareerUpdateReducer,
  settingCareerDeleteReducer,
  settingDegreeInsertReducer,
  settingDegreeUpdateReducer,
  settingDegreeDeleteReducer,
  settingCertificateInsertReducer,
  settingCertificateUpdateReducer,
  settingCertificateDeleteReducer,
  settingDocumentInsertReducer,
  settingDocumentUpdateReducer,
  settingDocumentDeleteReducer,
  settingSalaryInsertReducer,
  settingSalaryUpdateReducer,
  settingSalaryDeleteReducer,
  scheduleTreeReducer,
  searchProxyReducer,
  dataFormatReducer,
  scheduleUpdateTreeReducer,
  organizationEditSearchReducer,
});

export default rootReducer;
