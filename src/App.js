import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Pay from './pages/pay/pay';
import Schedule from './pages/schedule/schedule';
import Setting from '../src/pages/setting/allMemberList';
import MemberInsert from './pages/setting/MemberInsert';
import Approval from './pages/approval/Approval';
import SendApproval from './pages/approval/SendApproval';
import Assignment from './pages/approval/Assignment';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path='pay' element={<Pay />} />
                    <Route path='Schedule' element={<Schedule />} />
                    <Route path='setting' element={<Setting />} />
                    <Route path='memberInsert' element={<MemberInsert />} />
                    <Route path='approval' element={<Approval />} />
                    <Route path='sendapproval' element={<SendApproval />} />
                    <Route path='assignment' element={<Assignment />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
