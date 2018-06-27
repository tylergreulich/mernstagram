import axios from 'axios';
import {
  GET_POSTS,
  SET_POSTS_LOADING,
  GET_ERRORS,
  UPLOAD_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
  ADD_COMMENT
} from './actionTypes';

export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('https://frozen-castle-89856.herokuapp.com/api/posts')
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};

export const uploadPost = fd => dispatch => {
  axios
    .post('https://frozen-castle-89856.herokuapp.com/api/posts', fd)
    .then(res => dispatch({ type: UPLOAD_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const deletePost = id => dispatch => {
  axios
    .delete(`https://frozen-castle-89856.herokuapp.com/api/posts/${id}`)
    .then(res => dispatch({ type: DELETE_POST, payload: id }))
    .catch(err => dispatch({ type: DELETE_POST, payload: null }));
};

export const likePost = id => dispatch => {
  axios
    .post(`https://frozen-castle-89856.herokuapp.com/api/posts/${id}/like`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const unLikePost = id => dispatch => {
  axios
    .post(`https://frozen-castle-89856.herokuapp.com/api/posts/${id}/unlike`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const addComment = (id, newComment) => dispatch => {
  axios
    .post(
      `https://frozen-castle-89856.herokuapp.com/api/posts/${id}/comment`,
      newComment
    )
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const setPostsLoading = () => {
  return {
    type: SET_POSTS_LOADING
  };
};
