import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Pay from './pages/pay/pay';
import Schedule from './pages/schedule/schedule';
import Setting from '../src/pages/setting/allMemberList';
import Approval from './pages/approval/Approval';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path='pay' element={<Pay />} />
                    <Route path='Schedule' element={<Schedule />} />
                    <Route path='setting' element={<Setting />} />
                    <Route path='approval' element={<Approval />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
