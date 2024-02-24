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
import { callOrganizationTreeAPI } from '../../apis/OrganizationChartAPICalls.js';
import CheckboxTree from 'react-checkbox-tree';
import { callDepMemberInfoAPI } from '../../apis/ApprovalInfoAPICalls.js';

function RequestApproval() {
    const [selectOption, setSelectOption] = useState('1');

    const optionChange = (e) => {
        setSelectOption(e.target.value);
    };

    const dispatch = useDispatch();
    const memberInfo = useSelector((state) => state.approvalReducer);
    const depMember = useSelector((state) => state.approvalInfoReducer);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const departmentList = useSelector((state) => state.organizationChartReducer);
    const [checked, setChecked] = useState([]);
    const [check, setCheck] = useState([]);
    const [currentCheck, setCurrentCheck] = useState([]);
    const [expanded, setExpanded] = useState(['동물원병원']);
    const [searchQuery, setSearchQuery] = useState('');
    const [depCode, setDepCode] = useState({
        memCode: token.memCode,
    });
    const [appNames, setAppNames] = useState(depMember?.memName);
    const [appCodes, setAppCodes] = useState(depMember?.memCode);

    const [refNames, setRefNames] = useState([]);
    const [refCodes, setRefCodes] = useState([]);

    const searchMethod = (node, searchQuery) => node.label.toLowerCase().includes(searchQuery.toLowerCase());
    console.log('refNames', refNames);
    console.log('appNNNames ', appNames);

    useEffect(() => {
        setAppNames(depMember?.memName);
        setAppCodes(depMember?.memCode);
    }, [depMember]);

    const onClickCheckMember = () => {
        console.log('onClickCheckMember 최종 check --- >', checked);

        const splitArray = checked.map((item) => {
            const [number, name] = item.split(' ');
            return { number, name };
        });

        setAppNames(splitArray[0]?.name);
        setAppCodes(splitArray[0]?.number);
    };

    const onClickCheckRefMember = () => {
        console.log('onClickCheckMember 최종 check --- >', checked);

        const splitArray = checked.map((item) => {
            const [number, name] = item.split(' ');
            return { number, name };
        });

        setRefNames(splitArray.map((item) => ' ' + item.name));
        setRefCodes(splitArray.map((item) => ' ' + item.number));
    };

    useEffect(() => {
        dispatch(callDepMemberInfoAPI({ depCode }));
    }, []);

    console.log('department', departmentList);

    const onClickGetMemCode = (e) => {
        console.log(e);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        console.log(searchQuery);
    };

    useEffect(() => {
        dispatch(callOrganizationTreeAPI());
    }, [dispatch]);

    const nodes =
        departmentList && departmentList.children
            ? [
                  {
                      value: departmentList.depName,
                      label: departmentList.depName,
                      expandDisabled: true,
                      children: departmentList.children.map((dep) => ({
                          value: dep.depName === '인사팀' ? dep.depName : dep.depName,
                          label: dep.depName === '인사팀' ? dep.depName : dep.depName,
                          children:
                              dep.depName === '인사팀'
                                  ? dep.memberList.map((mem) => ({
                                        value: mem.memCode + ' ' + mem.memName,
                                        label: mem.memName + ' ' + mem.posName,
                                    }))
                                  : dep.children.map((chi) => ({
                                        value: chi.depCode,
                                        label: chi.depName,
                                        children: chi.memberList.map((mem) => ({
                                            value: mem.memCode + ' ' + mem.memName,
                                            label: mem.memName + ' ' + mem.posName,
                                        })),
                                    })),
                      })),
                  },
              ]
            : [];

    const renderSelectedPage = () => {
        console.log('dataAppCode : ', appCodes);
        console.log('dataRefCode :', refCodes);

        switch (selectOption) {
            case '1':
                return <Annual appCodes={appCodes} refCodes={refCodes} />;
            case '2':
                return <ReqDocument appCodes={appCodes} refCodes={refCodes} />;
            case '3':
                return <Retiredment appCodes={appCodes} refCodes={refCodes} />;
            case '4':
                return <EditCommute appCodes={appCodes} refCodes={refCodes} />;
            case '5':
                return <EditSchedule appCodes={appCodes} refCodes={refCodes} />;
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
                                                            결재자
                                                            <button
                                                                id='tree-btn'
                                                                data-bs-toggle='modal'
                                                                data-bs-target='#modalCenter1'
                                                            >
                                                                조직도
                                                            </button>
                                                        </div>
                                                        <div id='payment-manager1'>
                                                            <div className='refSpan'>{appNames}</div>
                                                        </div>
                                                        <div id='manager-btn'>전결자</div>
                                                        <div id='payment-manager1'>
                                                            <div className='refSpan'></div>
                                                        </div>
                                                        <div id='manager-btn2'>
                                                            참조자
                                                            <button
                                                                id='tree-btn2'
                                                                data-bs-toggle='modal'
                                                                data-bs-target='#modalCenter2'
                                                            >
                                                                조직도
                                                            </button>
                                                        </div>
                                                        <div id='payment-manager2'>
                                                            {Array.isArray(refNames) && refNames.length > 0 ? (
                                                                refNames.map((b, index) => (
                                                                    <div className='refSpan' key={index}>
                                                                        {b}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <span></span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className='kind'>{renderSelectedPage()}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='modal fade' id='modalCenter1' tabindex='-1' aria-hidden='true'>
                                        <div className='modal-dialog modal-dialog-centered' role='document'>
                                            <div className='modal-content'>
                                                <div className='modal-header'>
                                                    <h5 className='modal-title' id='modalCenterTitle'>
                                                        결재자 선택
                                                    </h5>
                                                    <button
                                                        type='button'
                                                        className='btn-close'
                                                        data-bs-dismiss='modal'
                                                        aria-label='Close'
                                                        style={{
                                                            marginTop: '20px',
                                                            marginRight: '20px',
                                                        }}
                                                    ></button>
                                                </div>
                                                <div className='modal-body'>
                                                    {/* 조직도 화면 */}
                                                    <div>
                                                        <CheckboxTree
                                                            nodes={nodes}
                                                            checked={checked}
                                                            expanded={expanded}
                                                            onCheck={(checked) => {
                                                                const checkedNodesCount = Object.keys(checked).filter(
                                                                    (key) => checked[key]
                                                                ).length;

                                                                if (checkedNodesCount > 1) {
                                                                    const test = checked.filter(
                                                                        (item) => item !== check[0]
                                                                    );

                                                                    setChecked(test);
                                                                    setCheck(test);
                                                                } else {
                                                                    setCheck(checked);
                                                                    setChecked(checked);
                                                                }
                                                            }}
                                                            onExpand={setExpanded}
                                                            onClick={(e) => onClickGetMemCode(e)}
                                                            icons={{
                                                                check: <span className='bx bx-checkbox-checked' />,
                                                                uncheck: <span className='bx bx-checkbox' />,
                                                                halfCheck: <span className='bx bx-checkbox-square' />,
                                                                expandClose: <span className='bx bx-chevron-right' />,
                                                                expandOpen: <span className='bx bx-chevron-down' />,
                                                                expandAll: (
                                                                    <span className='rct-icon rct-icon-expand-all' />
                                                                ),
                                                                collapseAll: <span className='bx folder-open' />,
                                                                parentClose: <span className='bx bx-folder' />,
                                                                parentOpen: (
                                                                    <span
                                                                        className='bx bx-folder-open'
                                                                        style={{ color: '#696cff' }}
                                                                    />
                                                                ),
                                                                leaf: <span className='bx bx-user' />,
                                                            }}
                                                            searchQuery={searchQuery}
                                                            searchMethod={searchMethod}
                                                        />
                                                    </div>
                                                    {/* 조직도 화면 끝 */}
                                                </div>
                                                <div className='modal-footer'>
                                                    <button
                                                        type='button'
                                                        className='btn btn-outline-secondary'
                                                        data-bs-dismiss='modal'
                                                    >
                                                        닫기
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn btn-primary'
                                                        data-bs-dismiss='modal'
                                                        onClick={onClickCheckMember}
                                                    >
                                                        선택
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='modal fade' id='modalCenter2' tabindex='-1' aria-hidden='true'>
                                        <div className='modal-dialog modal-dialog-centered' role='document'>
                                            <div className='modal-content'>
                                                <div className='modal-header'>
                                                    <h5 className='modal-title' id='modalCenterTitle'>
                                                        참조자 선택
                                                    </h5>
                                                    <button
                                                        type='button'
                                                        className='btn-close'
                                                        data-bs-dismiss='modal'
                                                        aria-label='Close'
                                                        style={{
                                                            marginTop: '20px',
                                                            marginRight: '20px',
                                                        }}
                                                    ></button>
                                                </div>
                                                <div className='modal-body'>
                                                    {/* 조직도 화면 */}
                                                    <div>
                                                        <CheckboxTree
                                                            nodes={nodes}
                                                            checked={checked}
                                                            expanded={expanded}
                                                            onCheck={
                                                                checked !== undefined
                                                                    ? (checked) => setChecked(checked)
                                                                    : ''
                                                            }
                                                            onExpand={setExpanded}
                                                            onClick={(e) => onClickGetMemCode(e)}
                                                            icons={{
                                                                check: <span className='bx bx-checkbox-checked' />,
                                                                uncheck: <span className='bx bx-checkbox' />,
                                                                halfCheck: <span className='bx bx-checkbox-square' />,
                                                                expandClose: <span className='bx bx-chevron-right' />,
                                                                expandOpen: <span className='bx bx-chevron-down' />,
                                                                expandAll: (
                                                                    <span className='rct-icon rct-icon-expand-all' />
                                                                ),
                                                                collapseAll: <span className='bx folder-open' />,
                                                                parentClose: <span className='bx bx-folder' />,
                                                                parentOpen: (
                                                                    <span
                                                                        className='bx bx-folder-open'
                                                                        style={{ color: '#696cff' }}
                                                                    />
                                                                ),
                                                                leaf: <span className='bx bx-user' />,
                                                            }}
                                                            searchQuery={searchQuery}
                                                            searchMethod={searchMethod}
                                                        />
                                                    </div>
                                                    {/* 조직도 화면 끝 */}
                                                </div>
                                                <div className='modal-footer'>
                                                    <button
                                                        type='button'
                                                        className='btn btn-outline-secondary'
                                                        data-bs-dismiss='modal'
                                                    >
                                                        닫기
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn btn-primary'
                                                        data-bs-dismiss='modal'
                                                        onClick={onClickCheckRefMember}
                                                    >
                                                        선택
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div></div>
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
