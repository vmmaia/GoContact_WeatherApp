import { combineReducers } from 'redux';

import searchReducer from './search-reducer';
import weatherReducer from './weather-reducer';

export default combineReducers({
  search: searchReducer,
  weather: weatherReducer
});
