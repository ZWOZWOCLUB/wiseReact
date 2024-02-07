import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Pay from './pages/pay/pay';
import Schedule from './pages/schedule/schedule';
import Setting from '../src/pages/setting/allMemberList';
import Login from './pages/login/Login'; // Login 컴포넌트 임포트

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Main/>}/>
                    <Route path='pay' element={<Pay />}/>
                    <Route path="Schedule" element={<Schedule />}/>
                    <Route path='setting' element={<Setting />}/>
                    {/* 로그인 페이지 라우트 추가 */}
                    <Route path="/login" element={<Login />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
