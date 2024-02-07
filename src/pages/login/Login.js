import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

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
            navigate("/", { replace: true });
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
    

    return (
        <>
        
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="mb-2">Welcome!! 👋</h4>
                                    <div className="mb-3">
                                        <label htmlFor="memberId" className="form-label"><b>사원번호</b></label>
                                        <input
                                            type="text"
                                            placeholder="사원번호"
                                            name="memberId"
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <label className="form-label" htmlFor="memberPassword">비밀번호</label>
                                        <input
                                            type="password"
                                            placeholder="●●●●●●●"
                                            name="memberPassword"
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <button onClick={onClickLoginHandler}>로그인</button>
                                        
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
