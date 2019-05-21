import { combineReducers } from 'redux';

import tableReducer from './reducer';
import loginReducer from './loginreducer';

export default combineReducers({
  tableReducer,
  loginReducer,
});
