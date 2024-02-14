function EditCommuteCom(data) {
    return (
        <>
            <div>
                제목<span style={{ color: 'red' }}> *</span> <input type='text' id='input-name' name='payName' />
            </div>
            <div id='margintop'>
                <div>
                    신청구분<span style={{ color: 'red' }}> *</span>
                    <select name='ediKind' id='annual-type' style={{ marginLeft: '10px', width: '77%' }}>
                        <option value='0'>--선택--</option>
                        <option value='퇴근시간'>퇴근시간</option>
                        <option value='출근시간'>출근시간</option>
                        <option value='결근(근무)'>결근(근무)</option>
                        <option value='결근(지각)'>결근(지각)</option>
                        <option value='결근(조퇴)'>결근(조퇴)</option>
                    </select>
                </div>
                <div>
                    정정일 / 시간<span style={{ color: 'red' }}> *</span>
                    <input type='date' id='annual-date' name='ediDate' />
                    <input type='time' id='annual-time' name='ediTime2' />
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
                        name='ediContents'
                    ></textarea>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label for='formFileMultiple' className='form-label'>
                        파일첨부
                    </label>

                    <div
                        className='input-group'
                        style={{
                            marginLeft: '20px',
                            width: '80%',
                            paddingBottom: '45px',
                        }}
                    >
                        <input
                            type='file'
                            className='form-control'
                            id='inputGroupFile02'
                            style={{
                                width: '70%',
                                height: '30px',
                                paddingBottom: '30px',
                            }}
                            name='approvalFile'
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                        />
                    </div>
                </div>
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

export default EditCommuteCom;
