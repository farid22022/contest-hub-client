import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://contest-hub-server-alpha.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;