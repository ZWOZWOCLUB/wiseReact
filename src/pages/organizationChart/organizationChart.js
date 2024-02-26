import coreCSS from "../../@core/vendor/css/core.module.css";
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css";
import organizationCSS from "../../@core/css/organizationChart.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callOrganizationCardAPI, callOrgCreateAPI, callOrgDeleteAPI, callOrgModifyAPI, callUpdateRoleAPI } from "../../apis/OrganizationChartAPICalls";
import { callOrganizationRefListAPI } from "../../apis/OrganizationRefListAPICalls";
import { callOrganizationListAPI } from "../../apis/OrganizationListAPICalls";
// import { callOrgCreateAPI } from "../../apis/OrganizationCreateAPICalls";
// import { callOrgModifyAPI } from "../../apis/OrganizationModifyAPICalls";
// import { callOrgDeleteAPI } from "../../apis/OrganizationDeleteAPICalls";
import { decodeJwt } from "../../utils/tokenUtils.js";
import { callMemberDetailAPI } from "../../apis/MyPageAPICalls.js";


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
        depCode: selectedDep,
        depName: departmentName,
        refDepCode: selectedRefDep || null,
        };

        dispatch(callOrgModifyAPI(formData));

        alert(`"${departmentName}" 으로 부서명 수정 완료!"`)
        setDepartmentName('');
        setSelectOrgList('');
        setSelectedRefDep('');
      }

      //부서 삭제
      const deleteDep = (depCode) => {

        const checkSubDep = orgListData.some(dep => dep.refDepCode === depCode);

        if(checkSubDep){
          alert("이 부서를 삭제하기 전에, 모든 하위 부서를 먼저 삭제해야 합니다");
        }else if(window.confirm("이 부서를 삭제하시겠습니까?")){
          dispatch(callOrgDeleteAPI(depCode));
          alert("부서가 삭제되었습니다.");
        }
        // if(window.confirm("이 부서를 삭제하시겠습니까?")){
        //   dispatch(callOrgDeleteAPI(depCode));
        //   alert("부서가 삭제되었습니다.");
        // }
      };

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

        if(showModifyForm){
          setShowModifyForm(false);
        }
      }

      //부서 수정폼 열기
      const enterModifyForm = () => {
        setShowModifyForm(!showModifyForm);

        if(showCreateForm){
          setShowCreateForm(false);
        }
      }

      //편집버튼에 연결(부서 편집 페이지)
      const goEditDepartmentPage = (depCode) => {
        navigate(`/main/organizationEdit/${depCode}`);
      }

      const [showMembers, setShowMembers] = useState({}); // 각 부서별 멤버 목록 표시 상태 관리

      // 부서명 클릭 시 멤버 목록 표시
      const membersDisplay = (depCode) => {
        setShowMembers(prevState => ({
          ...prevState,
          [depCode]: !prevState[depCode] // 현재 상태를 반전시킴
        }));
      };

      //모달
      const [selectedMember, setSelectedMember] = useState(null);
      const [showModal, setShowModal] = useState(false);
    
      const modalMemberClick = (member) => {
        setSelectedMember(member);
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };

      const [selectedDep, setSelectedDep] = useState(''); // 현재 선택된 부서 코드
      const [selectedRefDep, setSelectedRefDep] = useState(''); // 현재 선택된 부서의 상위부서 코드
      const [refSelectorDisable, setRefSelectorDisable] = useState(false); //상위부서 변경 비활성화하기 상태값

      // 초기 렌더링 시 상위부서 선택 드롭다운 비활성화
      useEffect(() => {
        setRefSelectorDisable(true);
      }, []);

      // 선택한 부서의 상위부서 표시
      const modifyDepChange = (e) => {
        const deptCode = e.target.value;
        setSelectedDep(deptCode);

        console.log("deptCode의 타입 찍어보기=============>",typeof(deptCode));

        const deptInfo = orgListData.find(dep => dep.depCode.toString() === deptCode);
        if (deptInfo) {
          if (deptInfo.refDepCode !== null) {
            setSelectedRefDep(deptInfo.refDepCode.toString());
            setRefSelectorDisable(deptInfo.refDepCode === 1); //상위부서코드 1인 경우 드롭다운 선택 비활성화 상태값으로 설정
          } else {
            setSelectedRefDep('null');
          }
        } else {
          setSelectedRefDep('null');
        }
      };

      // 상위부서 변경
      const modifyRefDepChange = (e) => {
        setSelectedRefDep(e.target.value);
      };


    //   const [currentTeamLeader, setCurrentTeamLeader] = useState('');

    //   const teamLeaderChange = (memCode, depCode) => {
    //     const isConfirmed = window.confirm("이 사원을 관리자로 지정하시겠습니까?");
        
    //     if (isConfirmed) {
    //         dispatch(callUpdateRoleAPI({ memCode, depCode }))
    //             .then(() => {
    //                 alert("관리자로 지정되었습니다.");
    //                 setCurrentTeamLeader(memCode); // 관리자 지정한 사람 체크
    //             })
    //             .catch(error => {
    //                 console.error("관리자 지정 실패:", error);
    //             });
    //     }
    // };

    //멤버 권한 변경
    const [memberRoles, setMemberRoles] = useState({});

    const roleChange = (memCode, memRole) => {
      if(window.confirm(`이 멤버의 권한을 ${memRole}로 변경하시겠습니까?`)){
        setMemberRoles(prev => ({...prev, [memCode]: memRole}));

        dispatch(callUpdateRoleAPI({memCode, memRole}));

        alert(`멤버의 권한이 ${memRole}로 변경되었습니다.`);

      }
    }

    //멤버권한정보 가져오기

    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    
    const memberDetail = useSelector(state => state.mypageReducer);
    console.log("memberDetail",memberDetail);

    //권한 검사
    
    const isSuperAdmin = token?. memRole === 'SUPERADMIN';

    console.log("isSuperAdmin", isSuperAdmin)
    

    // useEffect(()=>{

    //   console.log("헤더 토큰 검사---->", token);
    //   console.log("헤더 토큰 token.memCode--->", token.memCode);

    //   if(token !== null){
    //     dispatch(
    //       callMemberDetailAPI({
    //         memCode: token.memCode,
    //       })
    //     )
    //   }
    // }, []);

      return(
        <>


      {/*모달*/}
      {showModal && (
        <div className="modal fade show d-block" aria-modal="true" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel1" style={{ fontWeight: "bold" }}>사원 정보</h4>
                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button> */}
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nameBasic" className="form-label">사원 번호</label>
                  <span id="nameBasic" className="form-control-plaintext" style={{ fontWeight: "bold" }}>{selectedMember?.memCode}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="nameBasic" className="form-label">사원 이름</label>
                  <span id="nameBasic" className="form-control-plaintext" style={{ fontWeight: "bold" }}>{selectedMember?.memName}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="emailBasic" className="form-label">이메일</label>
                  <span id="emailBasic" className="form-control-plaintext" style={{ fontWeight: "bold" }}>{selectedMember?.memEmail}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="contactBasic" className="form-label">연락처</label>
                  <span id="contactBasic" className="form-control-plaintext" style={{ fontWeight: "bold" }}>{selectedMember?.memPhone}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="contactBasic" className="form-label">권한</label>
                  <span id="contactBasic" className="form-control-plaintext" style={{ fontWeight: "bold" }}>{selectedMember?.memRole}</span>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>닫기</button>
              </div>
            </div>
          </div>
        </div>
        )}
          {/* <div className={`${coreCSS[`text-light`]} ${coreCSS[`fw-semibold`]}`}>부서</div> */}
          <h4 className='fw-bold py-3 mb-4'>
            <span className='text-muted fw-light'>부서 {'>'}</span> 부서 조회
          </h4>

          {isSuperAdmin &&(
          <div>
          <button className="btn btn-primary mt-2" onClick={enterCreateForm}>부서 생성</button>
          <button className="btn btn-primary mt-2" style={{ marginLeft: '20px' }} onClick={enterModifyForm}>부서 수정</button>
          </div>
          )}

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
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id="refDepartment"
                        value={selectedRefDep || 'null'}
                        onChange={modifyRefDepChange}
                        required
                        disabled={refSelectorDisable} //조건부로 드롭다운 비활성화
                      >
                      {/* <option value="null">상위 부서 없음</option> */}
                      {refData
                      .filter(dep=>dep.depCode !== 2) //인사팀 제외처리
                      .map((dep) => (
                        <option key={dep.depCode} value={dep.depCode}>{dep.depName}</option>
                      ))}
                      </select>
                      <label htmlFor="refDepartment">상위부서</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id="parentDepartment"
                        value={selectedDep}
                        onChange={modifyDepChange}
                        required
                      >
                        {orgListData
                        .filter(dep=>dep.depCode !== 2 && dep.depCode !== 1) //인사팀과 최상위부서는 일단 제외처리
                        .map((dep) => (
                          <option key={dep.depCode} value={dep.depCode}>{dep.depName}</option>
                        ))}
                      </select>
                      <label htmlFor="parentDepartment">수정 전 부서명</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="departmentName"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        placeholder="부서명"
                        required
                      />
                      <label htmlFor="departmentName">수정 후 부서명</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">수정하기</button>
              </div>
            </div>
            </form>
          </div>

      )}

      <div className={`${coreCSS['col-md']} ${coreCSS['mb-4']} ${coreCSS['mb-md-0']}`}>
      {Array.isArray(cardData) && cardData.map(({ depCode, depName, memberList, refDepCode }) => (
          <div key={depCode} className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
            <h5 
              style={{ cursor: (refDepCode === 1 && depName !== "인사팀") ? "default" : "pointer" }} 
              onClick={() => {
                if (refDepCode !== 1 || depName === "인사팀") {
                  membersDisplay(depCode);
                }
              }}
            >
              {depName} 
              <span style={{ fontSize: 'small' }}>({orgListData.find(dep => dep.depCode === refDepCode)?.depName || '상위 부서 없음'})
              </span>
              </h5>
              {isSuperAdmin &&(

                <div className="ms-auto me-3 mt-3">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    hidden={refDepCode === 1 && depName !== "인사팀"}
                    onClick={() => goEditDepartmentPage(depCode)}
                  >
                    편집
                  </button>
                  
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger ms-3"
                    hidden={depName === "인사팀"}
                    onClick={()=>deleteDep(depCode)}
                  >
                    삭제
                  </button>
                </div>
              )}
              </div>
            {showMembers[depCode] && (
              <div className="card-body">
                <div className={`${organizationCSS['member-grid']}`}>
                {Array.isArray(memberList) && memberList.map(member => (
                  <div key={member.memCode} className={`${organizationCSS['member-item']}`}>
                    {/* <input
                    type="radio"
                    name="teamLeader"
                    value={member.memCode}
                    checked={currentTeamLeader === member.memCode}
                    onChange={() => teamLeaderChange(member.memCode, depCode)}
                    /> */}
                {isSuperAdmin &&(
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" style={{ marginBottom: '0' }}>
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                        <span className="dropdown-item" onClick={()=> roleChange(member.memCode, 'USER')}
                          ><i className="bx bx-user-check me-1"></i> USER</span
                        >
                        <span className="dropdown-item" onClick={()=> roleChange(member.memCode, 'ADMIN')}
                          ><i className="bx bx-user-plus me-1"></i> ADMIN</span
                        >
                        {/* depCode가 2인 경우(인사팀)에만 SUPERADMIN 옵션 표시 */}
                        {depCode === 2 && (
                        <span className="dropdown-item" onClick={()=> roleChange(member.memCode, 'SUPERADMIN')}
                          ><i className="bx bx-crown me-1"></i> SUPERADMIN</span
                        >
                        )}
                      </div>
                    </div>
                )}

                    <span style={{ cursor: "pointer" }} onClick={() => modalMemberClick(member)}>
                    {/* <button
                    type="button"
                    className="btn btn-outline-primary rounded-pill"
                    data-bs-toggle="modal"
                    data-bs-target="#basicModal"
                    data-name={memName}
                    data-email={email}
                    data-contact={contact}
                  > */}
                      {member.memName} {member.orgPosition?.posName ?? "팀원"}
                    </span>
                  {/* </button> */}
                </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>





          
        </>
      );
    }


export default Organization;
