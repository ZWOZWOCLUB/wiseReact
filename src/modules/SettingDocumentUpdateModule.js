import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const PUT_DOCUMENT_FILE = "settingMember/PUT_DOCUMENT_FILE";

const actions = createActions({
  [PUT_DOCUMENT_FILE]: () => {},
});

const settingDocumentUpdateReducer = handleActions(
  {
    [PUT_DOCUMENT_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingDocumentUpdateReducer;
