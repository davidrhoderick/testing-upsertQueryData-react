import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  (
    { baseUrl } = { baseUrl: '/' }
  ) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const reqError = axiosError;

      return {
        error: {
          status: reqError.response?.status ? reqError.response.status : 500,
          data: reqError.response?.data ? reqError.response.data : reqError,
        },
      };
    }
  };

export const api = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'https://api.instantwebtools.net/v1/' }),
  reducerPath: 'api',
  endpoints: () => ({}),
});
