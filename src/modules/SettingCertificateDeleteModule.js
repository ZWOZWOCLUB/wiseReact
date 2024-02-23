import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const DELETE_CERTIFICATE = "settingMember/DELETE_CERTIFICATE";
export const DELETE_CERTIFICATE_FILE = "settingMember/DELETE_CERTIFICATE_FILE";

const actions = createActions({
  [DELETE_CERTIFICATE]: () => {},
  [DELETE_CERTIFICATE_FILE]: () => {},
});

const settingCertificateDeleteReducer = handleActions(
  {
    [DELETE_CERTIFICATE]: (state, { payload }) => {
      return payload;
    },
    [DELETE_CERTIFICATE_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingCertificateDeleteReducer;
