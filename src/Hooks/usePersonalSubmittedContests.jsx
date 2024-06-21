import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const usePersonalSubmittedContests = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const { data : PersonalSubmittedContests = [], refetch } = useQuery({
        queryKey: ['PersonalSubmittedContests', user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get('/submits');
            console.log(res.data);
            const contests = res.data;
            const submittedContests = contests.filter(contest => contest.createdEmail === user.email)
            console.log(submittedContests);
            return submittedContests;
            
        } 
    })
    return [PersonalSubmittedContests, refetch];
};

export default usePersonalSubmittedContests;