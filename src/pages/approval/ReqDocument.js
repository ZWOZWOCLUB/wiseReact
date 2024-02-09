import '../../@core/vendor/css/core.css';
import './approval.css';
import './req-document.css';
import '../../@core/vendor/css/themeDefault.css';
import '../../@core/css/demo.css';
import '../../@core/css/pay.css';
import '../../@core/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import '../../@core/vendor/libs/apex-charts/apex-charts.css';

function ReqDocument() {
    return (
        <>
            <div id='req-document-div'>
                <span style={{ paddingLeft: '50px' }}>종류</span>
                <span style={{ color: 'red', marginRight: '40px' }}>*</span>
                <select name='document' id='req-document'>
                    <option value='0'>--선택--</option>
                    <option value='1'>DB에서 map으로 돌릴거야~~</option>
                </select>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '50px',
                }}
            >
                <label htmlFor='basic-default-message'>
                    내용<span style={{ color: 'red' }}>*</span>
                </label>
                <textarea
                    id='document-contents'
                    placeholder='증명서 용도 및 기간(년) 등 구체적인 내용을 입력해주세요.'
                ></textarea>
            </div>
            <hr />
            <div id='last-thing'>
                <div
                    className='btn btn-danger'
                    id='clean-btn1'
                    style={{
                        width: '20%',
                        boxShadow: '0px 0px 10px #bbbdfc',
                        backgroundColor: '#bbbdfc',
                        borderColor: '#bbbdfc',
                    }}
                >
                    <b>초기화</b>
                </div>
                <button type='button' className='btn btn-primary' id='complete-payment1'>
                    작성 완료
                </button>
            </div>
        </>
    );
}

export default ReqDocument;
