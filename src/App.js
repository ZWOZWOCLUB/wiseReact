import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Pay from './pages/pay/pay';
import Schedule from './pages/schedule/schedule';
import Setting from '../src/pages/setting/allMemberList';
import Login from './pages/login/Login'; // Login 컴포넌트 임포트
import MemberAdd from './pages/setting/memberAdd';
import Approval from './pages/approval/Approval';
import SendApproval from './pages/approval/SendApproval';
import Assignment from './pages/approval/Assignment';
import SettingInfo from './pages/setting/settingInfo';

import MyPage from './pages/mypage/01_profileInfo';
import PersonnelInfo from './pages/mypage/02_personnelInfo';
import MPVacation from './pages/mypage/03_vacation';
import MPAttendance from './pages/mypage/04_attendance';
import MPDocument from './pages/mypage/05_document';
import Alarm from './pages/alarmAndMessage/alarm';
import Message from './pages/alarmAndMessage/message';
import Message3 from './pages/alarmAndMessage/message copy';
import SignatureCanvas from './pages/mypage/sign';
import MyPageUpdate from './pages/mypage/01_profileUpdate';
import SettingDocument from './pages/setting/SettingDocument';
import SettingVacation from './pages/setting/settingVaction';
import SettingAttendance from './pages/setting/settingAttendance';
import 'boxicons/css/boxicons.min.css';
import Sign from './pages/mypage/01_sign';
import Organization from './pages/organizationChart/organizationChart';
import DataFormat from './pages/dataformat/dataformat';
import RequestApproval from './pages/approval/RequestApproval';
import NoticeMain from './pages/notice/NoticeMain';
import NoticeWrite from './pages/notice/NoticeWrite';
import NoticeDetail from './pages/notice/NoticeDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path='pay' element={<Pay />} />
                    <Route path='Schedule' element={<Schedule />} />
                    <Route path='setting' element={<Setting />} />
                    <Route path='memberAdd' element={<MemberAdd />} />
                    <Route path='approval' element={<Approval />} />
                    <Route path='sendapproval' element={<SendApproval />} />
                    <Route path='assignment' element={<Assignment />} />
                    <Route path='requestapproval' element={<RequestApproval />} />
                    <Route path='mp' element={<MyPage />} />
                    <Route path='mpUpdate' element={<MyPageUpdate />} />
                    <Route path='mppersonnelInfo' element={<PersonnelInfo />} />
                    <Route path='mpvacation' element={<MPVacation />} />
                    <Route path='mpattendance' element={<MPAttendance />} />
                    <Route path='mpdocument' element={<MPDocument />} />
                    <Route path='alarm' element={<Alarm />} />
                    <Route path='message' element={<Message />} />
                    <Route path='message3' element={<Message3 />} />
                    <Route path='sign' element={<Sign />} />
                    <Route path='/login' element={<Login />} /> {/* 로그인 페이지 라우트 추가 */}
                    <Route path='organizationChart' element={<Organization />} />
                    {/* <Route path='dataformat' element={<DataFormat />} /> */}
                    <Route path='notice' element={<NoticeMain />} />
                    <Route path='noticeWrite' element={<NoticeWrite />} />
                    <Route path='noticeDetail' element={<NoticeDetail />} />
                    <Route path='mp' element={<MyPage />} />
                    <Route path='mpUpdate' element={<MyPageUpdate />} />
                    <Route path='mppersonnelInfo' element={<PersonnelInfo />} />
                    <Route path='mpvacation' element={<MPVacation />} />
                    <Route path='mpattendance' element={<MPAttendance />} />
                    <Route path='mpdocument' element={<MPDocument />} />
                    <Route path='alarm' element={<Alarm />} />
                    <Route path='message' element={<Message />} />
                    <Route path='message3' element={<Message3 />} />
                    <Route path='/login' element={<Login />} /> {/* 로그인 페이지 라우트 추가 */}
                    <Route path='settingInfo' element={<SettingInfo />} />
                    <Route path='settingDocument' element={<SettingDocument />} />
                    <Route path='settingVacation' element={<SettingVacation />} />
                    <Route path='settingAttendance' element={<SettingAttendance />} />
                </Route>
                {/* <Route path='sign' element={ <SignatureCanvas /> }/> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
