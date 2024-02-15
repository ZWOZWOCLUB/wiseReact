import coreCSS from "../../@core/vendor/css/core.module.css";
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css";
import organizationCSS from "../../@core/css/organizationChart.module.css";
import { NavLink } from "react-router-dom";

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
          <div className={`${coreCSS[`text-light`]} ${coreCSS[`fw-semibold`]}`}>부서</div>

          <NavLink to="/main/organizationTree" className={`${coreCSS[`text-light`]} ${coreCSS[`fw-semibold`]}`}>
          트리로 이동
          </NavLink>
          <div className={`${coreCSS[`col-md`]} ${coreCSS[`mb-4`]} ${coreCSS[`mb-md-0`]}`}>
            <div className={`${coreCSS[`accordion`]} ${coreCSS[`mt-3`]}`} id="accordionExample">
              <div className={`${coreCSS[`card`]} ${coreCSS[`accordion-item`]} ${coreCSS[`active`]}`}>
                <h2 className={`${organizationCSS[`accordion-header`]}`} id="headingOne">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <button
                        type="button"
                        className={`${coreCSS[`accordion-button`]}`}
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionOne"
                        aria-expanded="true"
                        aria-controls="accordionOne"
                      >
                        인사팀
                      </button>
                    </div>
                    <div className="ms-auto me-3 mt-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary me-3"
                        // onClick={() => handleEditButtonClick("인사팀")}
                      >
                        편집
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        // onClick={() => handleDeleteButtonClick("인사팀")}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </h2>
                <div
                  id="accordionOne"
                  className={`${coreCSS[`accordion-collapse`]} ${coreCSS[`collapse`]} ${coreCSS[`show`]}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className={`${coreCSS[`accordion-body`]} ${organizationCSS[`profile-container`]}`}>
                    <div className={`${organizationCSS[`profile-card`]}`}>
                      <button
                        type="button"
                        className={`${coreCSS[`btn`]} ${coreCSS[`rounded-pill`]} ${coreCSS[`btn-outline-primary`]}`}
                        data-bs-toggle="modal"
                        data-bs-target="#basicModal"
                        data-name="홍진경"
                        data-email="hong@gamil.com"
                        data-contact="010-1111-1111"
                      >
                        홍진경 과장
                      </button>
                    </div>
                    <div className={`${coreCSS[`profile-card`]}`}>
                      <button
                        type="button"
                        className={`${coreCSS[`btn`]} ${coreCSS[`rounded-pill`]} ${coreCSS[`btn-outline-primary`]}`}
                        data-bs-toggle="modal"
                        data-bs-target="#basicModal"
                        data-name="유재석"
                        data-email="yoo@gamil.com"
                        data-contact="010-2222-2222"
                      >
                        유재석 전문의
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    


export default Organization;
