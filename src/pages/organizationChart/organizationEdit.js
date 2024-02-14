import coreCSS from "../../@core/vendor/css/core.module.css";
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css";
import organizationCSS from "../../@core/css/organizationChart.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callOrganizationCardAPI } from "../../apis/OrganizationChartAPICalls";


//부서편집

function OrganizationEdit(){

    return(

        
        <>

<div className={`${coreCSS[`text-light`]} ${coreCSS[`fw-semibold`]}`}>부서</div>

        <div className="container-xxl flex-grow-1 container-p-y">
  <div className="text-light fw-semibold">부서 편집</div>
  <form action="URL" method="post">
    <div className="card mb-4">
      <div className="card-body">
        <div className="org-flex">

          {/* 생성 버튼 */}
          <button type="submit" className="btn btn-primary ml-2">
            생성하기
          </button>
        </div>

        {/* 부서명 */}
        <div className="form-floating org-dep-name">
          <input
            type="text"
            className="form-control"
            readOnly=""
            id="floatingInput"
            placeholder=""
          />
          <label htmlFor="floatingInput">부서명</label>
        </div>

        {/* 사원 이름 */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="defaultFormControlInput" className="form-label">
              이름
            </label>
            <input
              type="text"
              className="form-control"
              id="defaultFormControlInput"
              placeholder=""
              aria-describedby="defaultFormControlHelp"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="defaultFormControlInput" className="form-label">
              이름
            </label>
            <input
              type="text"
              className="form-control"
              id="defaultFormControlInput"
              placeholder=""
              aria-describedby="defaultFormControlHelp"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="defaultFormControlInput" className="form-label">
              이름
            </label>
            <input
              type="text"
              className="form-control"
              id="defaultFormControlInput"
              placeholder=""
              aria-describedby="defaultFormControlHelp"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="defaultFormControlInput" className="form-label">
              이름
            </label>
            <input
              type="text"
              className="form-control"
              id="defaultFormControlInput"
              placeholder=""
              aria-describedby="defaultFormControlHelp"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="defaultFormControlInput" className="form-label">
              이름
            </label>
            <input
              type="text"
              className="form-control"
              id="defaultFormControlInput"
              placeholder=""
              aria-describedby="defaultFormControlHelp"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
  {/* 사원 조회 테이블 */}
  <div className="card">
    <div className="card-body">
      <form
        className="d-flex justify-content-center"
        onsubmit="return false"
        style={{ marginBottom: 20 }}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="사원 검색"
          aria-label="Search"
          style={{ width: "50%" }}
        />
        <button className="btn btn-outline-primary" type="submit">
          검색
        </button>
      </form>
      <div className="table-responsive text-nowrap">
        <table className="table table-bordered">
          <thead id="org-tb-head">
            <tr>
              <th>사원 번호</th>
              <th>사원 이름</th>
              <th>직급</th>
              <th>부서명</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>202300123123</td>
              <td>전현무</td>
              <td>전공의</td>
              <td>
                <span className="badge bg-label-primary me-1">부서없음</span>
              </td>
              <td>
                <button type="button" className="btn btn-warning">
                  추가
                </button>
              </td>
            </tr>
            <tr>
              <td>202300453124</td>
              <td>유재석</td>
              <td>교수</td>
              <td>
                <span className="badge bg-label-success me-1">흉부외과1팀</span>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning org-btn-diabled"
                >
                  추가
                </button>
                {/*이미 부서가 있는 경우, 버튼 비활성화 : 이부분은 추가버튼 다 활성화해놓고 누르면 업데이트되는 방식으로*/}
              </td>
            </tr>
            <tr>
              <td>202300787456</td>
              <td>이장우</td>
              <td>부교수</td>
              <td>
                <span className="badge bg-label-info me-1">산부인과1팀</span>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning org-btn-diabled"
                >
                  추가
                </button>
                {/*이미 부서가 있는 경우, 버튼 비활성화*/}
              </td>
            </tr>
            <tr>
              <td>202300198345</td>
              <td>박나래</td>
              <td>인턴</td>
              <td>
                <span className="badge bg-label-primary me-1">부서없음</span>
              </td>
              <td>
                <button type="button" className="btn btn-warning">
                  추가
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  {/* /사원 조회 테이블 */}
  <div className="card mb-4">
    {/* Basic Pagination */}
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className="page-item first">
          <a className="page-link" href="javascript:void(0);">
            <i className="tf-icon bx bx-chevrons-left" />
          </a>
        </li>
        <li className="page-item prev">
          <a className="page-link" href="javascript:void(0);">
            <i className="tf-icon bx bx-chevron-left" />
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="javascript:void(0);">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="javascript:void(0);">
            2
          </a>
        </li>
        <li className="page-item active">
          <a className="page-link" href="javascript:void(0);">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="javascript:void(0);">
            4
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="javascript:void(0);">
            5
          </a>
        </li>
        <li className="page-item next">
          <a className="page-link" href="javascript:void(0);">
            <i className="tf-icon bx bx-chevron-right" />
          </a>
        </li>
        <li className="page-item last">
          <a className="page-link" href="javascript:void(0);">
            <i className="tf-icon bx bx-chevrons-right" />
          </a>
        </li>
      </ul>
    </nav>
    {/*/ Basic Pagination */}
  </div>
</div>

        </>
    )
}

export default OrganizationEdit;