import payReducer from './PayModule';
import yearReducer from './YearModule'
import settingReducer from './SettingModule'

const { combineReducers } = require("redux");

// 사용할 리듀서들을 여기서 모아놓고 사용합니다.

const rootReducer = combineReducers({
    payReducer,
    yearReducer,
    settingReducer

});

export default rootReducer;