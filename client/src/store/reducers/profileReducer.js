import {
  SET_PROFILE_LOADING,
  GET_FOLLOWING_FEED,
  GET_USER_POST_INFO,
  GET_PROFILE,
  FOLLOW_PROFILE
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  profile: {},
  profileMetrics: [],
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

    case GET_PROFILE:
      return {
        ...state,
        profileMetrics: action.payload,
        loading: false
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
