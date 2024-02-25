import { GET_PROXY_INFO, POST_ATTENDANCE_START, PUT_ATTENDANCE_END } from '../modules/AttendanceMoudle';

export const attendanceStartAPICalls = ({ start }) => {
    console.log('on', start);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/attendance/on`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(start),
        }).then((response) => response.json());
        console.log('on result', result);

        dispatch({ type: POST_ATTENDANCE_START, payload: result });
    };
};

export const attendanceEndAPICalls = ({ start }) => {
    console.log('off', start);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/attendance/off`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(start),
        }).then((response) => response.json());
        console.log('off result', result);

        dispatch({ type: PUT_ATTENDANCE_END, payload: result });
    };
};

export const callProxyAPI = ({ form }) => {
    console.log('porxyForm', form);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/attendance/${form?.memCode}/proxy/${form?.date}`;

    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('proxy result ', result);

            dispatch({ type: GET_PROXY_INFO, payload: result });
        } catch (error) {
            console.error('Error fetching proxy data:', error);
        }
    };
};
