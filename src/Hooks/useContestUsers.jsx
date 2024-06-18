import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useContestUsers = ({name}) => {
    const axiosPublic = useAxiosPublic();
    const { data : contest=[], refetch} = useQuery({
        queryKey: ['contest', name],
        queryFn: async() =>{
            const res = await axiosPublic.get('/submits');
            return res.data;
        }
    })
    return [contest, refetch]
};

export default useContestUsers;