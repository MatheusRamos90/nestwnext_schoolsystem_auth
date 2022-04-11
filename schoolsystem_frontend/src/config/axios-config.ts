import axios from 'axios';
import { getToken } from '../hooks/cookies';

export const http = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SCHOOL_BACKEND_HOST}:${process.env.NEXT_PUBLIC_SCHOOL_BACKEND_PORT}`
})

http.interceptors.request.use((request: any) => {
    if (typeof window !== 'undefined') {
      return request
    }
    
    const token = getToken()
  
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
    }
  
    return request
  });