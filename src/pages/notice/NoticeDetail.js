import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import '../../@core/vendor/css/themeDefault.css';
import '../../@core/vendor/css/core.module.css';
import "./noticeDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callDetailNoticeAPI } from "../../apis/NoticeAPICalls.js";

function NoticeDetail() {

  const { notCode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noticeDetail = useSelector((state) => state.noticeDetail);

  // useEffect(() => {
  //   if (notCode) {
  //     dispatch(callDetailNoticeAPI(notCode))
  //       .then((response) => {
  //         // API 호출 성공 시, 상태 업데이트
  //         setNoticeDetail(response.data);
  //       })
  //       .catch((error) => {
  //         console.error('API call failed:', error);
  //       });
  //   }
  // }, [notCode, dispatch]);

   
    return(
      <>

<div className="layout-wrapper layout-content-navbar">
  <div className="layout-container">
    <div className="layout-page">
      <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light" />
          </h4>
         <div className="col-xxl">
            <div className="card mb-4">
              <div className="row">
                <div className="col-xl">
                  <div
                    className="pay-top-wrapper"
                    style={{ width: "80%", margin: "0 auto" }}
                  >
                    <div style={{ color: "#8184ff" }}>
                      <b>공지사항</b>
                    </div>
                 </div>
                  <div
                    className="card-body"
                    style={{ width: "80%", margin: "0 auto" }}
                  >
                    <div className="card-title" style={{ fontSize: 20 }}>
                      {/* {제목}  */}
                      {noticeDetail.notName}
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "20%" }}>
                        {/* {작성일}  */}
                        {noticeDetail.notCreateDate} </div>
                      <div style={{ width: "25%" }}>
                        {/* {작성자직위, 작성자}  */}
                        {noticeDetail.notMember.posCode.posName} {noticeDetail.notMember.memName}
                      </div>
                      <div>
                        {/* {조회수}  */}
                        {noticeDetail.notView}</div>
                    </div>
                    <br />
                    <hr className="m-0" />
                    <br />
                    <div
                      style={{
                        height: "90%",
                        backgroundColor: "#fafafa",
                        padding: "3%",
                        borderRadius: 5,
                        border: "1px solid #e6e6e6"
                      }}
                    >
                      {/* {내용}  */}
                      {noticeDetail.notComment}
                    </div>
                    <br />
                    <hr className="m-0" />
                    <br />
                    <label
                      className="form-label"
                      htmlFor="basic-default-message"
                    >
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAMVJREFUSEvt1jGKAkEQheHPUxisiG6yXsBEEPcGnscb6IU2FTfeyEwEUTDxFCsDIyj0TDEzTjadVtX7ux5Fdfe0fHot60sBllhjUgI/YIFbdMEU4IqPqBBHzCNICvCfixfZ94hnaSfMyiBNAGeMok6aAAb4xWdZJ00AWW0fO3wVQZoAUnPwh+lzoA5gi++SKXvRrAMo0k5OXwd4tquzKFx/nUXvs+iCYSiXTshW+DjaRdmTuck3ZBXOHiv8RIAqomFu67+KO/FSNxktQEWgAAAAAElFTkSuQmCC" />{" "}
                      첨부파일
                    </label>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          backgroundColor: "#d9d9d9",
                          borderRadius: 5,
                          fontSize: 12,
                          padding: 2,
                          display: "inline-block",
                          marginRight: 4
                        }}
                      >
                        NO-SHOW.jpg
                      </div>
                      <div
                        style={{
                          backgroundColor: "#d9d9d9",
                          borderRadius: 5,
                          fontSize: 12,
                          padding: 2,
                          display: "inline-block"
                        }}
                      >
                        Test.jpg
                      </div>
                    </div>
                    <br />
                    <div style={{ display: "flex" }}>
                      <div style={{ padding: 3, fontSize: "small" }}>
                        인사과 인사킹
                      </div>
                      <div style={{ width: "2%" }} />
                      <div
                        style={{
                          position: "relative",
                          width: "75%",
                          padding: 3,
                          borderRadius: 5,
                          border: "1px solid #e6e6e6"
                        }}
                      >
                        공지사항 댓글 테스트입니다.
                        <div
                          className="date"
                          style={{
                            fontSize: 12,
                            color: "lightgray",
                            textAlign: "right"
                          }}
                        >
                          2024.01.01
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: "-10px",
                            right: "-10px"
                          }}
                        >
                          <img
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAgBJREFUSEu11UuojlEUBuDnjFASUZJyG7hEKEPXiXIZYaCkDChGUsrINWODkyKGZGIgA6WUXDOSZCAkl6IkRSly963af/a/7e//zzl11uzb31rrXet91157wCjbwCjn1w9gDLZgHZZgFv7gFR7iKi7hR1uhvQDW41RK2qvR59iD6zWnNoCjTaVHhkHfbxzAiTKmBnAMh4eRPHfdh8H8oATYiCsjTB5h0clK3OvkyAHG4xmmVQA+NpVNKs5rZ+HytBF+Mb7HRw4QQp2uJA+6LuA2pqf/b7EKO1ro3ITLJUBQExTl9rVxXJo6m4Nb6Wckf4m5eIQY59zOYncJ8CarMHd+hzWp9dmJ59dYgBtN11MrXT/AshLgC8a1CPwBKxJIuCxsQG9iSov/p45muQafEULXrASYh7s9ACLXhLKDJ4jA0t43VKxG/I9VERarIii6g8mVmMepy64piknZVjh/wyLEOojkkTAs6Aod5qedVIp8Lk1YF8B2nK9U0zamy7EThyoxW3GxpCgEDhpmVAJqlyqEnFjxjcsaFy26/29dr8W1FqGHchyrIka6Q2X1PTiI40PJVvHZ24h+Mj9vW9fBa2zVfg9SJ9cv7C83aY2iHDzWxpmW2537xYTtytZIV2P9Khzb7JrN2JCEm5mezBe4n/SKpfazjdJ+ACOU4l/YqAP8BfGTXRkJ43i2AAAAAElFTkSuQmCC"
alt="Close"
style={{ width: 20, height: 20 }}
/>
                        </div>
                      </div>
                      {/* <img src="x-button-image-path.png" alt="Close" style="width: 20px; height: 20px;"/> */}
                    </div>
                    <form>
                      <label
                        className="form-label"
                        htmlFor="basic-default-message"
                      >
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAg5JREFUSEu11cvLTlEUBvDfJ7diQohMpEgp/gFEch0g90syMXDJwMTAX+CbKdcSCUXIRCRJGZAywMCAJBMUQim5FM6qvevY3s8576tv19tbe6+9nrWevZ7n9Bnk1TfI+TUBjMNiLMVsTMEvvMQj3MBNfBio0IEAZuIQFrToMABvYReel/GdADbiLIbiKy7gcqr0R0owLHW2HhswAt+wBtfqICVAUBEBQ3ARu/G+oYsJOIEViALmVZTez3fqAKPxDJNwHDtb0JNDoqDoejOeYha+x2EdYB/6q9bvYS5+dgEQoSPxsKJ0BrbiXAnwOCHPrx73Ti35kfSARxNlcdRpL/bXJWpjupaVAJ8RNI3ClxpATElJaae9iJmIN1Uh7xBv8wdFb6vKxqeDCMirmw7GJE18xNgSIGZ5Yfrd7pL/HL48TeHdShtzSoAdOJZEs6gHgNDGg6T4PThcAgzHi2qmJ2MvDnYBEmN6BlvwGtPyO5ZCC5EEVVFNWMWBdOFfWFk3WWircL2T0PLeWpxPVhFauFoZW1yqr7CGJZWoNmE1ovtXyTaC/7/GrqxwauogHi1TGQZ4BdOL4FDsyUq5+/GpTNRk13netydxReWRMOz6SaLzUpr7jjS2BciXwwC3JZdtNQNtAULZ4aynW2Vt8QY5JCgKd1yZ/rvN3/jJPJWMLj48Pa0minpK2mZM/ztxTvAbP2loGSXw8dEAAAAASUVORK5CYII=" />{" "}
                        댓글
                      </label>
                      <div className="mb-3" style={{ display: "flex" }}>
                        <textarea
                          id="basic-default-message"
                          className="form-control"
                          placeholder="내용을 입력해주세요."
                          defaultValue={""}
                        />
                        <div style={{ width: "3%" }} />
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ width: "11%" }}
                        >
                          등록하기
                        </button>
                        <div style={{ width: "1%" }} />
                      </div>
                    </form>
                  </div>
                  <br />
                </div>
              </div>
              <div
                className="pay-top-wrapper"
                style={{ width: "80%", margin: "0 auto" }}
              >
                {/* 삭제버튼입니다 */}
                <div />
                <a
                  className="btn btn btn-primary"
                  style={{ width: "10%" }}
                  href="./noticeMain.html"
                >
                  목록
                </a>
                {/* <button type="submit" class="btn btn-primary" style="width: 10%;">목록</button> */}
                <div style={{ width: "67%" }} />
                <div className="btn btn-danger" style={{ width: "10%" }}>
                  <b>삭제</b>
                </div>
                <div style={{ width: "2%" }} />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "10%" }}
                >
                  수정
                </button>
              </div>
              <div></div>
            </div>
          </div>
          {/* Content wrapper */}
        </div>
        {/* / Layout page */}
      </div>
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
    </div>
    {/* / Layout wrapper */}
    {/* Core JS */}
    {/* build:js assets/vendor/js/core.js */}
    {/* endbuild */}
    {/* Vendors JS */}
    {/* Main JS */}
    {/* Page JS */}
    {/* Place this tag in your head or just before your close body tag. */}
  </div>
</div>
</>



  )
}

export default NoticeDetail;