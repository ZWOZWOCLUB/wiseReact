import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import HeaderCSS from './Login.module.css';
import { callLogoutAPI } from "../../apis/MemberAPICalls.js";
import styles from './Login.module.css';


import {
    callLoginAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';

function Login() {
        
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보

    // 폼 데이터 한번에 변경 및 State에 저장    
    const [form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });

    useEffect(() => {
        
        if(loginMember.status === 200){
            console.log("[Login] Login SUCCESS {}", loginMember);
            navigate("/main", { replace: true });
        }
    }
    ,[loginMember]);
    
    // 로그인 상태일 시 로그인페이지로 접근 방지
    if(loginMember.length > 0) {
        console.log("[Login] Login is already authenticated by the server");        
        return <Navigate to="/"/>
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
    const onClickLoginHandler = () => { 
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));
    }
    

      const isLogin = window.localStorage.getItem('accessToken');

  const onClickLogoutHandler = () => {
    window.localStorage.removeItem('accessToken');
    //로그아웃
    dispatch(callLogoutAPI());

    alert('로그아웃 완료! 메인화면으로 이동');

    navigate('/login', {replace: true})

  }

  const handleLogin = () => {
    dispatch(callLoginAPI({
        form: form
    }));
};
    const handleSubmit = (e) => {
    e.preventDefault(); // **폼 제출시 페이지 리로드 방지**
    handleLogin(); // **로그인 처리 함수 호출**
};

  function BeforeLogin() {

    return (
        <div>
            <NavLink to="/login">로그인</NavLink>
        </div>
    );
}

  function AfterLogin() {

    return (            
        <div>
            <button className={ HeaderCSS.HeaderBtn } onClick={ onClickLogoutHandler }>로그아웃</button>
        </div>
    );
}

    return (
        <>
        
            <div id="card" className={styles.card}>
                <div className='card'>
                <div className="card-body custom-card-body">
                    <div className ="qwer">
                    <h4 className="mb-2">Welcome!! 슬기로운HR+ 👋</h4>
                    <form onSubmit={handleSubmit} className="mb-3">
                        <div className="mb-3">
                            <label htmlFor="memberCode" className="form-label"><b>사원번호</b></label>
                            <input
                                className={styles.memberCodeInput}
                                type="text"
                                placeholder="사원번호"
                                name="memberId"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="mb-3 form-password-toggle">
                            <label className="form-label" htmlFor="memberPassword"><b>비밀번호</b></label>
                            <input
                                className={styles.memberPasswordInput}
                                type="password"
                                placeholder="●●●●●●●"
                                name="memberPassword"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="mb-3">
                            {/* <button onClick={onClickLoginHandler}>로그인</button> */}
                            <button type="submit" id='loginbtn' className={styles.loginbtn} >로그인</button> {/* className="btn btn-primary" */}
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
{/* 
        <div id="loginControl" className="login-control">
            {isLogin == null || isLogin === undefined ? <BeforeLogin /> : <AfterLogin />}
            
        </div> */}
        </>
    );
}

export default Login;
