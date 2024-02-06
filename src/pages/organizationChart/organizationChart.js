import coreCSS from "../../@core/vendor/css/core.module.css";
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css";
import organizationCSS from "../../@core/css/organizationChart.module.css";

  // <div className="container-xxl flex-grow-1 container-p-y">
    {/* Modal */}
    // <div
    //   className="modal fade"
    //   id="basicModal"
    //   tabIndex={-1}
    //   aria-hidden="true"
    // >
    //   <div className="modal-dialog" role="document">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title" id="exampleModalLabel1">
    //           상세보기
    //         </h5>
    //         <button
    //           type="button"
    //           className="btn-close"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //         />
    //       </div>
    //       <div className="modal-body">
    //         <div className="row">
    //           <div className="col mb-3">
    //             <label htmlFor="nameBasic" className="form-label">
    //               사원 이름
    //             </label>
    //             <span
    //               id="nameBasic"
    //               className="form-control-plaintext"
    //               style={{ fontWeight: "bold" }}
    //             />
    //           </div>
    //         </div>
    //         <div className="row g-2">
    //           <div className="col mb-0">
    //             <label htmlFor="emailBasic" className="form-label">
    //               사원 이메일
    //             </label>
    //             <span
    //               id="emailBasic"
    //               className="form-control-plaintext"
    //               style={{ fontWeight: "bold" }}
    //             />
    //           </div>
    //           <div className="col mb-0">
    //             <label htmlFor="dobBasic" className="form-label">
    //               연락처
    //             </label>
    //             <span
    //               id="dobBasic"
    //               className="form-control-plaintext"
    //               style={{ fontWeight: "bold" }}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="modal-footer">
    //         <button
    //           type="button"
    //           className="btn btn-outline-secondary"
    //           data-bs-dismiss="modal"
    //         >
    //           닫기
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    function Organization(){
      return(
    <>
    {/* <div className={`${coreCSS[`text-light`]} ${coreCSS[`fw-semibold`]}`}>부서</div> */}
    <div>부서페이지</div>
    </>
      );
  }
    <div className="col-md mb-4 mb-md-0">
      <small className="text-light fw-semibold">Basic Accordion</small>
      <div className="accordion mt-3" id="accordionExample">
        <div className="card accordion-item active">
          <h2 className="accordion-header" id="headingOne">
            <button
              type="button"
              className="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#accordionOne"
              aria-expanded="true"
              aria-controls="accordionOne"
            >
              인사팀
            </button>
          </h2>
          <div
            id="accordionOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body profile-container">
              <div className="profile-card">
                <button
                  type="button"
                  className="btn rounded-pill btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#basicModal"
                  data-name="홍진경"
                  data-email="hong@gamil.com"
                  data-contact="010-1111-1111"
                >
                  홍진경 과장
                </button>
              </div>
              <div className="profile-card">
                <button
                  type="button"
                  className="btn rounded-pill btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#basicModal"
                  data-name="유재석"
                  data-email="yoo@gamil.com"
                  data-contact="010-2222-2222"
                >
                  유재석 전문의
                </button>
              </div>
              <div className="profile-card">
                <button
                  type="button"
                  className="btn rounded-pill btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#basicModal"
                  data-name="전현무"
                  data-email="jeon@gamil.com"
                  data-contact="010-3333-3333"
                >
                  전현무 교수
                </button>
              </div>
              <div className="profile-card">
                <button
                  type="button"
                  className="btn rounded-pill btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#basicModal"
                  data-name="이장우"
                  data-email="jang@gamil.com"
                  data-contact="010-4444-4444"
                >
                  이장우 부교수
                </button>
              </div>
              <div className="profile-card">
                <button
                  type="button"
                  className="btn rounded-pill btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#basicModal"
                  data-name="박나래"
                  data-email="park@gamil.com"
                  data-contact="010-5555-5555"
                >
                  박나래 인턴
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  // </div>

export default Organization;
