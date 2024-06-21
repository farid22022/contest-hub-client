import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useSubmittedContests = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data : submittedContests=[], refetch} = useQuery({
        queryKey: ['contests'],
        queryFn: async() =>{
            const res = await axiosPublic.get(`/contests`);
            const contests = res.data;
            const filteredSubmittedContests = contests.filter(contest => contest.createdEmail === user.email)
            console.log(res.data)
            console.log(submittedContests)
            return filteredSubmittedContests;
        }
    })
    return [submittedContests, refetch]
};

export default useSubmittedContests;