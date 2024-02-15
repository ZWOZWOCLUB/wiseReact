import coreCSS from "../../@core/vendor/css/core.module.css";
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css";
import organizationCSS from "../../@core/css/organizationChart.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callOrganizationMemberAPI } from "../../apis/OrganizationMemberAPICalls";
import { callOrganizationEditAPI } from "../../apis/OrganizationEditAPICalls";

//부서편집

function OrganizationEdit(){

  const dispatch = useDispatch();
  const orgMember = useSelector(state=>state.organizationMemberReducer);
  const orgMemberList = orgMember.data?.content;
  console.log("orgMemberList", orgMemberList);

  const listData = useSelector(state => state.organizationChartReducer);
  console.log("listData", listData);

  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(1);
  const pageInfo = orgMember.pageInfo || {};

  console.log('pageInfo', pageInfo);
  console.log('pageInfo.pageEnd', pageInfo.pageEnd);

  const pageNumber = [];
  if(pageInfo){
    for (let i = 1; i<= pageInfo.pageEnd; i++){
      pageNumber.push(i);
    }
  }

  useEffect(()=>{
    dispatch(callOrganizationEditAPI());
  },[]);

  useEffect(() => {
    console.log(currentPage);
    setStart((currentPage - 1) * 5);
    dispatch(
      callOrganizationMemberAPI({
        currentPage: currentPage,
      })
    );
  }, [currentPage]
  );


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
          { Array.isArray(orgMemberList)&&(
            orgMemberList.map((member, index)=>(
              <tr key={index}>
                <td>{member.memCode}</td>
                <td>{member.memName}</td>
                <td>{member.orgPosition?.posName || '직급없음'}</td>
                <td>
                  <span className="badge bg-label-primary me-1">{member.orgDepartment?.depName || '부서없음'} </span>
                </td>
                <td>
                <button type="button" className="btn btn-warning">
                  추가
                </button>
              </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
    {/* Basic Pagination */}
    <nav aria-label="Page navigation">
            <ul
              className={`${coreCSS["pagination"]} ${coreCSS["justify-content-center"]}`}
              style={{ paddingTop: 20 }}
            >
              {Array.isArray(orgMember) && (
                <li
                  className={`${coreCSS["page-item"]} ${coreCSS["first"]}`}
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <li className={`${coreCSS["page-link"]}`}>
                    <i className="tf-icon bx bx-chevrons-left" />
                  </li>
                </li>
              )}
              <li
                className={`${coreCSS["page-item"]} ${coreCSS["prev"]}`}
                onClick={() =>
                  currentPage === 1 || currentPage === 0
                    ? undefined
                    : setCurrentPage(currentPage - 1)
                }
                disabled={currentPage === 1 || currentPage === 0}
              >
                <li className={`${coreCSS["page-link"]}`}>
                  <i className="tf-icon bx bx-chevron-left" />
                </li>
              </li>
              {pageNumber.map((num) => (
                <li
                  key={num}
                  className={
                    currentPage === num
                      ? `${coreCSS["page-item"]} ${coreCSS["active"]}`
                      : `${coreCSS["page-item"]}`
                  }
                  onClick={() => setCurrentPage(num)}
                >
                  <li className={`${coreCSS["page-link"]}`}>{num}</li>
                </li>
              ))}

              <li
                className={`${coreCSS["page-item"]} ${coreCSS["next"]}`}
                disabled={
                  currentPage === pageInfo.pageEnd || pageInfo.total === 0
                }
                onClick={() =>
                  currentPage === pageInfo.pageEnd || currentPage === 0
                    ? undefined
                    : setCurrentPage(currentPage + 1)
                }
              >
                <li className={`${coreCSS["page-link"]}`}>
                  <i className="tf-icon bx bx-chevron-right" />
                </li>
              </li>
              {Array.isArray(orgMember) && (
                <li
                  className={`${coreCSS["page-item"]} ${coreCSS["last"]}`}
                  onClick={() => setCurrentPage(pageInfo.pageEnd)}
                  disabled={pageInfo.total === 0}
                >
                  <li className={`${coreCSS["page-link"]}`}>
                    <i className="tf-icon bx bx-chevrons-right" />
                  </li>
                </li>
              )}
            </ul>
          </nav>
    {/*/ Basic Pagination */}
  {/* /사원 조회 테이블 */}

</div>

        </>
    )
}

export default OrganizationEdit;