import '../../@core/vendor/css/core.css';
import './approval.css';
import '../../@core/vendor/css/themeDefault.css';
import '../../@core/css/demo.css';
import '../../@core/css/pay.css';
import '../../@core/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import '../../@core/vendor/libs/apex-charts/apex-charts.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callReceiveApprovalAPI } from '../../apis/ApprovalAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import { callSearchApprovalAPI } from '../../apis/ApprovalInfoAPICalls';

// const { useDispatch, useSelector } = require('react-redux');
const { useNavigate } = require('react-router-dom');

function Approval() {
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const approval = useSelector((state) => state.approvalReducer);
    const approvalList = approval?.data?.content;
    const searchData = useSelector((state) => state.approvalInfoReducer);
    const searchDataList = searchData?.data?.data?.content;
    const [form, setForm] = useState({
        memCode: token.memCode,
        currentPage: 1,
    });

    const [search, setSearch] = useState({
        memCode: token.memCode,
        approvalStart: '',
        approvalEnd: '',
        approvalType: '',
        approvalStatus: '',
        approvalName: '',
        currentPage: 1,
    });

    const onChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        });
        console.log('폼ㅍ뫂모', search);
    };

    useEffect(() => {
        setStart((currentPage - 1) * 5);
        form.currentPage = currentPage;
        dispatch(
            callReceiveApprovalAPI({
                form,
            })
        );
    }, [currentPage]);

    function searchBtn() {
        setStart((currentPage - 1) * 5);
        search.currentPage = currentPage;

        console.log('가기전에', search);

        dispatch(
            callSearchApprovalAPI({
                search,
            })
        );
        console.log('searchData', searchData?.data?.data?.content);
    }

    const pageInfo = approval.pageInfo || {};

    console.log('pageInfo', pageInfo);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    // const approvals = useSelector((state) => state.approvalReducer);
    // const approvalList = approvals.data;

    console.log('approvalList ', approvalList);

    const onClickSendApproval = () => {
        console.log('onClickSendApproval click');
        navigate(`/main/SendApproval`, { replace: false });
    };

    const onClickAssignment = () => {
        console.log('Assignment click');
        navigate(`/main/Assignment`, { replace: false });
    };

    const onClickReceiveApproval = () => {
        console.log('ReceiveApproval click');
        navigate(`/main/Approval`, { replace: false });
    };

    const requestApproval = () => {
        navigate(`/main/RequestApproval`, { replace: false });
    };

    const ondblclickapproval = (payCode) => {
        navigate(`/main/ApprovalDetail`, { state: { payCode } });
    };

    return (
        <>
            <div className='layout-wrapper layout-content-navbar'>
                <div className='layout-container'>
                    <div className='layout-page'>
                        <div className='content-wrapper'>
                            <div className='container-xxl flex-grow-1 container-p-y'>
                                <h4 className='fw-bold py-3 mb-4'>
                                    <span className='text-muted fw-light'>결재 {'>'}</span> 받은 결재
                                </h4>
                                <div className='payment-line'>
                                    <ul className='nav nav-pills flex-column flex-md-row mb-3'>
                                        <li className='nav-item'>
                                            <button className='nav-link active' onClick={onClickReceiveApproval}>
                                                {' '}
                                                받은 결재
                                            </button>
                                        </li>
                                        <li className='nav-item'>
                                            <button className='nav-link' onClick={onClickSendApproval}>
                                                {' '}
                                                보낸 결재
                                            </button>
                                        </li>
                                        <li className='nav-item'>
                                            <button className='nav-link' onClick={onClickAssignment}>
                                                {' '}
                                                전결자 지정
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className='col-xxl'>
                                    <div className='card mb-4'>
                                        <div className='pay-top-wrapper'>
                                            <div></div>
                                            <input
                                                name='approvalStart'
                                                onChange={onChange}
                                                className='inputDate'
                                                type='date'
                                            />{' '}
                                            <select
                                                name='approvalType'
                                                onChange={onChange}
                                                className='payment-type1'
                                                id='payment-type1'
                                            >
                                                <option value=''>결재유형</option>
                                                <option value='연차 신청'>연차 신청</option>
                                                <option value='서류 요청'>서류 요청</option>
                                                <option value='퇴직 신청'>퇴직 신청</option>
                                                <option value='출퇴근 정정'>출퇴근 기록 정정</option>
                                                <option value='스케줄 정정'>스케줄 변경 신청</option>
                                            </select>
                                            <select
                                                name='approvalStatus'
                                                onChange={onChange}
                                                className='payment-status'
                                                id='payment-status'
                                            >
                                                <option value=''>결재상태</option>
                                                <option value='반려'>반려</option>
                                                <option value='승인'>승인</option>
                                                <option value='대기'>대기</option>
                                            </select>
                                            <input
                                                type='search'
                                                placeholder='결재 제목을 알려주세요 '
                                                name='approvalName'
                                                onChange={onChange}
                                                style={{ width: '400px' }}
                                            />
                                            <button
                                                style={{
                                                    backgroundColor: '#dcdcff',
                                                    width: '50px',
                                                    height: '26px',
                                                    color: 'white',
                                                    boxShadow: '0 2px 4px 0 rgba(105, 108, 255, 0.4)',
                                                    marginLeft: '3px',
                                                    border: 'none',
                                                }}
                                                onClick={searchBtn}
                                            >
                                                {/* <img
                                                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAd5JREFUSEu11cvLTWEUx/HPGxnIpSiXiZAwcIuSAQpFL2XqUgxIURhQBv4AMiEhDCgk5Q+Q0VsImSAlopTIgFwi9+uz6nl1HO/e5xnssya7zn7O+j5rrd9v7R5djp4u51cHmIB1WInZ+SJ3cAkX8LzkcgMBRuAcVtck+I2L2IRPdaB2wFDcwgx8xUkcxpOcZDJ2YQuG5LOL8L0K0g44iw14hhV4UPHHWbicLjAeB7G7BDAT9/Aj9Xk+ot91sRhX8A2T8GKgw60VHMF2HMWOkgHiPNYnyF7s7wR4jCm5//cLAUvQh2vpGRX9F60VfEQMeRB+FQJGpWpf4w1GdwK8x3AMQ8BKIs5+wCuM6QS4mw01L3ngdkn2pKQFSW03c5uWdQIcSKbZgxPYVgg4kzyyMbUnBLKzE2AqHuJnoUzDYFdz0sqq2412Ktv/KZYnCT6qqGRONtrY7PatJUaLM62r4guO41B2dryPKmNVbMbgnDRmEK6PYdfKtP/lyGygVTVzeJd20b7U0rWYm12/FPH7P1G3ridml/Yids/nrK4bOIa3CB+E0WKdhwpDSeGJv9HEBycg1zEdsQ0W4mU/oQlA5AqThaKm5fmcbhoQ+cal9b4mfz8abVGtJ5tqUSWk64A/OxFWGSrrSC8AAAAASUVORK5CYII='
                                                    style={{ width: '20px', marginLeft: '5px' }}
                                                /> */}
                                                검색
                                            </button>
                                            <button className='payment-insert-button' onClick={requestApproval}>
                                                결재신청
                                            </button>
                                        </div>
                                        <table className='table table-hover'>
                                            <thead>
                                                <tr style={{ backgroundColor: '#DCDCFF' }}>
                                                    <th>상신자</th>
                                                    <th>제목</th>
                                                    <th>요청일</th>
                                                    <th>반려/승인일</th>
                                                    <th>결재 유형</th>
                                                    <th>상태</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(searchDataList) && searchDataList.length > 0 ? (
                                                    searchDataList.map((a) => (
                                                        <tr
                                                            key={a.approval.payCode}
                                                            onDoubleClick={() => {
                                                                ondblclickapproval(a.approval.payCode);
                                                            }}
                                                        >
                                                            <td>{a.approval?.approvalMember?.memName}</td>
                                                            <td>{a.approval?.payName}</td>
                                                            <td>{a.approval?.payDate}</td>
                                                            <td>{a.appDate}</td>
                                                            <td>{a.approval?.payKind}</td>
                                                            <td>{a.appState}</td>
                                                        </tr>
                                                    ))
                                                ) : searchDataList?.length === 0 ? (
                                                    <tr>
                                                        <td
                                                            colSpan={6}
                                                            style={{
                                                                textAlign: 'center',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            검색된 결재가 없습니다.
                                                        </td>
                                                    </tr>
                                                ) : Array.isArray(approvalList) && approvalList.length > 0 ? (
                                                    approvalList.map((a) => (
                                                        <tr
                                                            key={a.approval.payCode}
                                                            onDoubleClick={() => {
                                                                ondblclickapproval(a.approval.payCode);
                                                            }}
                                                        >
                                                            <td>{a.approval?.approvalMember?.memName}</td>
                                                            <td>{a.approval?.payName}</td>
                                                            <td>{a.approval?.payDate}</td>
                                                            <td>{a.appDate}</td>
                                                            <td>{a.approval?.payKind}</td>
                                                            <td>{a.appState}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan={6}
                                                            style={{
                                                                textAlign: 'center',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            보낸 결재가 없습니다.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <ul className='pagination pagination-sm' id='pageBtn1'>
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
                                            <li className='page-item' onClick={() => setCurrentPage(pageNumber.length)}>
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
        </>
    );
}

export default Approval;
