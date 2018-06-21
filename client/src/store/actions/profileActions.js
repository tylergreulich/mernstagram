import axios from 'axios';
import {
  GET_FOLLOWING_FEED,
  GET_ERRORS,
  SET_PROFILE_LOADING,
  GET_PROFILE,
  FOLLOW_PROFILE
} from './actionTypes';

export const getFollowingFeed = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/accounts')
    .then(res => dispatch({ type: GET_FOLLOWING_FEED, payload: res.data }))
    .catch(err => dispatch({ type: GET_FOLLOWING_FEED, payload: null }));
};

export const getProfile = id => dispatch => {
  axios
    .get(`/api/accounts/${id}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: null }));
};

export const followProfile = id => dispatch => {
  axios
    .post(`api/accounts/${id}/follow`)
    .then(res => dispatch({ type: FOLLOW_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const setProfileLoading = () => {
  return {
    type: SET_PROFILE_LOADING
  };
};
