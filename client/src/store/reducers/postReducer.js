import {
  GET_POSTS,
  SET_POSTS_LOADING,
  UPLOAD_POST,
  DELETE_POST
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  posts: [],
  post: {}
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case UPLOAD_POST:
      return {
        ...state,
        post: action.payload
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };

    case SET_POSTS_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

export default postReducer;
