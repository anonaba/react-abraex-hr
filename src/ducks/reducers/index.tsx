import { combineReducers } from 'redux';
import UserReducers from './UserReducers';

export default combineReducers({
    user: UserReducers
})