import { combineReducers } from 'redux';

import { reducers as navigation } from './navigation/index';

const rootReducer = combineReducers({
  navigation,
});

export default rootReducer;
