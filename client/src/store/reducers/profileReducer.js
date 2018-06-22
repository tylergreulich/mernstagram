import {
  SET_PROFILE_LOADING,
  GET_USER_POST_INFO,
  GET_PROFILE,
  GET_PROFILES,
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  profile: {},
  errors: {},
  profileMetrics: [],
  profiles: []
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profileMetrics: action.payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case FOLLOW_PROFILE:
      return {
        ...state,
        profileMetrics: {
          ...state.profileMetrics,
          followers: [action.payload, ...state.profileMetrics.followers]
        }
      };

    case UNFOLLOW_PROFILE:
      return {
        ...state,
        profileMetrics: {
          ...state.profileMetrics,
          followers: state.profileMetrics.followers.filter(
            follower => follower.user !== action.payload
          )
        }
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
