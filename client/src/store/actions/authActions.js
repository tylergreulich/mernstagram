import axios from 'axios';
import { REGISTER_USER } from './actionTypes';

export const registerUser = userData => dispatch => {
  axios
    .post('/api/accounts/register')
    .then(res => dispatch({ type: REGISTER_USER, payload: userData }))
    .catch(err => console.log(err));
};
