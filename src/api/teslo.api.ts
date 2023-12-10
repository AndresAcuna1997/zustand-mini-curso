import axios from 'axios';
import { useAuthStore } from '../stores/auth/auth.store';

const tesloApi = axios.create( {
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  }
} );

tesloApi.interceptors.request.use(
  ( config ) => {
    const token = useAuthStore.getState().token;

    if ( token ) {
      config.headers[ 'Authorization' ] = `Bearer ${ token }`;
    }

    return config;
  }
);

export default tesloApi;