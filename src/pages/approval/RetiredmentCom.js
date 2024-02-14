function RetiredmentCom(data) {
    return (
        <>
            <div id='re-div'>
                <div id='top-section'>
                    <span style={{ height: '50px' }}>퇴직 준비 확인</span>
                    <input type='checkbox' style={{ marginBottom: '50px' }}></input>
                </div>
                <div id='bottom-section'>
                    <span>퇴직 절차에 관한 안내와 서류 결재처리가 완료되었나요?</span>
                    <br />
                    <span>입사시 받은 물품 반납 및 휴가, 미결재 문서 처리 등</span>
                </div>
            </div>
            <div id='margintop'>
                <div>
                    퇴직일<span style={{ color: 'red' }}> *</span>
                    <input
                        name='tirDate'
                        type='date'
                        id='annual-date'
                        style={{
                            marginLeft: '10px',
                            marginRight: '10px',
                            width: '80%',
                        }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor='basic-default-message'>
                        내용<span style={{ color: 'red' }}> *</span>
                    </label>
                    <textarea
                        name='tirContents'
                        id='annual-content'
                        placeholder='퇴직 사유을 작성해주세요.'
                        style={{
                            height: '100px',
                            width: '82%',
                            marginLeft: '20px',
                        }}
                    ></textarea>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor='formFileMultiple' className='form-label'>
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
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            type='file'
                            className='form-control'
                            id='inputGroupFile02'
                            style={{
                                width: '70%',
                                height: '30px',
                                paddingBottom: '30px',
                            }}
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

export default RetiredmentCom;
