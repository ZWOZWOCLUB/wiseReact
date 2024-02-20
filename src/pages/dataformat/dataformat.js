import '../../@core/vendor/css/themeDefault.css';
import './dataformat.css';
import { useEffect, useState } from 'react';
import { callAllViewDataFormatAPI } from '../../apis/DataFormatAPICalls';
import { callDataFormatInsertAPI } from '../../apis/DataFormatAPICalls';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils.js';
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
function DataFormat() {
    const registDate = new Date();
    const formattedDate = registDate.toISOString().slice(0, 10);
    const [currentDate, setCurrentDate] = useState(registDate);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const [dataFormatFiles, setDataFormatFiles] = useState(null);
    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataFormat = useSelector((state) => state.dataFormatReducer);
    const dataFormatList = dataFormat.data?.content;
    const pageInfo = dataFormat.pageInfo || {};

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }
    console.log();

    useEffect(() => {
        console.log('currentPage', currentPage);
        setStart((currentPage - 1) * 5);
        dispatch(
            callAllViewDataFormatAPI({
                currentPage: currentPage,
            })
        );
    }, [currentPage]);

    const [form, setForm] = useState({
        dataCode: token.dataCode,
        dataName: '',
        memCode: token.memCode,
        registDate: '',
        dataSize: '',
        dataPath: '',
        dataDeleteStatus: 'N',
    });

    useEffect(() => {
        console.log('form22222222222222222222222', form);
    }, [form]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prevForm) => ({
                ...prevForm,
                dataName: file.name,
                registDate: registDate,
                dataSize: file.size,
                
            }));

            console.log(file);
            // setForm(file.dataName) // 선택한 파일을 상태에 저장
            console.log('선택한 파일', file);

            // 파일 업로드를 위해 FormData 생성 및 파일 추가
            const formData = new FormData();
            formData.append('dataFormatFile', file);

            formData.append('dataName', file.name);
            // formData.append('memCode', formData.memCode)
            formData.append('registDate', formattedDate);
            formData.append('dataSize', file.size);
            // formData.append('dataPath', formData.dataPath);
            // formData.append('dataDeleteStatus', formData.dataDeleteStatus);

            Object.keys(formData).forEach((key) => {
                formData.append(key, formData[key]);
            });
            // 파일 업로드 함수 호출
            uploadFile(formData);
        } else {
            console.error('파일이 선택되지 않았습니다.');
        }
    };

    const uploadFile = async (formData) => {
        try {
            // 파일 업로드 API 호출하고 응답을 기다림
            const response = await dispatch(callDataFormatInsertAPI(formData)).unwrap();

            // 업로드 성공 시 서버로부터 반환된 데이터에서 dataCode 추출
            const { dataCode } = response;

            // dataCode를 기반으로 dataPath 설정 (실제 경로 설정 방식은 서버의 구현에 따라 달라질 수 있음)
            const newDataPath = `src/main/resources/static/dataFormats/${dataCode}`;

            // form 상태 업데이트에 dataCode와 dataPath 추가
            setForm((prevForm) => ({
                ...prevForm,
                dataCode: dataCode, // 서버로부터 받은 dataCode로 업데이트
                dataPath: newDataPath, // 계산된 dataPath로 업데이트
            }));

            console.log('파일 업로드 및 데이터 삽입 성공', response);
            // window.location.reload(); // API 호출 성공 후 페이지 새로고침
        } catch (error) {
            // 업로드 실패 시 처리
            console.error('파일 업로드 및 데이터 삽입 실패', error);
        }
    };

    // const uploadFile = async (formData) => {
    //     try {
    //         const response = await callDataFormatInsertAPI(formData);
    //         if (response.ok) {
    //             const data = await response.json();
    //             const dataCode = data.dataCode; // 서버 응답에서 dataCode 추출
    //             return dataCode; // 추출한 dataCode 반환
    //         } else {
    //             // 에러 처리
    //             console.error('파일 업로드 실패');
    //         }
    //     } catch (error) {
    //         console.error('파일 업로드 중 오류 발생', error);
    //     }
    // };


    // const uploadFile = (formData) => {
    //     // 파일 업로드 API 호출
    //     dispatch(callDataFormatInsertAPI(formData))
    //         .then(() => {
    //             // 업로드 성공 시 추가 처리
    //             console.log('파일 업로드 및 데이터 삽입 성공');
    //             // 추가 작업 수행
    //         })
    //         .catch((error) => {
    //             // 업로드 실패 시 처리
    //             console.error('파일 업로드 및 데이터 삽입 실패', error);
    //         });
    // };

    
    return (
        <>
            <div className='layout-wrapper layout-content-navbar'>
                <div className='layout-container'>
                    <div className='layout-page'>
                        <div className='content-wrapper'>
                            <div className='container-xxl flex-grow-1 container-p-y'>
                                <h4 className='fw-bold py-3 mb-4'>
                                    <span className='text-muted fw-light'>자료실 {'>'}</span> 서식자료실
                                </h4>
                                <div className='col-xxl'>
                                    <div className='card mb-4'>
                                        <div className='pay-top-wrapper'>
                                            <div style={{ width: '6%' }} />
                                            <div style={{ width: '10%', color: '#8184ff' }}>
                                                <b>서식자료실</b>
                                            </div>
                                            <div style={{ width: '100%' }} />
                                            <form className='d-flex'>
                                                <div className='input-group'>
                                                    <input type='text' className='form-control' placeholder='검색' />
                                                    <span className='input-group-text'>
                                                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAd5JREFUSEu11cvLTWEUx/HPGxnIpSiXiZAwcIuSAQpFL2XqUgxIURhQBv4AMiEhDCgk5Q+Q0VsImSAlopTIgFwi9+uz6nl1HO/e5xnssya7zn7O+j5rrd9v7R5djp4u51cHmIB1WInZ+SJ3cAkX8LzkcgMBRuAcVtck+I2L2IRPdaB2wFDcwgx8xUkcxpOcZDJ2YQuG5LOL8L0K0g44iw14hhV4UPHHWbicLjAeB7G7BDAT9/Aj9Xk+ot91sRhX8A2T8GKgw60VHMF2HMWOkgHiPNYnyF7s7wR4jCm5//cLAUvQh2vpGRX9F60VfEQMeRB+FQJGpWpf4w1GdwK8x3AMQ8BKIs5+wCuM6QS4mw01L3ngdkn2pKQFSW03c5uWdQIcSKbZgxPYVgg4kzyyMbUnBLKzE2AqHuJnoUzDYFdz0sqq2412Ktv/KZYnCT6qqGRONtrY7PatJUaLM62r4guO41B2dryPKmNVbMbgnDRmEK6PYdfKtP/lyGygVTVzeJd20b7U0rWYm12/FPH7P1G3ridml/Yids/nrK4bOIa3CB+E0WKdhwpDSeGJv9HEBycg1zEdsQ0W4mU/oQlA5AqThaKm5fmcbhoQ+cal9b4mfz8abVGtJ5tqUSWk64A/OxFWGSrrSC8AAAAASUVORK5CYII=' />
                                                    </span>
                                                </div>
                                            </form>
                                            <div style={{ width: '5%' }} />
                                            <input
                                                type='file'
                                                id='fileInput'
                                                style={{ display: 'none' }}
                                                onChange={handleFileSelect}
                                            />
                                            <label
                                                htmlFor='fileInput'
                                                className='btn btn-primary'
                                                style={{ width: '14%' }}
                                                // onClick={handleFileUpload}
                                            >
                                                <b>자료 추가</b>
                                            </label>
                                            <div style={{ width: '6%' }} />
                                        </div>
                                        <table className='table table-hover' style={{ width: '90%', margin: '0 auto' }}>
                                            <tbody>
                                                <tr style={{ backgroundColor: '#DCDCFF' }}>
                                                    <th style={{ width: '20%' }}>파일명</th>
                                                    <th style={{ width: '15%' }}>작성자</th>
                                                    <th style={{ width: '15%' }}>작성일</th>
                                                    <th style={{ width: '10%' }}>파일크기</th>
                                                    <th style={{ width: '40%' }} />
                                                </tr>
                                                {Array.isArray(dataFormatList) &&
                                                    dataFormatList.map((df, index) => (
                                                        <tr key={index}>
                                                            <td>{df.dataName}</td>
                                                            <td>
                                                                {df.dataMember?.posCode.posName}{' '}
                                                                {df.dataMember?.memName}
                                                            </td>
                                                            <td>{formatDate(new Date(df.registDate))}</td>
                                                            <td>{(df.dataSize / 1024).toFixed(2)} KB</td>
                                                            <td style={{ textAlign: 'right' }}>
                                                                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC' />
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC' />
                                                                &nbsp;&nbsp;
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                        <div className='pay-top-wrapper'>
                                            <div style={{ width: '45%' }} />

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
export default DataFormat;
