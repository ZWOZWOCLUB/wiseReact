import '../../@core/vendor/css/themeDefault.css';
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import './noticeMain.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callAllViewNoticeAPI } from '../../apis/NoticeAPICalls.js';

import { useNavigate } from 'react-router-dom';
// const { useNavigate } = require('react-router-dom');


function NoticeMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const notice = useSelector((state) => state.noticeReducer);
  const noticeList = notice.data?.content;

  console.log('noticeList', noticeList)

  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(1);
  const [search, setSearch] = useState('');
  const pageInfo = notice.pageInfo || {};
  const [searchNotice, setSearchNotice] = useState([]);

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
      callAllViewNoticeAPI({
        currentPage: currentPage,
      })
    );
  }, [currentPage]
  );

  
  
  const onClickNoticeWrite = () => {

    // 공지작성
    console.log('NoticeWrite click');
    navigate(`/NoticeWrite`, { replace: false });
};


  return(
     <>
  <div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
      <div className="layout-page">
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className='fw-bold py-3 mb-4'>
                                    <span className='text-muted fw-light'>공지 {'>'}</span> 공지사항
                                </h4>
            <div className="col-xxl">
              <div className="card mb-4">
                <div className="pay-top-wrapper">
                  <div style={{ width: "10%" }} />
                  <div style={{ width: "15%", color: "#8184ff" }}>
                    <b>공지사항</b>
                  </div>
                  <div style={{ width: "100%" }} />
                  <select
                    id="defaultSelect"
                    className="form-select"
                    style={{ width: "15%" }}
                  >
                    <option value={2024}>제목</option>
                    <option value={2023}>작성자</option>
                    <option value={2022}>내용</option>
                  </select>
                  <form
                    className="d-flex"
                    onsubmit="return false"
                    style={{ width: "30%" }}
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="검색"
                      />
                      <span className="input-group-text">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAd5JREFUSEu11cvLTWEUx/HPGxnIpSiXiZAwcIuSAQpFL2XqUgxIURhQBv4AMiEhDCgk5Q+Q0VsImSAlopTIgFwi9+uz6nl1HO/e5xnssya7zn7O+j5rrd9v7R5djp4u51cHmIB1WInZ+SJ3cAkX8LzkcgMBRuAcVtck+I2L2IRPdaB2wFDcwgx8xUkcxpOcZDJ2YQuG5LOL8L0K0g44iw14hhV4UPHHWbicLjAeB7G7BDAT9/Aj9Xk+ot91sRhX8A2T8GKgw60VHMF2HMWOkgHiPNYnyF7s7wR4jCm5//cLAUvQh2vpGRX9F60VfEQMeRB+FQJGpWpf4w1GdwK8x3AMQ8BKIs5+wCuM6QS4mw01L3ngdkn2pKQFSW03c5uWdQIcSKbZgxPYVgg4kzyyMbUnBLKzE2AqHuJnoUzDYFdz0sqq2412Ktv/KZYnCT6qqGRONtrY7PatJUaLM62r4guO41B2dryPKmNVbMbgnDRmEK6PYdfKtP/lyGygVTVzeJd20b7U0rWYm12/FPH7P1G3ridml/Yids/nrK4bOIa3CB+E0WKdhwpDSeGJv9HEBycg1zEdsQ0W4mU/oQlA5AqThaKm5fmcbhoQ+cal9b4mfz8abVGtJ5tqUSWk64A/OxFWGSrrSC8AAAAASUVORK5CYII=" />
                      </span>
                    </div>
                  </form>
                  <div style={{ width: "5%" }} />
                  <a
              className="btn btn-primary"
              style={{ width: "15%", color: 'white' }} 
              onClick={onClickNoticeWrite}
                  >
                   공지작성
                  </a>
                  <div style={{ width: "7%" }} />
                </div>
                <table
                  className="table table-hover"
                  style={{ width: "90%", margin: "0 auto" }}
                >
                  
                    <tr style={{ backgroundColor: "#DCDCFF" }}>
                      <th style={{ width: "5%" }}>
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          defaultValue=""
                          aria-label="Checkbox for following text input"
                        />
                      </th>
                      <th style={{ width: "5%" }}>NO</th>
                      <th style={{ width: "25%" }}>제목</th>
                      <th style={{ width: "15%" }}>작성자</th>
                      <th style={{ width: "15%" }}>작성일</th>
                      <th style={{ width: "10%" }}>조회수</th>
                    </tr>

                    <tbody>
                    { Array.isArray(searchNotice) && searchNotice.length > 0? (
                        searchNotice.map((sn, index) => (

                        <tr key={index}>
                          <td>
                            <input
                              className="form-check-input mt-0"
                              type="checkbox"
                              defaultValue=""
                              aria-label="Checkbox for following text input"
                            />
                          </td>
                          <td>{index + 1}</td>         {/*공지 번호 */}
                          <td>{sn.notName}</td>   {/*공지 제목 */}
                          <td>{sn.notMember.memName}</td>     {/*작성자 */}
                          <td>{sn.notCreateDate}</td> {/*작성일 */}
                          <td>{sn.notView}</td>     {/*조회수 */}
                        </tr>
                        ))
    
                        ):
                    
                    Array.isArray(noticeList) && noticeList.map((not, index) => (
                        
                    <tr key={index}>
                      <td>
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          defaultValue=""
                          aria-label="Checkbox for following text input"
                        />
                      </td>
                      <td>{index + 1}</td>         {/*공지 번호 */}
                      <td>{not.notName}</td>   {/*공지 제목 */}
                      <td>{not.notMember.posCode.posName} {not.notMember.memName}</td>     {/*작성자 */}
                      <td>{not.notCreateDate}</td> {/*작성일 */}
                      <td>{not.notView}</td>     {/*조회수 */}
                    </tr>

                    ))}



                  </tbody>
                </table>
                <div className="pay-top-wrapper">
                <div style={{ width: "3%" }} />
                  {/* 삭제버튼 */}
                  <div className="btn btn-danger" style={{ width: "10%" }}>
                    <b>삭제</b>
                  </div>
                  <div style={{ width: "30%" }} />
                  {/* 페이지이동버튼 */}
                  <ul className="pagination pagination-sm">
                    {Array.isArray(noticeList) &&(

                      <li className="page-item next" onClick={()=> setCurrentPage(1)}>
                        <a className="page-link" href="javascript:void(0);">
                          <i className="tf-icon bx bx-chevrons-left">
                          </i>
                        </a>
                      </li>
                    )} 
                    {pageNumber.map((num) => (
                      <li key={num} className="page-item active"
                        onClick={()=> setCurrentPage(num)}>
                      <li className="page-link">
                        {num}
                      </li>
                    </li>
                      ))
                    }
                    <li className="page-item">
                      <a className="page-link " href="javascript:void(0);">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="javascript:void(0);">
                        3
                      </a>
                    </li>
                    <li className="page-item next">
                      <a className="page-link" href="javascript:void(0);">
                        <i className="tf-icon bx bx-chevrons-right">
                        </i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="layout-overlay layout-menu-toggle" />
  </div>
  </>
  );
  }
  
export default NoticeMain;