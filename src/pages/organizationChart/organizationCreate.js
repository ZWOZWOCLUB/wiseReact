import coreCSS from "../../@core/vendor/css/core.module.css";
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css";
import organizationCSS from "../../@core/css/organizationChart.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callOrganizationCardAPI } from "../../apis/OrganizationChartAPICalls";

//부서생성

function OrganizationCreate(){

    return(

        
        <>

<div className={`${coreCSS[`text-light`]} ${coreCSS[`fw-semibold`]}`}>부서</div>

        <div className="container-xxl flex-grow-1 container-p-y">
  <div className="text-light fw-semibold">부서 생성</div>
  <form action="URL" method="post">
    <div className="card mb-4">
      <div className="card-body">
        {/*상위부서 선택 드롭다운*/}
        <div className="org-flex">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              상위 부서 선택
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="javascript:void(0);">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="javascript:void(0);">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="javascript:void(0);">
                  Something else here
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="javascript:void(0);">
                  Separated link
                </a>
              </li>
            </ul>
          </div>
          {/* 생성 버튼 */}
          <button type="submit" className="btn btn-primary ml-2">
            생성하기
          </button>
        </div>
        {/* 상위 부서명 */}
        <div className="form-floating org-dep-name">
          <input type="text" className="form-control" readOnly="" />
          <label htmlFor="floatingInput"> 상위 부서명</label>
        </div>
        {/* 부서명 */}
        <div className="form-floating org-dep-name">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder=""
          />
          <label htmlFor="floatingInput">부서명</label>
        </div>

      </div>
    </div>
  </form>

  </div>

        </>
    )
}

export default OrganizationCreate;