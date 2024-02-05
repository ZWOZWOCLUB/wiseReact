import rootReducer from './modules';
<<<<<<< HEAD
import { composeWithDevTools } from 'redux-devtools-extension';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default store;
=======
import { composeWithDevTools} from 'redux-devtools-extension';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
>>>>>>> 5a7ed0bbbd8664fe0b1e0a4a614fcaaeb90a6f36
