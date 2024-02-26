import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const PUT_CERTIFICATE = "settingMember/PUT_CERTIFICATE";
export const PUT_CERTIFICATE_FILE = "settingMember/PUT_CERTIFICATE_FILE";

const actions = createActions({
  [PUT_CERTIFICATE]: () => {},
  [PUT_CERTIFICATE_FILE]: () => {},
});

const settingCertificateUpdateReducer = handleActions(
  {
    [PUT_CERTIFICATE]: (state, { payload }) => {
      return payload;
    },
    [PUT_CERTIFICATE_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingCertificateUpdateReducer;
