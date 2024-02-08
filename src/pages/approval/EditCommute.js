import '../../@core/vendor/css/core.css';
import './approval.css';
import '../../@core/vendor/css/themeDefault.css';
import '../../@core/css/demo.css';
import '../../@core/css/pay.css';
import '../../@core/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import '../../@core/vendor/libs/apex-charts/apex-charts.css';
import '../../@core/css/payment-annual.css';

function EditCommute() {
    return (
        <>
            <div>
                제목<span style={{ color: 'red' }}> *</span> <input type='text' id='input-name' />
            </div>
            <div id='margintop'>
                <div>
                    신청구분<span style={{ color: 'red' }}> *</span>
                    <select name='annual-type' id='annual-type' style={{ marginLeft: '10px', width: '77%' }}>
                        <option value='0'>--선택--</option>
                        <option value='1'>퇴근시간</option>
                        <option value='2'>출근시간</option>
                        <option value='3'>결근</option>
                    </select>
                </div>
                <div>
                    정정일<span style={{ color: 'red' }}> *</span>
                    <input type='date' id='annual-date' />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label for='basic-default-message'>
                        내용<span style={{ color: 'red' }}>*</span>
                    </label>
                    <textarea
                        id='annual-content'
                        placeholder='내용을 작성해주세요.'
                        style={{
                            height: '200px',
                            width: '80%',
                            marginLeft: '20px',
                        }}
                    ></textarea>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label for='formFileMultiple' class='form-label'>
                        파일첨부
                    </label>

                    <div
                        class='input-group'
                        style={{
                            marginLeft: '20px',
                            width: '80%',
                            paddingBottom: '45px',
                        }}
                    >
                        <input
                            type='file'
                            class='form-control'
                            id='inputGroupFile02'
                            style={{
                                width: '70%',
                                height: '30px',
                                paddingBottom: '30px',
                            }}
                        />
                        <label class='input-group-text' for='inputGroupFile02' style={{ height: '31.5px' }}>
                            Upload
                        </label>
                    </div>
                </div>
            </div>
            <hr />
            <div id='last-thing'>
                <div
                    class='btn btn-danger'
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
                <button type='button' class='btn btn-primary' id='complete-payment1'>
                    작성 완료
                </button>
            </div>
        </>
    );
}

export default EditCommute;