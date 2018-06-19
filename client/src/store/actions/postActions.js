import axios from 'axios';
import { GET_POSTS, SET_POSTS_LOADING } from './actionTypes';

export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('/api/posts')
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};

export const setPostsLoading = () => {
  return {
    type: SET_POSTS_LOADING
  };
};
