import axios from 'axios';

export const clientApiService = axios.create({
    baseURL: 'http://localhost:8080'
});
