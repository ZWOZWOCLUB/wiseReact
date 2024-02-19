import "./core.css";
import "./01_profileInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { decodeJwt } from "../../utils/tokenUtils.js";
import { callDocAPI } from "../../apis/MyPageAPICalls.js";
import { callSalAPI } from "../../apis/MyPageAPICalls.js";
import { callInfoSearchAPI } from "../../apis/SettingInfoSearchAPICalls";
import html2canvas from "html2canvas";

function MPDocument() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const canvasRef = useRef({ width: 500, height: 300 });
  const doc = useSelector((state) => state.mpDocReducer);
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const prevList = useSelector((state) => state.settingInfoSearchReducer);
  const salary = useSelector((state)=>state.mpSalReducer);

  const docList = doc.data;
  const prevListDetail = prevList.data;
  const salaryDetail = salary.data;
  // const onlyDoc = docList.documentFileDTOList;
  // console.log(onlyDoc);

  useEffect(() => {
    console.log("useEffect의 token---->", token);

    if (token !== null) {
      dispatch(
        callDocAPI({
          memCode: token.memCode,
        })
      );
      dispatch(
        callInfoSearchAPI({
          memCode: token.memCode,
        })
      );
      dispatch(
        callSalAPI({
          memCode: token.memCode,
        })
      );
    }
  }, []);

  const onCapture = () => {
    html2canvas(document.getElementById("imageWrapper")).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), "karina.png");
    });
  };

    //파일 다운하는 함수
    // const onClickCrrFileDown = async (index) => {
    //   try {
    //     const response = await fetch(prevList.careerFileDTO[index].crrAtcPath); //파일 경로 지정
    //     const blob = await response.blob(); //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
    //     const url = window.URL.createObjectURL(new Blob([blob])); //다운로드 링크 생성
    //     const link = document.createElement("a"); //a 요소 생성
    //     link.href = url; //url을 a태그의 href속성으로 지정
    //     link.setAttribute("download", prevList.careerFileDTO[index].crrAtcName); //다운로드 파일 이름 지정
    //     document.body.appendChild(link); //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
    //     link.click(); //생성한 링크 클릭해서 파일 다운
    //     link.parentNode.removeChild(link); //a요소 제거
    //   } catch (error) {
    //     console.log("등록된 파일이 없습니다");
    //   }
    // };

     //파일 다운하는 함수
  const onClickCrrFileDown = async () => {
    try {
      const response = await fetch(prevList.salaryFileDTO.salAtcPath); //파일 경로 지정
      const blob = await response.blob();                              //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
      const url = window.URL.createObjectURL(new Blob([blob]));        //다운로드 링크 생성
      const link = document.createElement('a');                        //a 요소 생성
      link.href = url;                                                 //url을 a태그의 href속성으로 지정
      link.setAttribute('download', prevList.salaryFileDTO.salAtcName);//다운로드 파일 이름 지정
      document.body.appendChild(link);                                 //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
      link.click();                                                    //생성한 링크 클릭해서 파일 다운
      link.parentNode.removeChild(link);                               //a요소 제거
    } catch (error) {
      console.log('등록된 파일이 없습니다')
    }
  };

  const onSaveAs = (uri, filename) => {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  // const filteredDocList = docList.filter(item => item.docAtcKind !== '서명' && item.docAtcKind !== '프로필');

  const onClickDown = async (index) => {
    // index = convertFileName

    if (index === "통장사본") {
      // 통장사본파일을 조회하는 API를 호출해서 정보를 불러온다음 다운로드
      //파일 다운하는 함수
      try {
        // const imageUrl = prevList.salaryFileDTO.salAtcConvertName;
        // console.log('image 저장하기--->',prevList.salaryFileDTO.salAtcConvertName);
        // const link = document.createElement('a');

        // link.href = imageUrl;
        // console.log('link.href',link.href);

        // link.download = 'image.png'; // 파일명을 지정할 수 있습니다.
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);

        const response = await fetch(prevList.salaryFileDTO.salAtcPath); //파일 경로 지정
        const blob = await response.blob(); //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
        const url = window.URL.createObjectURL(new Blob([blob])); //다운로드 링크 생성
        const link = document.createElement("a"); //a 요소 생성
        link.href = url; //url을 a태그의 href속성으로 지정
        link.setAttribute("download", prevList.salaryFileDTO.salAtcName); //다운로드 파일 이름 지정
        document.body.appendChild(link);
        link.download = "통장 사본"; //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
        link.click(); //생성한 링크 클릭해서 파일 다운
        link.parentNode.removeChild(link);

        //       const imageUrl = 'http://localhost:8001/salary/d1d5cefa23184c4f9b7be548862379bf.png';

        // const link = document.createElement('a');
        // link.href = imageUrl;
        // link.download = 'image.png'; // 파일명을 지정할 수 있습니다.

        // document.body.appendChild(link);

        // link.click();

        // document.body.removeChild(link);
        // navigate("/main/test", { replace: true })
      } catch (error) {
        console.log("등록된 파일이 없습니다");
      }
    } else {
      try {
        const response = await fetch(index); //파일 경로 지정
        const blob = await response.blob(); //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
        const url = window.URL.createObjectURL(new Blob([blob])); //다운로드 링크 생성
        const link = document.createElement("a"); //a 요소 생성
        link.href = url; //url을 a태그의 href속성으로 지정
        link.setAttribute("download", index); //다운로드 파일 이름 지정
        document.body.appendChild(link); //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
        link.click(); //생성한 링크 클릭해서 파일 다운
        link.parentNode.removeChild(link); //a요소 제거
      } catch (error) {
        console.log("등록된 파일이 없습니다");
      }
    }
  };

  // const onClickDown = (tab) => {
  //   if (tab === '통장사본') {
  //     // 통장사본파일을 조회하는 API를 호출해서 정보를 불러온다음 다운로드
  //   }
  // };

  console.log("doc--->", doc);
  console.log("docList--->", docList);
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
                <div className="card mb-4">
                  <h5 className="card-header">서류함</h5>
                  <hr className="my-0" />

                  <div id="iwantoverflow">
                    <div
                      className="card-body"
                      style={{ overflowY: "auto", height: "700px" }}
                    >
                      <div className="card">
                        <div className="table-responsive text-nowrap"></div>

                        <table className="table table-striped" id="table">
                          <thead>
                            <tr style={{ textAlign: "center" }}>
                              <th>증빙서류이름</th>
                              <th>제출일</th>
                              <th>다운로드</th>
                            </tr>
                          </thead>
                          {docList ? (
                            <tbody className="table-border-bottom-0">
                              {docList &&
                                docList.map((documentFileDTOList) => (
                                  <tr
                                    style={{ textAlign: "center" }}
                                    className="List"
                                  >
                                    <td>
                                      <div>
                                        {documentFileDTOList.docAtcKind}
                                      </div>
                                    </td>
                                    <td>
                                      {documentFileDTOList.docAtcRegistDate}
                                    </td>
                                    <td>
                                      <img
                                        src={
                                          documentFileDTOList.docAtcOriginName
                                        }
                                        id="img_prev"
                                        width="640"
                                        height="640"
                                        alt="karina"
                                      />
                                      <i
                                        className="bx bx-down-arrow-alt"
                                        style={{ paddingRight: 10 }}
                                        onClick={onCapture}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              {salaryDetail ? 
                                  <tr
                                    style={{ textAlign: "center" }}
                                    className="List"
                                  >
                                    <td>
                                      <div>통장 사본</div>
                                    </td>
                                    <td>-</td>
                                    <td>
                                      <i
                                        className="bx bx-down-arrow-alt"
                                        style={{ paddingRight: 10 }}
                                        onClick={onClickCrrFileDown}
                                      />
                                    </td>
                                  </tr>
                                : ''}
                            </tbody>
                          ) : (
                            "로딩중"
                          )}
                        </table>
                      </div>
                    </div>
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
export default MPDocument;
