import { SET_USER_INFO } from '../actions/types';

const userInfoReducer = (state = {}, action: any) => {
  switch (action.type) {
    case SET_USER_INFO:
      state = action.val;
      return { ...state };
    default:
      return { ...state };
  }
};

export default userInfoReducer;
