import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useWinner = () => {
    const axiosPublic = useAxiosPublic()
    const { data : winners=[], refetch } = useQuery({
        queryKey:'winners',
        queryFn: async () =>{
            const res = await axiosPublic.get('/winnerDetails');
            console.log(res.data)
            return res.data
        }
    })
    return [winners, refetch]
};

export default useWinner;