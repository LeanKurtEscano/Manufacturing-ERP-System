import { jwtDecode } from "jwt-decode";
import { userAuthApi } from "../../config/apiConfig";

const isTokenExpired = (token: string | null) => {
    if (!token) return true;  
    
    try {
        const decoded: { exp: number } = jwtDecode(token);
        return decoded.exp < Date.now() / 1000;
    } catch (error) {
        console.error("Invalid token:", error);
        return true; 
    }
};
const refreshUserToken  = async() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if(!refreshToken) {
        return false
    }


    if(isTokenExpired(refreshToken)) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return false
    }


    try {
        const response =  await userAuthApi.post('/refresh',{
            refresh: refreshToken
        })


        if(response.status === 200) {
            const newAccessToken = response.data.access;
            localStorage.setItem("access_token", newAccessToken);;
            return true

        }

    } catch(error: any) { 
        console.error("Refresh token failed:", error);

        if (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return false;
        }
    }
}


export const userAuth = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem("access_token");
    
    if (!accessToken) return false;

    if (isTokenExpired(accessToken)) {
        return (await refreshUserToken()) ?? false; 
    }

    return true;
};