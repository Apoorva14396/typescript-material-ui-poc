import axios from 'axios';
import { API_URL } from '../urls.json';

export const connection = axios.create({
  baseURL: API_URL,
  timeout: 30000
});
