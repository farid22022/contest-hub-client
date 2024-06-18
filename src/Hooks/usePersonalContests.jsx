import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const usePersonalContests = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic();
    const { data : contests=[], refetch} = useQuery({
        queryKey:['contests', user.email],
        queryFn: async() =>{
            const res = await axiosPublic.get(`/contest/${user.email}`);
            console.log(res.data);
            return res.data;
        }
        
    })
    return [contests,refetch]

    
};

export default usePersonalContests;