import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Pay from './pages/pay/pay';
import Schedule from './pages/schedule/schedule';
import Setting  from '../src/pages/setting/allMemberList';
import 'boxicons/css/boxicons.min.css';
import Organization from './pages/organizationChart/organizationChart';



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={ <Main/>}/>
                    <Route path='pay' element={ <Pay />}/>
                    <Route path="Schedule" element={ <Schedule />}/>
                    <Route path='setting' element={ <Setting />}/>
                    <Route path='organizationChart' element={ <Organization/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
