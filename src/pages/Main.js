import { useNavigate, useParams } from 'react-router-dom';
import './Main.css';

function Main() {
    const navigate = useNavigate();

    console.log('-------토큰-------', window.localStorage.getItem('accessToken'));

    let checkLogin = window.localStorage.getItem('accessToken');

    const onClickMyPage = () => {
        navigate('/', { replace: true });
    };

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

    return (
        <>
            <div className='container-xxl flex-grow-1 container-p-y'>
                {/*결재 관리*/}
                <div className='card-body'>
                    <div className='row main-flex'>
                        <div className='col-lg-4'>
                            <div className='card mb-4 mb-lg-0'>
                                <div className='card-body'>
                                    <div
                                        className='status-numbers'
                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <div className='status-item-container'>
                                            <div className='status-item'>
                                                <div style={{ color: 'blue' }}>2C</div>
                                                <div>승인</div>
                                            </div>
                                        </div>
                                        <div className='status-item-container'>
                                            <div className='status-item'>
                                                <div style={{ color: 'red' }}>1C</div>
                                                <div>반려</div>
                                            </div>
                                        </div>
                                        <div className='status-item-container'>
                                            <div className='status-item'>
                                                <div style={{ color: 'aquamarine' }}>5C</div>
                                                <div>대기</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 근태관리 */}
                        <div className='col-lg-8'>
                            <div className='card mb-4'>
                                <div className='main-flex main-between'>
                                    <p className='card-header main-att-date'>2024.01.12 시간까지 </p>
                                    <a href='/index.html' className='card-header'>
                                        상세보기 ??? 머임 ?
                                    </a>
                                </div>
                                <div className='card-body main-flex main-between'>
                                    <div className='main-att-btn'>
                                        <button className='btn btn-primary btn-lg'>출근</button>
                                        <p className='card-text main-att-time'>
                                            AM 09:00 이거 일정 시간에 맞게 뽑아야함
                                        </p>
                                    </div>
                                    <div className='main-att-btn'>
                                        <button className='btn btn-secondary btn-lg'>퇴근</button>
                                        <p className='card-text main-att-time' style={{ color: '#d3d3d3' }}>
                                            PM 06:00 퇴근시간에 맞게
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
