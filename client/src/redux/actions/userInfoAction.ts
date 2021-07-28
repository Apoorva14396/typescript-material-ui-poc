import { SET_USER_INFO } from './types';

export const setUserInfo = (val: any) => ({
  type: SET_USER_INFO,
  val: val
});
