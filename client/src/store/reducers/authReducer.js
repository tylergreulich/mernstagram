import { SET_CURRENT_USER, GET_FOLLOWING_FEED } from '../actions/actionTypes';
import isEmpty from '../../utilities/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
};

export default authReducer;
