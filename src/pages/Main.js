import Login from '../pages/login/Login';
import { useDispatch } from 'react-redux';

function Main(){
    const dispatch = useDispatch();
    console.log('-------토큰-------', window.localStorage.getItem('accessToken'));

    return(
    <>
    <div>메인~~~</div>
    <Login />
    </>
    

    );
}

export default Main;