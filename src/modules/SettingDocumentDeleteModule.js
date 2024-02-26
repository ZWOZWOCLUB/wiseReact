import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_DOCUMENT_FILE = "settingMember/POST_DOCUMENT_FILE";
export const PUT_DOCUMENT_FILE = "settingMember/PUT_DOCUMENT_FILE";
export const DELETE_DOCUMENT_FILE = "settingMember/DELETE_DOCUMENT_FILE";

const actions = createActions({
  [DELETE_DOCUMENT_FILE]: () => {},
});

const settingDocumentDeleteReducer = handleActions(
  {
    [DELETE_DOCUMENT_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingDocumentDeleteReducer;
