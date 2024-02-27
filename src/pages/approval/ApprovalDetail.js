import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import { callApprovalAttachmentInfoAPI } from '../../apis/ApprovalAPICalls';
import { callApprovalCompleteInfoAPI } from '../../apis/ApprovalCompleteInfo';
import { callApprovalTypeInfoAPI } from '../../apis/ApprovalTypeInfo';
import { useDispatch, useSelector } from 'react-redux';
import AnnualCom from './AnnualCom';
import ReqDocumentCom from './ReqDocumentCom';
import RetiredmentCom from './RetiredmentCom';
import EditCommuteCom from './EditCommuteCom';
import EditScheduleCom from './EditScheduleCom';
import { callApprovalInfoAPI } from '../../apis/ApprovalInfoAPICalls';
import { callProxyAPI } from '../../apis/AttendanceAPICalls';

function ApprovalDetail(props) {
    const location = useLocation();
    const payCode = location.state?.payCode;
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const dispatch = useDispatch();

    const approvalComplete = useSelector((state) => state.approvalCompleteReducer);
    const approvalAttachment = useSelector((state) => state.approvalReducer);
    const approvalType = useSelector((state) => state.approvalTypeReducer);
    const refapproval = useSelector((state) => state.approvalInfoReducer);
    const refapprovalList = refapproval?.data?.content;
    const proxyMember = useSelector((state) => state.attendanceInfoReducer);
    const [form, setForm] = useState({
        memCode: '',
        date: '',
    });

    console.log('approvalComplete', approvalComplete);
    console.log('approvalAttachment', approvalAttachment);
    console.log('approvalType', approvalType);
    console.log('refapproval', refapproval);
    console.log('form AD', form);
    console.log('nonofalse', proxyMember?.data);

    let proxy = '';

    const test = refapproval?.refMember;
    if (refapproval?.refMember) {
        console.log('-------123>', test[0]?.memName);
    }

    if (proxyMember?.data) {
        proxy = approvalComplete[0]?.approvalMember?.memName;
        console.log('proxy', proxy);
    }

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);

        const formattedDate = year + '-' + month + '-' + day;
        setForm({
            memCode: token.memCode,
            date: formattedDate,
        });
        dispatch(
            callProxyAPI({
                form,
            })
        );
    }, [test]);

    useEffect(() => {
        dispatch(
            callApprovalInfoAPI({
                payCode: payCode,
            })
        );
    }, []);

    useEffect(() => {
        if (payCode) {
            dispatch(
                callApprovalAttachmentInfoAPI({
                    payCode: payCode,
                })
            );
        }
    }, [payCode]);

    useEffect(() => {
        dispatch(
            callApprovalCompleteInfoAPI({
                payCode: payCode,
            })
        );
    }, []);

    useEffect(() => {
        dispatch(
            callApprovalTypeInfoAPI({
                payCode: payCode,
            })
        );
    }, []);

    const type = approvalType?.approval?.payKind;

    useEffect(() => {
        renderSelectedPage();
        console.log('gd');
        console.log('type', type);
    }, [type]);

    const renderSelectedPage = (kind) => {
        switch (kind) {
            case '서류 요청':
                return <ReqDocumentCom data={{ approvalType, approvalComplete, refapprovalList }} />;
            case '출퇴근 정정':
                return (
                    <EditCommuteCom data={{ approvalType, approvalAttachment, approvalComplete, refapprovalList }} />
                );
            case '스케줄 정정':
                return (
                    <EditScheduleCom data={{ approvalType, approvalAttachment, approvalComplete, refapprovalList }} />
                );
            case '연차 신청':
                return <AnnualCom data={{ approvalType, approvalAttachment, approvalComplete, refapprovalList }} />;
            case '퇴직 신청':
                return (
                    <RetiredmentCom data={{ approvalType, approvalAttachment, approvalComplete, refapprovalList }} />
                );
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
                                                        <div
                                                            className='in-people'
                                                            style={{
                                                                marginLeft: '40px',
                                                                marginTop: '10px',
                                                            }}
                                                        >
                                                            <span>
                                                                {approvalType?.approval?.approvalMember?.memName}
                                                            </span>
                                                        </div>
                                                        {proxy ? (
                                                            <>
                                                                <div id='manager-btn'>결재자</div>
                                                                <div id='payment-manager1'>
                                                                    <div className='refSpan'></div>
                                                                </div>
                                                                <div id='manager-btn'>전결자</div>
                                                                <div id='payment-manager1'>
                                                                    <div className='refSpan'>{proxy}</div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div id='manager-btn'>결재자</div>
                                                                <div id='payment-manager1'>
                                                                    <div className='refSpan'>
                                                                        {approvalComplete[0]?.approvalMember?.memName}
                                                                    </div>
                                                                </div>
                                                                <div id='manager-btn'>전결자</div>
                                                                <div id='payment-manager1'>
                                                                    <div className='refSpan'></div>
                                                                </div>
                                                            </>
                                                        )}

                                                        <div id='manager-btn2'>참조자</div>
                                                        <div id='payment-manager2'>
                                                            {Array.isArray(test) && test?.length > 0 ? (
                                                                test?.map((b) => (
                                                                    <div className='refSpan' key={b?.memCode}>
                                                                        {b?.memName}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <span></span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className='kind'>{renderSelectedPage(type)}</div>
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

export default ApprovalDetail;
