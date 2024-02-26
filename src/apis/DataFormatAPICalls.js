import { GET_DATAFORMAT_ALL, PUT_DATAFORMAT_DELETE } from '../modules/DataFormatModule';
import { POST_DATAFORMAT_DATA  } from '../modules/DataFormatInsertModule';

export const callAllViewDataFormatAPI = ({ currentPage }) => {
    console.log('[callDataFormatAPI] callDataFormatAPI');
    console.log(currentPage);
    let requestURL;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/dataFormat/allData?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/dataFormat/allData`;
    }

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                // Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callAllViewDataFormatAPI] Result : ', result);
        if (result.status === 200) {
            console.log('[callAllViewDataFormatAPI] SUCCESS');
            dispatch({ type: GET_DATAFORMAT_ALL, payload: result.data });
        }
    };
};

export const callDataFormatInsertAPI = (formData) => {
    // 파라미터에서 중괄호 제거
    console.log('callDataFormatInsertAPI Call');
    console.log('callDataFormatInsertAPI formData', formData);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/dataFormat/data`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const result = await response.json();
            console.log('callDataFormatInsertAPI RESULT : ', result);

            dispatch({ type: POST_DATAFORMAT_DATA, payload: result.data });
            console.log({ result });
        } catch (error) {
            console.error('Error occurred while uploading file:', error);
            // Handle error, dispatch an action, show an alert, etc.
        }
    };
};
export const callDtaFormatDeleteAPI = (form) => {
    console.log('callDtaFormatDeleteAPI Call');
    console.log('callDtaFormatDeleteAPI', form.dataCode);
    // console.log('callDtaFormatDeleteAPI', form.get('notDeleteStatus'));

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/dataFormat/deleteData`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',//컨텐츠타입 확인 (문자열 형식만 날라감 (파일X)) => 백에서 값이 올때 값의 형태확인
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(form), //문자열형태로 바꿔서 백으로 전달
                                        //(백)모델어트리뷰트는 문자열형태를 받을 수 없다 그래서 리퀘스트바디로 수정
        }).then((response) => response.json());

        console.log('callNoticeUpdateAPI : ', result);

        dispatch({ type: PUT_DATAFORMAT_DELETE, payload: result });
    };
};
