import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const usePersonalDetails = () => {
    const axiosPublic = useAxiosPublic()
    const { data : personalDetails=[], refetch } = useQuery({
        queryKey:'personalDetails',
        queryFn: async () =>{
            const res = await axiosPublic.get('/personalDetails');
            console.log(res.data)
            return res.data
        }
    })
    return [personalDetails, refetch]
};

export default usePersonalDetails;