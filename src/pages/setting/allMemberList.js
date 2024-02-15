import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import coreCSS from '../../@core/vendor/css/core.module.css';
import payCSS from '../../@core/css/pay.module.css'
import { callSearchSettingMemberAPI } from '../../apis/SettingMemberListAPICalls';

function Setting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector((state) => state.settingReducer);
  const memberList = member.data?.content;
  console.log('memberList', memberList);
  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(1);
  const [search, setSearch] = useState('');
  const pageInfo = member.pageInfo || {};
  const [searchMember, setSearchMember] = useState([]);
  const firstDayOfMonth = new Date().toISOString().slice(0, 7);
  const [currentYearMonth, setCurrentYearMonth] = useState(firstDayOfMonth);
  const resultList = useSelector((state) => state.settingReducer);

  console.log('pageInfo', pageInfo);
  console.log('pageInfo.pageEnd', pageInfo.pageEnd);


  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(() => {
    console.log(currentPage);
    setStart((currentPage - 1) * 5);
    dispatch(
      callSearchSettingMemberAPI({
        currentPage: currentPage,
      })
    );
  }, [currentPage]
  );

  const onClickMemberInsert = () => {
    console.log(onClickMemberInsert);
    navigate("/main/memberAdd", { replace: true })

  }

  const onClickAttendance = () => {
    console.log(onClickAttendance);
    navigate("/main/settingAttendance", { replace: true })
  }


  const onSearchChangeHandler = (e) => {
    console.log('~~~~~~~~~~~~', e.target.value);
    setSearch(e.target.value);
  }

  const onEnterKeyHandler = (e) => {
    if (e.key === 'Enter') {

    console.log('Enter key', search);
    const searchResult = memberList.filter(member => member.memName.includes(search));
    setSearchMember(searchResult);
    console.log(searchMember);
    }
  }

  const onClickMemberDetail = (memCode) => {
    return () => {
      console.log(memCode,'클릭');
      navigate(`/main/memberAdd?memCode=${memCode}`, { replace: true });
    }
  }
  



  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4 className={`${coreCSS['fw-bold']} ${coreCSS['py-3']} ${coreCSS['mb-4']}`} style={{ flex: 5 }}>
          <span className={`${coreCSS['text-muted']} ${coreCSS['fw-light']}`}>설정 &gt;</span> 전체직원조회
        </h4>
        <ul className="nav nav-pills flex-column flex-md-row mb-3" style={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
          <li className={`nav-item`} style={{ cursor: "pointer" }}>
            <li className={`nav-link active`} onClick={onClickMemberInsert}>직원 등록</li>
          </li>
          <li className={`nav-item`} style={{ cursor: "pointer" }}>
            <li className={`nav-link active`} onClick={onClickAttendance}>근태 조회</li>
          </li>
        </ul>
      </div>
      <div className={`${coreCSS['col-xxl']}`}>
        <div className={`${coreCSS['card']} ${coreCSS['mb-4']}`}>
          <table className={`${coreCSS['table']} ${coreCSS['table-hover']}`}>
            <thead>
              <tr style={{ backgroundColor: "#DCDCFF" }}>
                <th>No.</th>
                <th>사번</th>
                <th>성명</th>
                <th>부서</th>
                <th>직책</th>
                <th>입사일</th>
                <th>퇴사일</th>
                <th>연락처</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(searchMember) && searchMember.length > 0 ? (
                searchMember.map((s, index) => (
                  <tr key={index} onDoubleClick={onClickMemberDetail(s.memCode)}>
                    <td>{index + 1}</td>
                    <td>{s.memCode}</td>
                    <td>{s.memName}</td>
                    <td>{s.departmentDTO ? s.departmentDTO.depName : '-'}</td>
                    <td>{s.positionDTO ? s.positionDTO.posName : '-'}</td>
                    <td>{s.memHireDate}</td>
                    <td>{s.memEndDate ? s.memEndDate : '-'}</td>
                    <td>{s.memPhone}</td>
                  </tr>
                ))
              ) :
                Array.isArray(memberList) && memberList.map((m, index) => (
                  <tr key={index} onDoubleClick={onClickMemberDetail(m.memCode)}>
                    <td>{index + 1}</td>
                    <td>{m.memCode}</td>
                    <td>{m.memName}</td>
                    <td>{m.departmentDTO ? m.departmentDTO.depName : '-'}</td>
                    <td>{m.positionDTO ? m.positionDTO.posName : '-'}</td>
                    <td>{m.memHireDate}</td>
                    <td>{m.memEndDate ? m.memEndDate : '-'}</td>
                    <td>{m.memPhone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className={`${payCSS['input-group2']}`}>
            <span className={`${payCSS['input-group-text2']}`} id="basic-addon11">
              이름
            </span>
            <input
              type="text"
              className={`${payCSS['form-control2']}`}
              value={search}
              onKeyUp={onEnterKeyHandler}
              onChange={onSearchChangeHandler}
            />
            <span className={`${coreCSS['input-group-text']}`} id="basic-addon-search31"
              onClick={onEnterKeyHandler}>
              <i className="bx bx-search" />
            </span>
          </div>
          <nav aria-label="Page navigation">
            <ul
              className={`${coreCSS['pagination']} ${coreCSS['justify-content-center']}`}
              style={{ paddingTop: 20 }}
            >
              {Array.isArray(memberList) && (
                <li className={`${coreCSS['page-item']} ${coreCSS['first']}`}
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}>
                  <li className={`${coreCSS['page-link']}`} >
                    <i className="tf-icon bx bx-chevrons-left" />
                  </li>
                </li>)}
              <li className={`${coreCSS['page-item']} ${coreCSS['prev']}`}
                onClick={() => (currentPage === 1 || currentPage === 0) ? undefined : setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1 || currentPage === 0}>
                <li className={`${coreCSS['page-link']}`}>
                  <i className="tf-icon bx bx-chevron-left" />
                </li>
              </li>
              {pageNumber.map((num) => (
                <li key={num} className={currentPage === num ? `${coreCSS['page-item']} ${coreCSS['active']}` : `${coreCSS['page-item']}`}
                  onClick={() => setCurrentPage(num)}>
                  <li className={`${coreCSS['page-link']}`} >
                    {num}
                  </li>
                </li>
              ))}


              <li className={`${coreCSS['page-item']} ${coreCSS['next']}`}

                disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}
                onClick={() => (currentPage === pageInfo.pageEnd || currentPage === 0) ? undefined : setCurrentPage(currentPage + 1)}>

                <li className={`${coreCSS['page-link']}`} >
                  <i className="tf-icon bx bx-chevron-right" />
                </li>
              </li>
              {Array.isArray(memberList) && (
                <li className={`${coreCSS['page-item']} ${coreCSS['last']}`}
                  onClick={() => setCurrentPage(pageInfo.pageEnd)}
                  disabled={pageInfo.total === 0}>
                  <li className={`${coreCSS['page-link']}`} >
                    <i className="tf-icon bx bx-chevrons-right" />
                  </li>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

    </>
  );
}

export default Setting;
