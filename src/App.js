import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Pay from './pages/pay/pay';
import Schedule from './pages/schedule/schedule';
import Setting  from '../src/pages/setting/allMemberList';
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



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={ <Main/>}/>
                    <Route path='pay' element={ <Pay />}/>
                    <Route path="Schedule" element={ <Schedule />}/>
                    <Route path='setting' element={ <Setting />}/>
                    <Route path='mp' element={ <MyPage /> }/>
                    <Route path='mpUpdate' element={ <MyPageUpdate /> }/>
                    <Route path='mppersonnelInfo' element={ <PersonnelInfo /> }/>
                    <Route path='mpvacation' element={ <MPVacation /> }/>
                    <Route path='mpattendance' element={ <MPAttendance /> }/>
                    <Route path='mpdocument' element={ <MPDocument /> }/>
                    <Route path='alarm' element={ <Alarm /> }/>
                    <Route path='message' element={ <Message /> }/>
                    <Route path='message3' element={ <Message3 /> }/>
                    

                </Route>
                <Route path='sign' element={ <SignatureCanvas /> }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
