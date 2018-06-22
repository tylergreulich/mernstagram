import axios from 'axios';
import {
  GET_POSTS,
  SET_POSTS_LOADING,
  GET_ERRORS,
  UPLOAD_POST
} from './actionTypes';

export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('/api/posts')
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};

export const uploadPost = postData => dispatch => {
  axios
    .post('/api/posts/', postData)
    .then(res => dispatch({ type: UPLOAD_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const setPostsLoading = () => {
  return {
    type: SET_POSTS_LOADING
  };
};
