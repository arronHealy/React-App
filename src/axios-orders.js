import axios from 'axios';

import httpUrls from './http-urls';

const axiosInstance = axios.create({
    baseURL: httpUrls.baseURL
});

export default axiosInstance;