import '../../@core/vendor/css/themeDefault.css';
import './dataformat.css';
import { useEffect, useState, useRef } from 'react';
import { callAllViewDataFormatAPI } from '../../apis/DataFormatAPICalls';
import { callDataFormatInsertAPI } from '../../apis/DataFormatAPICalls';
import { callDtaFormatDeleteAPI } from '../../apis/DataFormatAPICalls';
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
    const [dataFormatList, setDataFormatList] = useState([]);
    const registDate = new Date();
    const formattedDate = registDate.toISOString().slice(0, 10);
    const [currentDate, setCurrentDate] = useState(registDate);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const [dataFormatFile, setDataFormatFile] = useState(null);
    const dataFormatFileInput = useRef();
    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataFormat = useSelector((state) => state.dataFormatReducer);
    // const dataFormatList = dataFormat.data?.content;
    const pageInfo = dataFormat.pageInfo || {};
    const result = useSelector((state) => state.dataFormatInsertReducer);

    console.log('dataFormatList', dataFormatList);
    console.log('dataFormat', dataFormat);

    // 검색어 입력 핸들러
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            // 엔터키 누르거나 검색 아이콘 클릭 시
            let searchResult = [];
                // 제목으로 검색
                searchResult = dataFormatList.filter((dataFormat) => dataFormat.dataName.includes(search));
            
            setSearch(searchResult);
        }
    };

const onSearchChangeHandler = (e) => {
        console.log('~~~~~~~~~~~~', e.target.value);
        setSearch(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // 폼 동작 방지
        handleSearch(); // 검색 실행
    };

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
    }, [currentPage, result]);

    const [form, setForm] = useState({
        dataCode: '',
        dataName: '',
        memCode: '',
        registDate: '',
        dataSize: '',
        dataPath: '',
        dataDeleteStatus: 'N',
    });

    useEffect(() => {
        console.log('form22222222222222222222222', form);
    }, [form]);
    console.log('form : ', form);

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
            formData.append('registDate', formattedDate);
            formData.append('dataSize', file.size);

            Object.keys(formData).forEach((key) => {
                formData.append(key, formData[key]);
            });
            // 파일 업로드 함수 호출
            console.log('formData파일업로드', formData);

            uploadFile(formData);
        } else {
            console.error('파일이 선택되지 않았습니다.');
        }
    };
    const refreshDataFormatList = async () => {
        // 데이터 목록을 불러오기
        dispatch(callAllViewDataFormatAPI({ currentPage: 1 }));
    };
    // console.log('refreshDataFormatList', refreshDataFormatList);

    const uploadFile = async (formData) => {
        try {
            const response = await dispatch(callDataFormatInsertAPI(formData)).unwrap();
            const { dataCode } = response;
            const newDataPath = `src/main/resources/static/dataFormats/${dataCode}`;
            // form 상태 업데이트에 dataCode와 dataPath 추가
            setForm((prevForm) => ({
                ...prevForm,
                dataCode: dataCode, // 서버로부터 받은 dataCode로 업데이트
                dataPath: newDataPath, // 계산된 dataPath로 업데이트
            }));

            console.log('파일 업로드 및 데이터 삽입 성공', response);
            refreshDataFormatList();
        } catch (error) {
            // 업로드 실패 시 처리
            console.error('파일 업로드 및 데이터 삽입 실패', error);
        }
    };
    // console.log('uploadFile', uploadFile);

    //딜리트 할 때
    const onClickDeleteFile = async (dataCode) => {
        console.log('삭제 버튼 클릭', dataCode);

        form.dataCode = dataCode;

        console.log('form', form);

        // 서버에 삭제 요청 보내기
        try {
            await dispatch(callDtaFormatDeleteAPI(form)); // API 호출
            console.log('서버에서 삭제 성공', dataCode);

            // 성공적으로 삭제 후 클라이언트 상태 업데이트
            const updatedList = dataFormatList.filter((df) => df.dataCode !== dataCode);
            setDataFormatList(updatedList);
        } catch (error) {
            console.error('서버에서 삭제 실패', error);
        }
    };

    useEffect(() => {
        if (dataFormat.data?.content) {
            setDataFormatList(dataFormat.data.content);
        }
    }, [dataFormat]);

    //업로드 파일
    const onClickFileUpload = () => {
        // if (dataFormatFileInput.current) {
        dataFormatFileInput.current.click();
        // } else {
        // console.error('File input is not available.');
        // }
    };
    const dataFormatChange = (index, e) => {
        console.log('클릭2');

        if (e.target.files.length > 0) {
            console.log('클릭3');

            const file = e.target.files[0]; // 변경된 파일은 배열의 첫 번째 요소입니다.
            setDataFormatFile(file);
            onClickFileUpload(file, index); // 파일을 업로드합니다.
        }
    };

    //다운로드
    const onClickDown = async (index) => {
        try {
            const urlPath =
                'http://3.39.174.77' +
                '/dataFomats/' +
                dataFormatList[index].dataCode +
                '/' +
                dataFormatList[index].dataName;
            console.log(urlPath);

            const response = await fetch(urlPath); //파일 경로 지정
            const blob = await response.blob(); //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
            const url = window.URL.createObjectURL(new Blob([blob])); //다운로드 링크 생성
            const link = document.createElement('a'); //a 요소 생성
            link.href = url; //url을 a태그의 href속성으로 지정
            link.setAttribute('download', dataFormatList[index].dataName); //다운로드 파일 이름 지정
            document.body.appendChild(link); //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
            link.click(); //생성한 링크 클릭해서 파일 다운
            link.parentNode.removeChild(link); //a요소 제거
        } catch (error) {
            console.log('등록된 파일이 없습니다');
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
                                            {/* <form className='d-flex'>
                                                <div className='input-group'>
                                                    <input
                                                        type='text'
                                                        value={search}
                                                        onChange={onSearchChangeHandler}
                                                        onKeyUp={(e) => e.key === 'Enter' && handleSearch(e)}
                                                        className='form-control'
                                                        placeholder='검색'
                                                    />
                                                    <span className='input-group-text'>
                                                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAd5JREFUSEu11cvLTWEUx/HPGxnIpSiXiZAwcIuSAQpFL2XqUgxIURhQBv4AMiEhDCgk5Q+Q0VsImSAlopTIgFwi9+uz6nl1HO/e5xnssya7zn7O+j5rrd9v7R5djp4u51cHmIB1WInZ+SJ3cAkX8LzkcgMBRuAcVtck+I2L2IRPdaB2wFDcwgx8xUkcxpOcZDJ2YQuG5LOL8L0K0g44iw14hhV4UPHHWbicLjAeB7G7BDAT9/Aj9Xk+ot91sRhX8A2T8GKgw60VHMF2HMWOkgHiPNYnyF7s7wR4jCm5//cLAUvQh2vpGRX9F60VfEQMeRB+FQJGpWpf4w1GdwK8x3AMQ8BKIs5+wCuM6QS4mw01L3ngdkn2pKQFSW03c5uWdQIcSKbZgxPYVgg4kzyyMbUnBLKzE2AqHuJnoUzDYFdz0sqq2412Ktv/KZYnCT6qqGRONtrY7PatJUaLM62r4guO41B2dryPKmNVbMbgnDRmEK6PYdfKtP/lyGygVTVzeJd20b7U0rWYm12/FPH7P1G3ridml/Yids/nrK4bOIa3CB+E0WKdhwpDSeGJv9HEBycg1zEdsQ0W4mU/oQlA5AqThaKm5fmcbhoQ+cal9b4mfz8abVGtJ5tqUSWk64A/OxFWGSrrSC8AAAAASUVORK5CYII=' />
                                                    </span>
                                                </div>
                                            </form> */}
                                            <div style={{ width: '5%' }} />
                                            <input
                                                type='file'
                                                id='fileInput'
                                                name='dataFormatFile'
                                                style={{ display: 'none' }}
                                                onChange={handleFileSelect}
                                                onClick={onClickFileUpload}
                                                ref={dataFormatFileInput}
                                            />
                                            <label
                                                htmlFor='fileInput'
                                                className='btn btn-primary'
                                                style={{ width: '14%' }}
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
                                                            <td>{df?.dataName}</td>
                                                            <td>
                                                                {df?.dataMember?.posCode?.posName}{' '}
                                                                {df?.dataMember?.memName}
                                                            </td>
                                                            <td>{formatDate(new Date(df.registDate))}</td>
                                                            <td>{(df.dataSize / 1024).toFixed(2)} KB</td>
                                                            <td style={{ textAlign: 'right' }}>
                                                                <img
                                                                    type='file'
                                                                    name='dataFormatFile'
                                                                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC'
                                                                    onClick={() => onClickDown(index)}
                                                                    alt='파일 다운로드'
                                                                />
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <img
                                                                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC'
                                                                    onClick={() => onClickDeleteFile(df?.dataCode)}
                                                                    alt='파일 삭제처리
'
                                                                />
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
