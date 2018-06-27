import axios from 'axios';
import setAuthToken from '../../utilities/setAuthToken';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER, GET_ERRORS } from './actionTypes';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post(
      'https://stormy-bastion-24844.herokuapp.com/api/accounts/register',
      userData
    )
    .then(res => history.push('/login'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const loginUser = userData => dispatch => {
  axios
    .post(
      'https://stormy-bastion-24844.herokuapp.com/api/accounts/login',
      userData
    )
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
