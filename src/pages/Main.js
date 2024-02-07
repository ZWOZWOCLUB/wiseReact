import { useNavigate, useParams } from 'react-router-dom';
import Login from './login/Login';


function Main(){
    const navigate = useNavigate();
    console.log('-------토큰-------', window.localStorage.getItem('accessToken'));
    let checkLogin = window.localStorage.getItem('accessToken');
 

    return(
        <>
            <div>메인~~~</div>
            {/* { checkLogin ? null : <Login /> }  */}
            <Login />
        </>
    );
}

export default Main;