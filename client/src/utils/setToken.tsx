import { connection } from '../lib/axiosInstance';

export const setToken = () => {
  const item: any = localStorage.getItem('user');
  const token = item ? JSON.parse(item) : null;
  connection.defaults.headers.authorization = token.loginToken;
};
