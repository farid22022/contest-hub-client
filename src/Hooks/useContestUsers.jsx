import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useContestUsers = () => {
    const axiosPublic = useAxiosPublic();
    const { data : SubmittedContests=[], refetch} = useQuery({
        queryKey: ['SubmittedContests'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/submits');
            return res.data;
        }
    })
    return [SubmittedContests, refetch]
};

export default useContestUsers;