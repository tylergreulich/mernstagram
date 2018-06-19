import {
  SET_PROFILE_LOADING,
  GET_FOLLOWING_FEED,
  GET_USER_POST_INFO
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  profile: {},
  postInfo: [],
  profiles: []
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWING_FEED:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case GET_USER_POST_INFO:
      return {
        ...state,
        postInfo: action.payload
      };

    case SET_PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

export default profileReducer;
