// utils/apiClient.ts
import type { AxiosInstance } from "axios";

export const createApiClient = (axiosInstance: AxiosInstance) => {
  return {
    get: <T = any>(url: string, config = {}) =>
      axiosInstance.get<T>(url, config),

    post: <T = any>(url: string, data?: any, config = {}) =>
      axiosInstance.post<T>(url, data, config),

    put: <T = any>(url: string, data?: any, config = {}) =>
      axiosInstance.put<T>(url, data, config),

    delete: <T = any>(url: string, config = {}) =>
      axiosInstance.delete<T>(url, config),
  };
};
