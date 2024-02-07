import payReducer from './PayModule';
import otherReducer from './OtherModule'
import settingReducer from './SettingModule'

const { combineReducers } = require("redux");

// 사용할 리듀서들을 여기서 모아놓고 사용합니다.

const rootReducer = combineReducers({
    payReducer,
    otherReducer,
    settingReducer

});

export default rootReducer;