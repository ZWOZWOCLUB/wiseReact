import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from '../src/pages/Main';
import Pay from '../src/pages/pay/pay';
import Schedule from '../src/pages/schedule/schedule';
// import Setting  from '../src/pages/setting/allMemberList';



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={ <Main/>}/>
                    <Route path="Pay" element={ <Pay />}/>
                    {/* <Route path="Schedule" element={ <Schedule />}/> */}
                    {/* <Route path="Setting" element={ <Setting />}/> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
