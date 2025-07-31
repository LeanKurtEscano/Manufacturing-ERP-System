import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import { userAuth } from "../services/token/token";


const useTokenHandler = () => {
  const { setIsAuthenticated } = useProfile();
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
       

        const isAuthenticated = await userAuth();

        if (isAuthenticated) {
          setIsAuthenticated(true);
        } 
        
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("access_token");
        setIsAuthenticated(false);
      
      } finally {
        setLoading(false); 
      }
    };

    checkAuth();
  }, [setIsAuthenticated, navigate]);

  return loading; 
};

export default useTokenHandler;