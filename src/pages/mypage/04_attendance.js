
import './core.css'
import './01_profileInfo.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Calendar from '@toast-ui/calendar';
import { decodeJwt } from '../../utils/tokenUtils.js';
import { callATTAPI } from '../../apis/MyPageAPICalls.js';

function MPAttendance(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const att = useSelector((state) => state.mpATTReducer);

    const attDetail = att.data;


    useEffect(
      () => {
        console.log('useEffect의 token---->',token);
  
        if(token !== null) {
  
          dispatch(callATTAPI({	
              memCode: 2
            // memCode: token.memCode
            // 원래 토큰에서 memCode를 넘겨줘야하지만 사번 1번의 샘플데이터가 없어 2번으로 지정 후 임의로 데이터를 불러옴
            // 마찬가지로 date도 useState로 캘린더에서 클릭한 값을 넘겨줘야함(기본값은 오늘 날짜로)
     
          }));         
      }        
      }
    ,[]
  );

  console.log('att--->',att);
  console.log('attDetail--->',attDetail);

    

    const [activeTab, setActiveTab] = useState('프로필 정보');

    const handleTabClick = (tab) => {
      setActiveTab(tab);

      if (tab === '프로필 정보'){
        navigate("/main/mp", { replace: true })
      }
      if (tab === '인사 정보'){
        navigate("/main/mppersonnelInfo", { replace: true })
      }
      if (tab === '연차 관리'){
        navigate("/main/mpvacation", { replace: true })
      }
      if (tab === '출퇴근 정보'){
        navigate("/main/mpattendance", { replace: true })
      }
      if (tab === '서류함'){
        navigate("/main/mpdocument", { replace: true })
      }
    };



    // 캘린더 시작

    const calendarRef = useRef(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    // const dipatch = useDispatch();
    // const approvals = useSelector((state) => state.approvalReducer);
    // const approvalList = approvals.data;

    // console.log('approvalList ', approvalList);

    useEffect(() => {
        if (calendarRef.current) {
            const container = calendarRef.current;

            const options = {
                defaultView: 'month',
                month: {
                    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                },
                timezone: {
                    zones: [
                        {
                            timezoneName: 'Asia/Seoul',
                            displayLabel: 'Seoul',
                        },
                        {
                            timezoneName: 'Europe/London',
                            displayLabel: 'London',
                        },
                    ],
                },
            };
            const calendar = new Calendar(container, options);

            calendar.setTheme({
                month: {
                    weekend: {
                        backgroundColor: 'aliceblue',
                    },
                },
            });
            setCurrentDate(new Date());

            const todayButton = document.getElementById('today');
            todayButton.addEventListener('click', function () {
                calendar.today();
                displayMonth();
            });

            const prevButton = document.getElementById('prev');
            prevButton.addEventListener('click', function () {
                calendar.prev();
                displayMonth();
            });

            const nextButton = document.getElementById('next');
            nextButton.addEventListener('click', function () {
                calendar.next();
                displayMonth();
            });

            const range = document.querySelector('.range');

            function displayMonth() {
                var currentDate = calendar.getDate();
                var year = currentDate.getFullYear();
                var month = currentDate.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month;
                }

                range.textContent = year + '년 ' + month + '월';
            }

            displayMonth();
        }
    }, []);

    // 캘린더 끝

    return(
        <>

        <div className="layout-page">

          <div className="content-wrapper">

            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">계정 설정 /</span> 계정</h4>

              <div className="row">
                <div className="col-md-12">
                <ul className="nav nav-pills flex-column flex-md-row mb-3">
      <li className={`nav-item ${activeTab === '프로필 정보' ? 'active' : ''}`}>
        <span className="nav-link" onClick={() => handleTabClick('프로필 정보')}>
          <i className="bx bx-user me-1"></i> 프로필 정보
        </span>
      </li>
      <li className={`nav-item ${activeTab === '인사 정보' ? 'active' : ''}`}>
        <span className="nav-link" onClick={() => handleTabClick('인사 정보')}>
          <i className="bx bx-bell me-1"></i> 인사 정보
        </span>
      </li>
      <li className={`nav-item ${activeTab === '연차 관리' ? 'active' : ''}`}>
        <span className="nav-link" onClick={() => handleTabClick('연차 관리')}>
          <i className="bx bx-link-alt me-1"></i> 연차 관리
        </span>
      </li>
      <li className={`nav-item ${activeTab === '출퇴근 정보' ? 'active' : ''}`}>
        <span className="nav-link" onClick={() => handleTabClick('출퇴근 정보')}>
          <i className="bx bx-link-alt me-1"></i> 출퇴근 정보
        </span>
      </li>
      <li className={`nav-item ${activeTab === '서류함' ? 'active' : ''}`}>
        <span className="nav-link" onClick={() => handleTabClick('서류함')}>
          <i className="bx bx-link-alt me-1"></i> 서류함
        </span>
      </li>
    </ul>
                  <div className="card mb-4">
                    <h5 className="card-header">출퇴근 정보</h5>
                    <hr className="my-0" />

            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title m-0 me-2">기록</h5>
                    </div>
                    <div className="card-body">

                     {/* <div id='calendar'></div> */}

                     {/* 캘린더 시작 */}
                     <div>
                                                    <button className='prev' id='prev'>
                                                        {'<'}
                                                    </button>
                                                    <span className='range' id='range'></span>
                                                    <button className='next' id='next'>
                                                        {'>'}
                                                    </button>
                                                    <button className='today' id='today'>
                                                        Today
                                                    </button>
                                                    <div
                                                        className='payment-calendar'
                                                        id='calendar'
                                                        ref={calendarRef}
                                                    ></div>
                                                </div>
                     {/* 캘린더 끝 */}

                    </div>
                  </div>
                </div>
                <div className="col-6 mb-4">

{attDetail ? 

<div>


                  <div className="card" id="firstItem">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img src="../../assets/img/icons/unicons/cc-primary.png" alt="Credit Card" className="rounded" />
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">출근 시각</span>
                      <h3 className="card-title mb-2">{ attDetail.attStartTime }</h3>
                    </div>
                  </div>



                  <div className="card" id="secondItem">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img src="../../assets/img/icons/unicons/cc-primary.png" alt="Credit Card" className="rounded" />
                        </div>
                        
                      </div>
                      <span className="fw-semibold d-block mb-1">퇴근 시각</span>
                      <h3 className="card-title mb-2">
                      <h3 className="card-title mb-2">
                        {attDetail.attEndTime ? attDetail.attEndTime : '퇴근전'}
                      </h3>
                        </h3>
                    </div>
                  </div>



                  <div className="card" id="thirdItem">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img src="../../assets/img/icons/unicons/cc-primary.png" alt="Credit Card" className="rounded" />
                        </div>
                       
                      </div>
                      <span className="fw-semibold d-block mb-1">총 근무 시간</span>
                      <h3 className="card-title mb-2">{ attDetail.totalWork }</h3>
                      <small className="text-success fw-semibold">쉬는시간 제외</small>
                    </div>
                  </div>

                  </div> : '로딩중'}


                </div>
                  
              </div>
              
            </div>
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="content-backdrop fade"></div>
          </div>
        </div>

    
        </>
    )
}
export default MPAttendance;