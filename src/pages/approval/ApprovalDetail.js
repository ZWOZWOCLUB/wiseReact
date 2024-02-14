import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import { callApprovalAttachmentInfoAPI } from '../../apis/ApprovalAPICalls';
import { callApprovalInfoAPI } from '../../apis/ApprovalInfoAPICalls';
import { callApprovalCompleteInfoAPI } from '../../apis/ApprovalCompleteInfo';
import { callApprovalTypeInfoAPI } from '../../apis/ApprovalTypeInfo';
import { useDispatch, useSelector } from 'react-redux';
import AnnualCom from './AnnualCom';
import ReqDocumentCom from './ReqDocumentCom';
import RetiredmentCom from './RetiredmentCom';
import EditCommuteCom from './EditCommuteCom';
import EditScheduleCom from './EditScheduleCom';

function ApprovalDetail(props) {
    const location = useLocation();
    const payCode = location.state?.payCode;
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const dispatch = useDispatch();

    const approvalComplete = useSelector((state) => state.approvalCompleteReducer);
    const approvalAttachment = useSelector((state) => state.approvalReducer);
    const approvalType = useSelector((state) => state.approvalTypeReducer);

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

    console.log('type', approvalType);
    console.log('file', approvalAttachment);
    console.log('com', approvalComplete);
    // console.log('qw', approvalComplete.approvalMember);
    console.log('we', approvalComplete?.approvalMember?.memName);

    const type = approvalType?.approval?.payKind;

    useEffect(() => {
        renderSelectedPage();
        console.log('gd');
        console.log('type', type);
    }, [type]);

    const renderSelectedPage = (kind) => {
        switch (kind) {
            case '서류 요청':
                return <ReqDocumentCom data={{ approvalType, approvalComplete }} />;
            case '출퇴근 정정':
                return <EditCommuteCom data={{ approvalType, approvalAttachment, approvalComplete }} />;
            case '스케줄 정정':
                return <EditScheduleCom data={{ approvalType, approvalAttachment, approvalComplete }} />;
            case '연차 신청':
                return <AnnualCom data={{ approvalType, approvalAttachment, approvalComplete }} />;
            case '퇴직 신청':
                return <RetiredmentCom data={{ approvalType, approvalAttachment, approvalComplete }} />;
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
                                                            <span>
                                                                {approvalType?.approval?.approvalMember?.memName}
                                                            </span>
                                                        </div>
                                                        <div id='manager-btn'>
                                                            결재자<button id='tree-btn'>조직도</button>
                                                        </div>
                                                        <div className='payment-manager1'>
                                                            <div>
                                                                <span>
                                                                    {approvalComplete[0]?.approvalMember?.memName}
                                                                </span>
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
