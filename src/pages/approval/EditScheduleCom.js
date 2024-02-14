function EditScheduleCom(data) {
    return (
        <>
            <div>
                제목<span style={{ color: 'red' }}> *</span> <input type='text' id='input-name' name='payName' />
            </div>
            <div id='margintop'>
                <div>
                    정정일<span style={{ color: 'red' }}> *</span>
                    <input
                        name='eshOffStartDate'
                        type='date'
                        id='annual-date'
                        style={{
                            marginLeft: '10px',
                            marginRight: '10px',
                            width: '36%',
                        }}
                    />
                    <span> ~ </span>
                    <input
                        name='eshOffEndDate'
                        type='date'
                        id='annual-date'
                        style={{ marginLeft: '10px', width: '36%' }}
                    />
                </div>
                <div>
                    근무일<span style={{ color: 'red' }}> *</span>
                    <input
                        name='eshStartDate'
                        type='date'
                        id='annual-date'
                        style={{
                            marginLeft: '10px',
                            marginRight: '10px',
                            width: '36%',
                        }}
                    />
                    <span> ~ </span>
                    <input
                        type='date'
                        name='eshEndDate'
                        id='annual-date'
                        style={{ marginLeft: '10px', width: '36%' }}
                    />
                </div>
                <div>
                    근무 시간<span style={{ color: 'red' }}> *</span>{' '}
                    <select name='eshDateType' style={{ width: '75%', marginLeft: '10px' }}>
                        <option value='0'> -- 선택 -- </option>
                        <option value='Day'> 07:00 ~ 15:00 </option>
                        <option value='Night'> 23:00 ~ 07:00 </option>
                        <option value='Evening'> 15:00 ~ 23:00 </option>
                    </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor='basic-default-message'>
                        내용<span style={{ color: 'red' }}> *</span>
                    </label>
                    <textarea
                        name='eshContents'
                        id='annual-content'
                        placeholder='내용을 작성해주세요.'
                        style={{
                            height: '150px',
                            width: '80%',
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
                            name='approvalFile'
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

export default EditScheduleCom;
