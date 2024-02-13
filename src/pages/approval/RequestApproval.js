import '../../@core/vendor/css/core.css';
import './approval.css';
import '../../@core/vendor/css/themeDefault.css';
import '../../@core/css/demo.css';
import '../../@core/css/pay.css';
import '../../@core/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import '../../@core/vendor/libs/apex-charts/apex-charts.css';
import '../../@core/css/payment-annual.css';
import Retiredment from './Retiredment';
import ReqDocument from './ReqDocument';
import EditCommute from './EditCommute';
import EditSchedule from './EditSchedule';
import Annual from './Annual';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils.js';

function RequestApproval() {
    const [selectOption, setSelectOption] = useState('1');

    const optionChange = (e) => {
        setSelectOption(e.target.value);
    };

    const [data, setData] = useState('');
    // 여기서 사원 데이터 모두 가져와서 선택한 값 들어가도록 해결 .

    const dispatch = useDispatch();

    const memberInfo = useSelector((state) => state.approvalReducer);

    const token = decodeJwt(window.localStorage.getItem('accessToken'));

    const renderSelectedPage = () => {
        console.log(token);

        switch (selectOption) {
            case '1':
                return <Annual data={data} />;
            case '2':
                return <ReqDocument data={data} />;
            case '3':
                return <Retiredment data={data} />;
            case '4':
                return <EditCommute data={data} />;
            case '5':
                return <EditSchedule data={data} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className='layout-wrapper layout-content-navbar'>
                <div className='layout-container'>
                    <div className='layout-page'>
                        <div className='content-wrapper'>
                            <div className='container-xxl flex-grow-1 container-p-y'>
                                <div className='col-xxl'>
                                    <div className='card mb-4'>
                                        <div className='pay-top-wrapper'>
                                            <div className='container'>
                                                <div className='payment-type'>
                                                    <div className='people'>
                                                        <div className='in-people'>
                                                            <div
                                                                style={{
                                                                    backgroundColor: 'white',
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    marginRight: '20px',
                                                                }}
                                                            ></div>
                                                            <span>{token.memName}</span>
                                                            <select
                                                                name='type'
                                                                id='payment-type'
                                                                onChange={optionChange}
                                                                value={selectOption}
                                                            >
                                                                <option value='1'>연차 신청</option>
                                                                <option value='2'>서류 요청</option>
                                                                <option value='3'>퇴직 신청</option>
                                                                <option value='4'>출퇴근 기록 정정</option>
                                                                <option value='5'>스케줄 변경 신청</option>
                                                            </select>
                                                        </div>
                                                        <div id='manager-btn'>
                                                            결재자<button id='tree-btn'>조직도</button>
                                                        </div>
                                                        <div className='payment-manager1'>
                                                            <div style={{ backgroundColor: 'black' }}>
                                                                <span>이현강</span>
                                                            </div>
                                                        </div>
                                                        <div id='manager-btn'>전결자</div>
                                                        <div id='payment-manager1'>
                                                            <span>이동락</span>
                                                        </div>
                                                        <div id='manager-btn2'>
                                                            참조자<button id='tree-btn2'>조직도</button>
                                                        </div>
                                                        <div id='payment-manager2'>
                                                            <span>이동건</span>
                                                            <span>도우제</span>
                                                        </div>
                                                    </div>
                                                    <div className='kind'>{renderSelectedPage()}</div>
                                                </div>
                                            </div>
                                        </div>
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

export default RequestApproval;
