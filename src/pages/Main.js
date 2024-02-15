import { useNavigate, useParams } from 'react-router-dom';
import Login from './login/Login';
import { decodeJwt } from '../utils/tokenUtils';

function Main(){
    
    const navigate = useNavigate();
    
    console.log('-------토큰-------', window.localStorage.getItem('accessToken'));

    let checkLogin = window.localStorage.getItem('accessToken');

    const onClickMyPage = () => {
        navigate("/main",{replace: true})
    }

//     const token = window.localStorage.getItem('accessToken');
// if (token) {
//     // 토큰의 디코딩
//     const base64Url = token.split('.')[1]; // JWT의 두 번째 부분이 Payload입니다.
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64Url을 Base64로 변환
//     const payload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     console.log('디코딩된 토큰:', payload);
// }

    return(
        <>
            <div>메인~~~</div>
            {/* { checkLogin ? null : <Login /> }  */}
            {/* <Login /> */}
        </>
    );
}

export default Main;