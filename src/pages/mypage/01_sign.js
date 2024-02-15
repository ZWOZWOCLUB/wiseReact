import "./01_profileInfo.css";
import "./core.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils.js";
import { callSignInsertAPI } from "../../apis/MyPageAPICalls.js";
import { callSignUpdateAPI } from "../../apis/MyPageAPICalls.js";
import { callSignAPI } from "../../apis/MyPageAPICalls.js";

function Sign() {
  const dispatch = useDispatch();

  const sign = useSelector((state) => state.mypageReducer);
  const navigate = useNavigate();
  const canvasRef = useRef({ width: 500, height: 300 });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const imageInput = useRef();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  const [error, setError] = useState(0);
  console.log(canvasRef);
  const [drawble, setDrawble] = useState(false);

  useEffect(() => {
    // 이미지 업로드시 미리보기 세팅
    if (image) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          setImageUrl(result);
        }
      };
      fileReader.readAsDataURL(image);
    }
  }, [image]);

  const onChangeImageUpload = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  // 화면 켜자마자 서명이 있나 조회하는 useEffect
  useEffect(() => {
    if (token !== null) {
      dispatch(
        callSignAPI({
          memCode: token.memCode,
        })
      );
      
    //   setError(sign.status);
    //   console.log("맨처음 useEffect에서 setError 설정 완료", error);
    }
    // setError(sign.status);
    // console.log("맨처음 useEffect에서 setError 설정 완료", error);
    // console.log('result---->',sign);
  }, []);

  // result가 변경될때마다 상태 업데이트
  // useEffect(() => {
  //   setError(result.status);
  //   console.log(result.status);
  //   console.log("useEffect에서 setError 설정 완료", error);
  // }, [result]);

  console.log("result--->", sign);
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
          Y: e.pageY - canvas.offsetTop,
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
          Y: e.changedTouches[0].pageY - canvas.offsetTop,
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

  
  // 데이터 URL을 Blob 객체로 변환하는 함수
const dataURLtoBlob = (dataURL) => {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};

  // 저장 버튼 클릭 시 넘어가는 메소드
  const handleSaveClick = () => {
    const canvas = canvasRef.current;
    console.log('canvas',canvas);
    const link = document.createElement("a");

    link.href = canvas.toDataURL("image/png");
    console.log('link.href',link.href);
    const dataURL = canvas.toDataURL("image/png");

    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const formData = new FormData();

    formData.append("memCode", token.memCode);
    if (dataURL) {
      const blob = dataURLtoBlob(dataURL);
      console.log('formdata productImage 넣음');
      formData.append("productImage", blob);
    }

    // 이미 있으니 update로
    if (sign.status === 200) {
      console.log('이미 있으니 update 합니다');
      dispatch(
        callSignUpdateAPI({
          form: formData,
        })
      );
    }

    // 없으니까 insert로
    if (sign.status === 401) {
      console.log('없으니 insert 합니다.');
      dispatch(
        callSignInsertAPI({
          form: formData,
        })
      );
    }

    // alert("서명 등록/수정이 완료되었습니다");
    // navigate("/main/mp", { replace: true });
    // window.location.reload();
  };

  const onClickBack = () => {
    navigate("/main/mp", { replace: true });
  };

  const [activeTab, setActiveTab] = useState("프로필 정보");

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "프로필 정보") {
      navigate("/main/mp", { replace: true });
    }
    if (tab === "인사 정보") {
      navigate("/main/mppersonnelInfo", { replace: true });
    }
    if (tab === "연차 관리") {
      navigate("/main/mpvacation", { replace: true });
    }
    if (tab === "출퇴근 정보") {
      navigate("/main/mpattendance", { replace: true });
    }
    if (tab === "서류함") {
      navigate("/main/mpdocument", { replace: true });
    }
  };
  return (
    <>
      <div className="layout-page">
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4">
              <span className="text-muted fw-light">계정 설정 /</span> 계정
            </h4>

            <div className="row">
              <div className="col-md-12">
                <ul className="nav nav-pills flex-column flex-md-row mb-3">
                  <li
                    className={`nav-item ${
                      activeTab === "프로필 정보" ? "active" : ""
                    }`}
                  >
                    <span
                      className="nav-link"
                      onClick={() => handleTabClick("프로필 정보")}
                    >
                      <i className="bx bx-user me-1"></i> 프로필 정보
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      activeTab === "인사 정보" ? "active" : ""
                    }`}
                  >
                    <span
                      className="nav-link"
                      onClick={() => handleTabClick("인사 정보")}
                    >
                      <i className="bx bx-bell me-1"></i> 인사 정보
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      activeTab === "연차 관리" ? "active" : ""
                    }`}
                  >
                    <span
                      className="nav-link"
                      onClick={() => handleTabClick("연차 관리")}
                    >
                      <i className="bx bx-link-alt me-1"></i> 연차 관리
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      activeTab === "출퇴근 정보" ? "active" : ""
                    }`}
                  >
                    <span
                      className="nav-link"
                      onClick={() => handleTabClick("출퇴근 정보")}
                    >
                      <i className="bx bx-link-alt me-1"></i> 출퇴근 정보
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      activeTab === "서류함" ? "active" : ""
                    }`}
                  >
                    <span
                      className="nav-link"
                      onClick={() => handleTabClick("서류함")}
                    >
                      <i className="bx bx-link-alt me-1"></i> 서류함
                    </span>
                  </li>
                </ul>
                <div
                  style={{
                    backgroundColor: "#fff",
                    backgroundClip: "border-box",
                    border: "0 solid #d9dee3",
                    borderRadius: "0.5rem",
                    boxShadow: "0 2px 6px 0 rgba(67, 89, 113, 0.12)",
                  }}
                >
                  <h5 className="card-header">서명 등록</h5>

                  <div
                    style={{
                      marginLeft: "20px",
                      width: "500px",
                      height: "300px",
                    }}
                  >
                    <canvas
                      width="500px"
                      height={300}
                      ref={canvasRef}
                      style={{ border: "1px solid black" }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      marginTop: "30px",
                      marginLeft: "20px",
                      width: "500px",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      id="btn-modal1"
                      className="modalButton"
                      onClick={onClickBack}
                    >
                      이전으로
                    </button>

                    <button
                      id="btn-modal2"
                      className="modalButton"
                      onClick={handleSaveClick}
                    >
                      저장
                    </button>
                  </div>

                  <div
                    style={{
                      height: "30px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-backdrop fade"></div>
        </div>
      </div>
    </>
  );
}
export default Sign;
