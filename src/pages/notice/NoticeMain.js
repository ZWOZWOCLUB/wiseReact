import '../../@core/vendor/css/themeDefault.css';
import '../../assets/vendor/libs/jquery/jquery.js';
import '../../assets/vendor/libs/popper/popper.js';
import '../../assets/vendor/js/bootstrap.js';
import '../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js';
import '../../assets/vendor/js/menu.js';
import '../../assets/js/config.js';
import './noticeMain.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callAllViewNoticeAPI } from '../../apis/NoticeAPICalls.js';
import { callNoticeDeleteAPI } from '../../apis/NoticeAPICalls.js';

import { useNavigate } from 'react-router-dom';
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
function NoticeMain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notice = useSelector((state) => state.noticeReducer);
    const noticeList = notice.data?.content;
    
    console.log('noticeList', noticeList);
    
    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);
    const pageInfo = notice.pageInfo || {};
    const [search, setSearch] = useState('');
    const [searchNotice, setSearchNotice] = useState([]);
    const [selectedNotices, setSelectedNotices] = useState([]);

    console.log('notice', notice);
    console.log('noticeList', noticeList);
    
    console.log('pageInfo', pageInfo);
    console.log('pageInfo.pageEnd', pageInfo.pageEnd);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        console.log('currentPage', currentPage);
        setStart((currentPage - 1) * 5);
        setSearch('');
        dispatch(
            callAllViewNoticeAPI({
                currentPage: currentPage,
            })
        );
    }, [currentPage]);

    const onClickNoticeWrite = () => {
        // 공지작성
        console.log('NoticeWrite click');
        navigate(`/main/NoticeWrite`, { replace: false });
    };

    const onSearchChangeHandler = (e) => {
        console.log('~~~~~~~~~~~~', e.target.value);
        setSearch(e.target.value);
    };

    

    // 선택한 검색 조건을 저장할 상태 (기본값은 'title'로 설정)
    const [searchType, setSearchType] = useState('title');

    const onSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const onEnterKeyHandler = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            // 엔터키 누르거나 검색 아이콘 클릭 시
            let searchResult = [];
            if (searchType === 'title') {
                // 제목으로 검색
                searchResult = noticeList.filter((notice) => notice.notName.includes(search));
            } else if (searchType === 'author') {
                // 작성자로 검색
                searchResult = noticeList.filter((notice) => notice.notMember.memName?.includes(search));
            } else if (searchType === 'content') {
                // 내용으로 검색
                searchResult = noticeList.filter((notice) => notice.notComment?.includes(search));
            }
            setSearchNotice(searchResult);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // 폼 동작 방지
        onEnterKeyHandler(e); // 검색 실행
    };

    //공지상세페이지
    const navigateToDetailPage = (notCode) => {
        navigate(`/main/notice/detail/${notCode}`);
    };

    const handleCheckboxChange = (notCode, isChecked) => {
        
        if (isChecked) {
            // 체크된 경우, 선택된 목록에 추가
             setSelectedNotices((prev) => [...prev, { notCode }]);
            console.log("체크박스 체크 ", notCode);
        } else {
            // 해제된 경우, 선택된 목록에서 제거
            setSelectedNotices((prev) => prev.filter((notice) => notice.notCode !== notCode));
            console.log("체크박스 체크해제", notCode);
        }
    };

    const onClickNotDelete = async () => {
        console.log('selectedNotices', selectedNotices);

        if (selectedNotices.length > 0) {
            // 사용자에게 삭제 확인을 요청하는 경고창 표시
            const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
            if (isConfirmed) {
                // 사용자가 '확인'을 클릭한 경우, 삭제 처리 진행
                try {
                    const noticesToDelete = selectedNotices.map((notCode) => notCode);
                    await dispatch(callNoticeDeleteAPI(noticesToDelete));
                    console.log('Deleting notices:', noticesToDelete);

                    setSelectedNotices([]); // 삭제 후 선택된 공지사항 목록 초기화
                    dispatch(callAllViewNoticeAPI({ currentPage })); // 공지사항 목록 새로고침
                } catch (error) {
                    console.error('Error deleting notices:', error);
                }
            } else {
                // 사용자가 '취소'를 클릭한 경우, 삭제하지 않음
                console.log('Notice deletion cancelled by user.');
            }
        } else {
            alert('삭제할 공지사항을 선택하세요.');
        }
    };


    return (
        <>
            <div className='layout-wrapper layout-content-navbar'>
                <div className='layout-container'>
                    <div className='layout-page'>
                        <div className='content-wrapper'>
                            <div className='container-xxl flex-grow-1 container-p-y'>
                                <h4 className='fw-bold py-3 mb-4'>
                                    <span className='text-muted fw-light'>공지 {'>'}</span> 공지사항
                                </h4>
                                <div className='col-xxl'>
                                    <div className='card mb-4'>
                                        <div className='pay-top-wrapper'>
                                            <div style={{ width: '10%' }} />
                                            <div style={{ width: '15%', color: '#8184ff' }}>
                                                <b>공지사항</b>
                                            </div>
                                            <div style={{ width: '100%' }} />
                                            <select
                                                id='defaultSelect'
                                                className='form-select'
                                                style={{ width: '15%' }}
                                                onChange={onSearchTypeChange}
                                            >
                                                <option value='title'>제목</option>
                                                <option value='author'>작성자</option>
                                                <option value='content'>내용</option>
                                            </select>
                                            <form
                                                className='d-flex'
                                                onSubmit={handleFormSubmit}
                                                style={{ width: '30%' }}
                                            >
                                                <div className='input-group'>
                                                    <input
                                                        type='text'
                                                        value={search}
                                                        onChange={onSearchChangeHandler}
                                                        onKeyUp={(e) => e.key === 'Enter' && onEnterKeyHandler(e)}
                                                        className='form-control'
                                                        placeholder='검색'
                                                    />
                                                    <span className='input-group-text' onClick={onEnterKeyHandler}>
                                                        <i className='bx bx-search' />
                                                    </span>
                                                </div>
                                            </form>
                                            <div style={{ width: '5%' }} />
                                            <a
                                                className='btn btn-primary'
                                                style={{ width: '15%', color: 'white' }}
                                                onClick={onClickNoticeWrite}
                                            >
                                                공지작성
                                            </a>
                                            <div style={{ width: '7%' }} />
                                        </div>
                                        <table className='table table-hover' style={{ width: '90%', margin: '0 auto' }}>
                                            <tr style={{ backgroundColor: '#DCDCFF' }}>
                                                <th style={{ width: '5%' }}>
                                                    <input
                                                        className='form-check-input mt-0'
                                                        type='checkbox'
                                                        value=''
                                                        aria-label='Checkbox for following text input'
                                                    />
                                                </th>
                                                <th style={{ width: '5%' }}>NO</th>
                                                <th style={{ width: '25%' }}>제목</th>
                                                <th style={{ width: '15%' }}>작성자</th>
                                                <th style={{ width: '15%' }}>작성일</th>
                                                <th style={{ width: '10%' }}>조회수</th>
                                            </tr>

                                            <tbody>
                                                {Array.isArray(searchNotice) && searchNotice.length > 0
                                                    ? searchNotice.map((sn, index) => (
                                                          <tr
                                                              key={index}
                                                              onClick={() => navigateToDetailPage(sn.notCode)}
                                                              style={{ cursor: 'pointer' }}
                                                          >
                                                              <td>
                                                                  <input
                                                                      className='form-check-input mt-0'
                                                                      type='checkbox'
                                                                      defaultValue=''
                                                                      aria-label='Checkbox for following text input'
                                                                  />
                                                              </td>
                                                              <td>{index + 1}</td>
                                                              <td>{sn.notName}</td>
                                                              <td>
                                                                  {sn.notMember.posCode.posName} {sn.notMember.memName}
                                                              </td>
                                                              <td>{formatDate(new Date(sn.notCreateDate))}</td>
                                                              <td>{sn.notView}</td>
                                                          </tr>
                                                      ))
                                                    : Array.isArray(noticeList) &&
                                                      noticeList
                                                          .map((not, index) => (
                                                              <tr
                                                                  key={index}
                                                                  onDoubleClick={() =>
                                                                      navigateToDetailPage(not.notCode)
                                                                  }
                                                                  style={{ cursor: 'pointer' }}
                                                              >
                                                                  <td>
                                                                      <input
                                                                          className='form-check-input mt-0'
                                                                          type='checkbox'
                                                                          value=''
                                                                          aria-label='Checkbox for following text input'
                                                                          onChange={(e) =>
                                                                              handleCheckboxChange(
                                                                                  not.notCode,
                                                                                  e.target.checked
                                                                              )
                                                                          }
                                                                      />
                                                                  </td>
                                                                  <td>{index + 1}</td> {/*공지 번호 */}
                                                                  <td>{not.notName}</td> {/*공지 제목 */}
                                                                  <td>
                                                                      {not.notMember.posCode.posName}{' '}
                                                                      {not.notMember.memName}
                                                                  </td>{' '}
                                                                  {/*작성자 */}
                                                                  <td>{formatDate(new Date(not.notCreateDate))}</td>
                                                                  <td>{not.notView}</td> {/*조회수 */}
                                                              </tr>
                                                          ))}
                                            </tbody>
                                        </table>
                                        <div className='pay-top-wrapper'>
                                            <div style={{ width: '3%' }} />
                                            {/* 삭제버튼 */}
                                            <div
                                                className='btn btn-danger'
                                                style={{ width: '10%' }}
                                                onClick={onClickNotDelete}
                                            >
                                                <b>삭제</b>
                                            </div>
                                            <div style={{ width: '30%' }} />
                                            {/* 페이지이동버튼 */}
                                            <ul className='pagination pagination-sm'>
                                                <li className='page-item' onClick={() => setCurrentPage(1)}>
                                                    <a className='page-link' href='javascript:void(0);'>
                                                        <i className='tf-icon bx bx-chevrons-left'></i>
                                                    </a>
                                                </li>
                                                {pageNumber.map((num) => (
                                                    <li
                                                        key={num}
                                                        className={`page-item ${currentPage === num ? 'active' : ''}`}
                                                        onClick={() => setCurrentPage(num)}
                                                    >
                                                        <a className='page-link' href='javascript:void(0);'>
                                                            {num}
                                                        </a>
                                                    </li>
                                                ))}
                                                <li
                                                    className='page-item'
                                                    onClick={() => setCurrentPage(pageNumber.length)}
                                                >
                                                    <a className='page-link' href='javascript:void(0);'>
                                                        <i className='tf-icon bx bx-chevrons-right'></i>
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
                <div className='layout-overlay layout-menu-toggle' />
            </div>
        </>
    );
}

export default NoticeMain;
