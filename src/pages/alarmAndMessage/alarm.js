import './alarm.css';
import './core.css'
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
<script async defer src="https://buttons.github.io/buttons.js"></script>

function Alarm(){




    return (
        <>

 {/* 파비콘 */}
 <link rel="icon" type="image/x-icon" href="../../assets/img/favicon/favicon.ico" />

{/* Fonts */}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link
  href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
  rel="stylesheet"
/>

{/* Icons */}
<link rel="stylesheet" href="../../assets/vendor/fonts/boxicons.css" />

{/* Core CSS */}
<link rel="stylesheet" href="../../assets/vendor/css/core.css" className="template-customizer-core-css" />
<link rel="stylesheet" href="../../assets/vendor/css/theme-default.css" className="template-customizer-theme-css" />
<link rel="stylesheet" href="../../assets/css/demo.css" />

{/* Vendors CSS */}
<link rel="stylesheet" href="../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />


<div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">UI elements /</span> 알림함</h4>
              <div className="card mb-4">
                <h5 className="card-header">Placements</h5>
                <div className="card-body">
                  <div className="row gy-3">
                    <div className="col-lg-3 col-md-6">
                      <small className="text-light fw-semibold mb-3">End</small>
                      <div className="mt-3">
                        <button
                          className="btn btn-primary"
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasEnd"
                          aria-controls="offcanvasEnd"
                        >
                          Toggle End
                        </button>
                        <div
                          className="offcanvas offcanvas-end"
                          tabIndex="-1"
                          id="offcanvasEnd"
                          aria-labelledby="offcanvasEndLabel"
                        >
                          <div className="offcanvas-header">
                            <h5 id="offcanvasEndLabel" className="offcanvas-title">알림함</h5>
                            <button
                              type="button"
                              className="btn-close text-reset"
                              data-bs-dismiss="offcanvas"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="offcanvas-body my-auto mx-0 flex-grow-0">
                            <div className="btn btn-outline-secondary d-grid w-100">홍길동님의 연차 결재 서류에 참고인으로 설정되었습니다.</div>
                            <div className="btn btn-outline-secondary d-grid w-100">스케줄 변경 서류가 승인되었습니다.</div>
                            <div className="btn btn-outline-secondary d-grid w-100">새로운 스케줄이 등록되었습니다.</div>
                            <div className="btn btn-outline-secondary d-grid w-100">코뿔소님의 출퇴근 정정 결재에 결재자로 등록되었습니다.</div>
                            <div className="btn btn-outline-secondary d-grid w-100">스케줄 변경 서류가 반려되었습니다.</div>
                          </div>
                        </div>
                      </div>
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
    )
}
export default Alarm;