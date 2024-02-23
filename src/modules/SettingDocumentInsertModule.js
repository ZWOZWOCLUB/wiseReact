import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_DOCUMENT_FILE = "settingMember/POST_DOCUMENT_FILE";

const actions = createActions({
  [POST_DOCUMENT_FILE]: () => {},
});

const settingDocumentInsertReducer = handleActions(
  {
    [POST_DOCUMENT_FILE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default settingDocumentInsertReducer;
