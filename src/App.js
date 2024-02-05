import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import ReceiveApproval from './pages/approval/ReceiveApproval';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='approval' element={<ReceiveApproval />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
