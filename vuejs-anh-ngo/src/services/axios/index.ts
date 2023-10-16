import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import router from '../../router';

/* The code is creating an instance of the Axios library with specific configurations. */
const axiosLoginInstance = axios.create({
  baseURL: import.meta.env.VITE_LOGIN_BASE_URL,
  responseType: 'json',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_BASE_URL,
  responseType: 'json',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

const onRequest = (config: InternalAxiosRequestConfig<any>) => {
  // TODO: do something with config before sending
  // const auth = getCookie(Authenticate.AUTH);
  // config.timeout = 10000;
  // if (auth) {
  //   config.headers = {
  //     Authorization: 'Bearer ' + auth,
  //     'x-api-key': keyHearder,
  //   };
  //   if (config.params) {
  //     config.paramsSerializer = {
  //       serialize: (params: Record<string, any>) =>
  //         queryString.stringify(params),
  //     };
  //   }
  // }
  return config;
};

const onResponseSuccess = (response: AxiosResponse) => {
  return response;
};

const onResponseError = (error: AxiosError) => {
  if (error.response?.status === 404) {
    return router.push('/404');
  } else if (
    error.response?.status !== 401
    // || error.config?.url?.includes(authUrl)
  ) {
    const errMessage = error.response?.data || error?.response || error;
    return Promise.reject(errMessage);
  }
  // TODO: handle refresh token
  // return refreshToken(error, onUnauthenticated);
};

axiosLoginInstance.interceptors.request.use(onRequest);
axiosLoginInstance.interceptors.response.use(
  onResponseSuccess,
  onResponseError,
);

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onResponseSuccess, onResponseError);

export { axiosInstance, axiosLoginInstance };
