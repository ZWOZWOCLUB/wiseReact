import coreCSS from "../../@core/vendor/css/core.module.css";
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css";
import organizationCSS from "../../@core/css/organizationChart.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callOrganizationMemberAPI } from "../../apis/OrganizationMemberAPICalls";
import { callOrganizationEditAPI, callOrganizationUpdateAPI } from "../../apis/OrganizationEditAPICalls";
import { useParams } from "react-router-dom";

//부서편집

function OrganizationEdit(){

  const dispatch = useDispatch();
  const orgMember = useSelector(state=>state.organizationMemberReducer);
  const orgMemberList = orgMember.data?.content;
  console.log("orgMemberList", orgMemberList);

  const { depCode } = useParams();
  console.log("URL의 부서코드",depCode)

  const listData = useSelector(state => state.organizationEditReducer);
  console.log("listData", listData);

  const [depName, setDepName] = useState('');
  const [members, setMembers] = useState([]);

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

  //사원 추가 함수
  const addMember = (memCode, memName)=>{
    //멤버 배열에 현재 추가하려는 멤버의 코드가 이미 있는지 확인
    const isDuplicate = members.some(member => member.memCode === memCode);

    if(isDuplicate){
      alert("이미 추가된 멤버입니다.");
    }else{
    setMembers(prevMembers=>[...prevMembers, {memCode, memName}]);
    }
  };

  //사원 제거 함수
  const removeMember = (memberIndex) => {
    setMembers(prevMembers => prevMembers.filter((_, index)=>index!==memberIndex))
  }


  //페이지 이동 때 가져온 부서코드를 전달하여 부서개별조회 API 호출

  useEffect(() => {
    if (depCode) {
      console.log("API 호출 전 부서코드 잘 받아오는지 depCode:", depCode);
      dispatch(callOrganizationEditAPI(depCode));
    }
  }, [depCode, dispatch])


    //수정하기 버튼 핸들러 함수
    const updateMembersSubmit = (e) => {
      e.preventDefault();
      console.log("수정하기 버튼 클릭 확인");
      //현재 멤버 상태에서 멤버 코드들만 뽑기
      const memCodes = members.map(member => member.memCode);
      console.log("전달되는 코드들 확인", memCodes);
      
      //멤버 코드 배열과 부서 코드를 API 에 전달
      dispatch(callOrganizationUpdateAPI({depCode, memCodes}))
      .then(()=>{
        alert("부서 멤버 업데이트 성공!");
      })
      .catch((error)=>{
        console.error("부서멤버 업데이트 실패", error);
      });
    };
  

  //부서명과 멤버 목록 업데이트
  useEffect(()=>{
    if(listData){
      setDepName(listData.depName);
      setMembers(listData.memberList || []);
    }
  },[listData]);


  
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
  <form onSubmit={updateMembersSubmit}>
    <div className="card mb-4">
      <div className="card-body">
        <div className="org-flex">
          <button type="submit" className="btn btn-primary ml-2">
            수정하기
          </button>
        </div>

        {/* 부서명 */}
        <div className="form-floating org-dep-name mb-3">
          <input
            type="text"
            className="form-control"
            readOnly
            id="floatingInput"
            placeholder="부서명"
            value={depName}
          />
          <label htmlFor="floatingInput">부서명</label>
        </div>

        {/* 사원 이름 */}
        <div className="container">
          <div className="row">
            {members.map((member, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <label htmlFor={`memName-${index}`} className="form-label"></label>
                <input
                  type="text" //일단보이게하고 추후에 히든으로 변경
                  name={`memCode-${index}`}
                  value={member.memCode}
                />
                <input
                  type="text"
                  className="form-control"
                  id={`memName-${index}`}
                  placeholder="사원 이름"
                  value={member.memName}
                  readOnly
                />
                <button type="button" className="btn btn-danger btn-sm" onClick={()=> removeMember(index)}>
                  X
                </button>
              </div>
            ))}
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
                <button type="button" className="btn btn-warning" onClick={()=> addMember(member.memCode, member.memName)}>
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


          {/* <div className="col-md-3">
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
          </div> */}