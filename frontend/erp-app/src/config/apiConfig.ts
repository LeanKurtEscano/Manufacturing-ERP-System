import { createApi } from "../utils/axiosInstance";
import { createApiClient } from "../utils/apiClient";


export const rawUserAuthApi = createApi("http://localhost:8080/api/auth");
export const userAuthApi = createApiClient(rawUserAuthApi);

export const rawUserApi = createApi("http://localhost:8080/api/users","access_token");
export const userApi = createApiClient(rawUserApi);