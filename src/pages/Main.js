import { useNavigate, useParams } from 'react-router-dom';
import Login from './login/Login';


function Main(){
    const navigate = useNavigate();
    console.log('-------토큰-------', window.localStorage.getItem('accessToken'));
    let checkLogin = window.localStorage.getItem('accessToken');
    const onClickMyPage = () => {
        navigate("/mp",{replace: true})
    }


    return(
        <>
            <div>메인~~~</div>
            <div onClick={ onClickMyPage }>마이페이지로 가기</div>
            {/* { checkLogin ? null : <Login /> }  */}
            <Login />
        </>
    );
}

export default Main;