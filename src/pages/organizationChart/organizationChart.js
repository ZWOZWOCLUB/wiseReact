import coreCSS from "../../@core/vendor/css/core.module.css";
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css";
import organizationCSS from "../../@core/css/organizationChart.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callOrganizationCardAPI, callOrgCreateAPI } from "../../apis/OrganizationChartAPICalls";
import { callOrganizationRefListAPI } from "../../apis/OrganizationRefListAPICalls";
import { callOrganizationListAPI } from "../../apis/OrganizationListAPICalls";
// import { callOrgCreateAPI } from "../../apis/OrganizationCreateAPICalls";
import { callOrgModifyAPI } from "../../apis/OrganizationModifyAPICalls";
import { callOrgDeleteAPI } from "../../apis/OrganizationDeleteAPICalls";
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

      const dispatch = useDispatch();
      const navigate = useNavigate();

      //부서 목록 전체 데이터 불러오기
      const cardData = useSelector(state => state.organizationChartReducer);
      //상위부서 드롭다운 메뉴 데이터 불러오기
      const refData = useSelector(state => state.organizationItemReducer);
      //부서 전체 리스트 드롭다운 메뉴 데이터 불러오기
      const orgListData = useSelector(state => state.organizationListReducer)

      console.log(cardData);
      console.log(refData);
      console.log(orgListData);

      const [selectRef, setSelectRef] = useState('1');

      const refChange = (e) => {
        setSelectRef(e.target.value);
      };

      const [selectOrgList, setSelectOrgList] = useState('1');

      const orgListChange = (e) => {
        setSelectOrgList(e.target.value);
      };

      const [showCreateForm, setShowCreateForm] = useState(false); //부서생성버튼 상태값
      const [showModifyForm, setShowModifyForm] = useState(false); //부서 수정 버튼 상태값

      const [departmentName, setDepartmentName] = useState(''); //부서명 입력 상태값

      //부서명작성 핸들러 함수
      const depNameCreateChange = (e) => {
        console.log(e.target.value);
        setDepartmentName(e.target.value);
      };

      //부서 생성폼 제출 핸들러
      const submitCreateForm = (e) => {
        e.preventDefault(); //기본제출방지

        const formData = {
          refDepCode: selectRef,
          depName: departmentName,
        };

        console.log("생성시 전달되는 데이터 찍어보기", formData)

        dispatch(callOrgCreateAPI(formData));

        alert(`"${departmentName}" 부서 생성 완료!"`)
        setDepartmentName('');
        setSelectRef('1');
      }

      //부서 수정폼 제출 핸들러
      const submitModifyForm = (e) => {
        e.preventDefault();

        const formData = {
        depCode: selectOrgList,
        depName: departmentName,
        };

        dispatch(callOrgModifyAPI(formData));

        alert(`"${departmentName}" 으로 부서명 수정 완료!"`)
        setDepartmentName('');
        setSelectOrgList('1');
      }

      //부서 삭제
      const deleteDep = (depCode) => {
        if(window.confirm("이 부서를 삭제하시겠습니까?")){
          dispatch(callOrgDeleteAPI(depCode));
          alert("부서가 삭제되었습니다.");
        }
      };

      // const [organizationData, setOrganizationData] = useState([]);

      // useEffect(() => {
      //   setOrganizationData(cardData);
      // }, [cardData]);

      useEffect(()=>{
        dispatch(callOrganizationCardAPI());
      }, []);

      useEffect(()=>{
        dispatch(callOrganizationRefListAPI());
      },[]);

      useEffect(()=>{
        dispatch(callOrganizationListAPI());
      },[]);


      //부서 생성폼 열기
      const enterCreateForm = () => {
        setShowCreateForm(!showCreateForm);
      }

      //부서 수정폼 열기
      const enterModifyForm = () => {
        setShowModifyForm(!showModifyForm);
      }



      //편집버튼에 연결(부서 편집 페이지)
      const editDepartment = (depCode) => {
        navigate(`/main/organizationEdit/${depCode}`);
      }

      return(
        <>
          <div className={`${coreCSS[`text-light`]} ${coreCSS[`fw-semibold`]}`}>부서</div>

          <NavLink to="/organizationTree" className={`${coreCSS[`text-light`]} ${coreCSS[`fw-semibold`]}`}>
          트리로 이동
          </NavLink>
          

          <NavLink to="/organizationEdit" className={`${coreCSS[`text-light`]} ${coreCSS[`fw-semibold`]}`}>
          부서 편집
          </NavLink>
          <br/>

          <button className="btn btn-primary mt-2" onClick={enterCreateForm}>부서 생성</button>
          <button className="btn btn-primary mt-2" onClick={enterModifyForm}>부서 수정</button>


          {showCreateForm && (
        <div className="container-xxl flex-grow-1 container-p-y">
          <div>부서 생성</div>
          <form onSubmit={submitCreateForm}>
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="form-floating flex-fill me-2">
                    <select
                      className="form-select"
                      id="parentDepartment"
                      value={selectRef}
                      onChange={refChange}
                      required
                    >
                      {refData
                      .filter(dep=>dep.depCode !== 2) //인사팀은 하위부서 추가 없음(제외)
                      .map((dep) => (
                        <option key={dep.depCode} value={dep.depCode}>{dep.depName}</option>
                      ))}
                    </select>
                    <label htmlFor="parentDepartment">상위 부서</label>
                  </div>
                  <div className="form-floating flex-fill">
                    <input
                      type="text"
                      className="form-control"
                      id="departmentName"
                      value={departmentName}
                      onChange={depNameCreateChange}
                      placeholder="부서명"
                      required
                    />
                    <label htmlFor="departmentName">부서명</label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-2">생성하기</button>
              </div>
            </div>
          </form>
        </div>
      )}

        {showModifyForm && (
        <div className="container-xxl flex-grow-1 container-p-y">
          <div>부서 수정</div>
          <form onSubmit={submitModifyForm}>
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="form-floating flex-fill me-2">
                    <select
                      className="form-select"
                      id="parentDepartment"
                      value={selectOrgList}
                      onChange={orgListChange}
                      required
                    >
                      {orgListData
                      .filter(dep=>dep.depCode !== 2) //인사팀은 수정불가
                      .map((dep) => (
                        <option key={dep.depCode} value={dep.depCode}>{dep.depName}</option>
                      ))}
                    </select>
                    <label htmlFor="parentDepartment">수정 전 부서명</label>
                  </div>
                  <div className="form-floating flex-fill">
                    <input
                      type="text"
                      className="form-control"
                      id="departmentName"
                      value={departmentName}
                      onChange={depNameCreateChange}
                      placeholder="부서명"
                      required
                    />
                    <label htmlFor="departmentName">수정 후 부서명</label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-2">수정하기</button>
              </div>
            </div>
          </form>
        </div>
      )}


          <div className={`${coreCSS['col-md']} ${coreCSS['mb-4']} ${coreCSS['mb-md-0']}`}>
            <div className={`${coreCSS['accordion']} ${coreCSS['mt-3']}`} id="accordionExample">
              {cardData.map(({ depCode, depName, memberList }) => (
                <div key={depCode} className={`${coreCSS['card']} ${coreCSS['accordion-item']} ${coreCSS['active']}`}>
                  <h2 className={`${organizationCSS['accordion-header']}`} id={`heading${depCode}`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className={`${coreCSS['accordion-button']}`}
                        data-bs-toggle="collapse"
                        data-bs-target={`#accordion${depCode}`}
                        aria-expanded="false"
                        aria-controls={`accordion${depCode}`}
                      >
                        {depName}
                      </button>
                      <div className="ms-auto me-3 mt-3">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-3"
                          onClick={() => editDepartment(depCode)}
                        >
                          편집
                        </button>
                        
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          disabled={depName === "인사팀"}
                          onClick={()=>deleteDep(depCode)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </h2>
                  <div
                    id={`accordion${depCode}`}
                    className={`${coreCSS['accordion-collapse']} ${coreCSS['collapse']} ${coreCSS[`show`]}`}
                    aria-labelledby={`heading${depCode}`}
                  >
                    <div className={`${coreCSS['accordion-body']} ${organizationCSS['profile-container']} ${organizationCSS['acc-body']}`}>
                      {
                        memberList.map(({ memCode, memName, orgPosition, email, contact }) => (
                          <div key={memCode} className={`${organizationCSS['profile-card']}`}>
                            <button
                              type="button"
                              className={`${coreCSS['btn']} ${coreCSS['rounded-pill']} ${coreCSS['btn-outline-primary']}`}
                              data-bs-toggle="modal"
                              data-bs-target="#basicModal"
                              data-name={memName}
                              data-email={email}
                              data-contact={contact}
                            >
                              {memName} {orgPosition.posName}
                            </button>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>




          
        </>
      );
    }


export default Organization;
