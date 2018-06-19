import {
  SET_PROFILE_LOADING,
  GET_FOLLOWING_FEED
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  profile: {},
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
