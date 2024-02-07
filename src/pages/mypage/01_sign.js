
import './01_profileInfo.css';
import './core.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  useRef,useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils.js';
import PersonnelInfo from './02_personnelInfo.js';
// import {
//   callMemberDetailAPI
// } from '../../apis/MyPageAPICalls.js';

function Sign(){
    const navigate = useNavigate();
  const canvasRef = useRef({ width: 500, height: 300 });

  
  console.log(canvasRef);
  const [drawble, setDrawble] = useState(false);
  

  useEffect(() => {
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
  

    function canvasResize() {
      
      console.log(canvas);
  const div = canvas.parentElement;
  canvas.width = div.clientWidth;
  canvas.height = div.clientHeight;
    }
    
    function draw(e) {
      function getPosition() {
        return {
          X: e.pageX - canvas.offsetLeft,
          Y: e.pageY - canvas.offsetTop
        };
      }

      switch (e.type) {
        case "mousedown":
          setDrawble(true);
          ctx.beginPath();
          ctx.moveTo(getPosition().X, getPosition().Y);
          break;
        case "mousemove":
          if (drawble) {
            ctx.lineTo(getPosition().X, getPosition().Y);
            ctx.stroke();
          }
          break;
        case "mouseup":
        case "mouseout":
          setDrawble(false);
          ctx.closePath();
          break;
      }
    }

    function touchdraw(e) {
      function getPosition() {
        return {
          X: e.changedTouches[0].pageX - canvas.offsetLeft,
          Y: e.changedTouches[0].pageY - canvas.offsetTop
        };
      }

      switch (e.type) {
        case "touchstart":
          setDrawble(true);
          ctx.beginPath();
          ctx.moveTo(getPosition().X, getPosition().Y);
          break;
        case "touchmove":
          if (drawble) {
            e.preventDefault();
            ctx.lineTo(getPosition().X, getPosition().Y);
            ctx.stroke();
          }
          break;
        case "touchend":
        case "touchcancel":
          setDrawble(false);
          ctx.closePath();
          break;
      }
    }
    
    canvas.addEventListener("mousedown", draw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", draw);
    canvas.addEventListener("mouseout", draw);

    canvas.addEventListener("touchstart", touchdraw);
    canvas.addEventListener("touchend", touchdraw);
    canvas.addEventListener("touchcancel", touchdraw);
    canvas.addEventListener("touchmove", touchdraw);

    return () => {
      canvas.removeEventListener("mousedown", draw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", draw);
      canvas.removeEventListener("mouseout", draw);

      canvas.removeEventListener("touchstart", touchdraw);
      canvas.removeEventListener("touchend", touchdraw);
      canvas.removeEventListener("touchcancel", touchdraw);
      canvas.removeEventListener("touchmove", touchdraw);
    };
  }, [drawble]);

  const handleSaveClick = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onClickBack = () => {
    navigate("/mp",{replace:true})
  };

    const [activeTab, setActiveTab] = useState('프로필 정보');

    const handleTabClick = (tab) => {
      setActiveTab(tab);

      if (tab === '프로필 정보'){
        navigate("/mp", { replace: true })
      }
      if (tab === '인사 정보'){
        navigate("/mppersonnelInfo", { replace: true })
      }
      if (tab === '연차 관리'){
        navigate("/mpvacation", { replace: true })
      }
      if (tab === '출퇴근 정보'){
        navigate("/mpattendance", { replace: true })
      }
      if (tab === '서류함'){
        navigate("/mpdocument", { replace: true })
      }
    };
    return (
      <>
  <div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">

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
                <div 
                style={{
                  backgroundColor: '#fff',
                  backgroundClip: 'border-box',
                  border: '0 solid #d9dee3',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 6px 0 rgba(67, 89, 113, 0.12)',
                }}
                
                >
                  
                  <h5 className="card-header">서명 등록</h5>
         
                      
                
      <div style={{ 
        marginLeft:'20px',
        width:'500px',
        height:'300px',
       }}>
        <canvas width='500px' height={300} ref={canvasRef} style={{ border: "1px solid black" ,
      }} />
      </div>



      <div style={{
        display:'flex',
        marginTop:'30px',
        marginLeft:'20px',
        width:'500px',
        justifyContent:'space-between',
      }}>

                              <button id="btn-modal1" className="modalButton" onClick={ onClickBack }>이전으로</button>



                              <button id="btn-modal2" className="modalButton" onClick={handleSaveClick}
                              >저장</button>
      </div>

      <div
      style={{
        height:'30px',
      }}
      >

      </div>

             
                  
                </div>
                
              </div>
            </div>
    
          </div>

          <div className="content-backdrop fade"></div>
        </div>
      </div>
    </div>

    <div className="layout-overlay layout-menu-toggle"></div>
  </div>
      </>
  )
}
export default Sign;