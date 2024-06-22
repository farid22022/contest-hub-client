import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://contest-hub-server-alpha.vercel.app'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useAuth();
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('request stopped by interceptor ', token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },function(error) {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(function(response){
        return response;
    },async(error) =>{
        console.log('Status error in the interceptor ',error);
        if(error.response.status === 401 || error.response.status === 403){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;