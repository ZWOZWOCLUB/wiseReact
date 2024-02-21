import { GET_ATTENDANCE_DATE_INFO } from '../modules/AttendanceMoudle';

export const searchAttendanceDateInfoAPICalls = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/attendance/searchdate/${form.memCode}/date/${form.searchDate}`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        if (result?.status === 200) {
            dispatch({ type: GET_ATTENDANCE_DATE_INFO, payload: result?.data });
        }
    };
};
