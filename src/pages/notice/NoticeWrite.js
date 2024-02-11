import '../../@core/vendor/css/themeDefault.css';
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import './noticeWrite.css';
import '../../assets/vendor/libs/apex-charts/apexcharts.js';
// import "../../assets/js/dashboards-analytics.js";
function NoticeWrite (){

    return(

        <>


<div className="layout-wrapper layout-content-navbar">
  <div className="layout-container">
    <div className="layout-page">
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className='fw-bold py-3 mb-4'>
                                    <span className='text-muted fw-light'>공지사항 {'>'}</span> 공지작성
                                </h4>
          {/* Basic Layout */}
          <div className="col-xxl">
            <div className="card mb-4">
              <div className="row">
                <div className="col-xl">
                  <div
                    className="pay-top-wrapper"
                    style={{ width: "60%", margin: "0 auto" }}
                  >
                    <div style={{ width: "15%", color: "#8184ff" }}>
                      <b>공지작성</b>
                    </div>
                    {/* <div style="width: 100%;"></div> */}
                    {/* <div class="btn btn-primary" style="width: 15%;"><b>공지작성</b></div> */}
                  </div>
                  <div
                    className="card-body"
                    style={{ width: "60%", margin: "0 auto" }}
                  >
                    <form>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-fullname"
                        >
                          제목<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basic-default-fullname"
                          placeholder="제목을 작성해 주세요."
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="basic-default-message"
                        >
                          내용<span style={{ color: "red" }}>*</span>
                        </label>
                        <textarea
                          id="basic-default-message"
                          className="form-control"
                          placeholder="내용을 작성해주세요."
                          style={{ height: 300 }}
                          defaultValue={""}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="formFileMultiple"
                          className="form-label"
                        >
                          파일 첨부
                        </label>
                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile02"
                          />
                          <label
                            className="input-group-text"
                            htmlFor="inputGroupFile02"
                          >
                            Upload
                          </label>
                        </div>
                      </div>
                      <label htmlFor="formFileMultiple" className="form-label">
                        알림 설정
                      </label>
                      <div className="col-md">
                        <div className="form-check form-check-inline mt-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            defaultValue="option1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            전송
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            defaultValue="option2"
                            defaultChecked=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            전송하지 않음
                          </label>
                        </div>
                      </div>
                    </form>
                    <br />
                    <hr className="m-0" />
                  </div>
                </div>
                <div className="pay-top-wrapper">
                  {/* 삭제버튼입니다 */}
                  <div style={{ width: "20%" }} />
                  <div style={{ width: "37%" }} />
                  <div
                    className="btn btn-danger"
                    style={{
                      width: "10%",
                      boxShadow: "0px 0px 10px #bbbdfc",
                      backgroundColor: "#bbbdfc",
                      borderColor: "#bbbdfc"
                    }}
                  >
                    <b>닫기</b>
                  </div>
                  <div style={{ width: "2%" }} />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "10%" }}
                  >
                    작성 완료
                  </button>
                  <div style={{ width: "20%" }} />
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
    </div>
  </div>
</div>


        </>

        
    )
}
export default NoticeWrite;