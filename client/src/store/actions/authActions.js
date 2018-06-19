import axios from 'axios';
import { SET_CURRENT_USER, GET_ERRORS } from './actionTypes';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/accounts/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
