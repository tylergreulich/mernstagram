import axios from 'axios';
import {
  GET_FOLLOWING_FEED,
  GET_ERRORS,
  SET_PROFILE_LOADING
} from './actionTypes';

export const getFollowingFeed = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/accounts')
    .then(res => dispatch({ type: GET_FOLLOWING_FEED, payload: res.data }))
    .catch(err => dispatch({ type: GET_FOLLOWING_FEED, payload: null }));
};

export const setProfileLoading = () => {
  return {
    type: SET_PROFILE_LOADING
  };
};
