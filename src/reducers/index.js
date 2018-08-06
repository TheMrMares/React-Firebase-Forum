import { combineReducers } from 'redux';

import testReducer from './testReducer';
import authReducer from './authReducer';
import dataReducer from './dataReducer';

export default combineReducers({ 
    tests: testReducer,
    auths: authReducer,
    data: dataReducer
});