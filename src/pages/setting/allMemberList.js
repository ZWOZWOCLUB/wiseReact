import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import coreCSS from '../../@core/vendor/css/core.module.css';
import payCSS from '../../@core/css/pay.module.css'
import { callSearchSettingMemberAPI } from '../../apis/SettingMemberListAPICalls';
import icons from 'boxicons/css/boxicons.min.css';




function Setting(){
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

    console.log('pageInfo', pageInfo);
    console.log('pageInfo.pageEnd', pageInfo.pageEnd);


    const pageNumber = [];
    if(pageInfo){
      for (let i = 1; i<= pageInfo.pageEnd; i++){
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
    
    const onClickMemberInsert = (e) => {
    console.log(onClickMemberInsert);
    setSearch(e.target.value);
  }

    
    const onSearchChangeHandler = (e) => {
      console.log('~~~~~~~~~~~~', e.target.value);  
      setSearch(e.target.value);
    }

  const onEnterKeyHandler = (e) => {
      if (e.key === 'Enter') {
          console.log('Enter key', search);
          
          navigate(`/search?value=${search}`, { replace: false });
          
          // dispatch(callSearchProductAPI({
          //     search: search
          // }));
          window.location.reload();
      }
  }
    return(
        <>
  <h4 className={`${coreCSS['fw-bold']} ${coreCSS['py-3']} ${coreCSS['mb-4']}`}>
    <span className={`${coreCSS['text-muted']} ${coreCSS['fw-light']}`}>설정 &gt;</span> 전체직원조회 <span><button onClick={ onClickMemberInsert }>직원 등록</button></span>
  </h4>
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
        { Array.isArray(memberList) && memberList.map((m) => (
          <tr>
            <td></td>
            <td>{m.memCode}</td>
            <td>{m.memName}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{m.memHireDate}</td>
            <td>{m.memEndDate ? m.memEndDate: '-'}</td>
            <td>{m.memPhone}</td>
          </tr>
          ))}
        

        </tbody>
      </table>
      <div className={`${payCSS['input-group2']}`}>
        <span className={`${payCSS['input-group-text2']}`} id="basic-addon11">
          성명
        </span>
        <input
          type="text"
          className={`${payCSS['form-control2']}`}
          value = {search}
          onKeyUp={ onEnterKeyHandler }
          onChange={onSearchChangeHandler }
        />
        <span className={`${coreCSS['input-group-text']}`} id="basic-addon-search31">
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
           onClick={() => setCurrentPage(currentPage - 1)}
           disabled={currentPage === 1 || currentPage === 0}>           
            <li className={`${coreCSS['page-link']}`}>
              <i className="tf-icon bx bx-chevron-left" />
            </li>
          </li>
          {pageNumber.map((num) => (
          <li key={num}  className={ currentPage === num? `${coreCSS['page-item']} ${coreCSS['active']}` : `${coreCSS['page-item']}`}
            onClick={() => setCurrentPage(currentPage === num)}
          >
            <li className={`${coreCSS['page-link']}`} >
              {num}
            </li>
          </li>
          ))}
          <li className={`${coreCSS['page-item']} ${coreCSS['next']}`}
          disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}
            onClick={() => setCurrentPage(currentPage + 1)}>   
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
