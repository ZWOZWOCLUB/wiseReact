import { GET_DATAFORMAT_ALL, POST_DATAFORMAT_DATA } from '../modules/DataFormatModule';

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

// export const callDataFormatInsertAPI = ({ form }) => {
//     console.log('callDataFormatInsertAPI Call');
//     console.log('callDataFormatInsertAPI form', form);
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/dataFomat/data`;
//     console.log('callDataFormatInsertAPI form', form);

//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL, {
//             method: 'POST',
//             headers: {
//                 Accept: '*/*',
//                 Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
//             },
//             body: form,
//         }).then((response) => response.json());

//         console.log('callDataFormatInsertAPI RESULT : ', result);

//         dispatch({ type: POST_DATAFORMAT_DATA, payload: result.data });
//         console.log({ result });
//     };

// };
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

