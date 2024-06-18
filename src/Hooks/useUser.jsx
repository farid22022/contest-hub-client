import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUser = (name) => {
    const axiosPublic = useAxiosPublic();
    const { data : count = [], refetch} = useQuery({
        queryKey:['count', name],
        queryFn: async() =>{
            const res = await axiosPublic.get(`/submits?name=${name}`);
            // console.log(res);
            const allData = res.data;
            // console.log(allData);
            // console.log(name);
            const filteredData = allData.filter(contest => contest.name === name); // Filter based on the `name` parameter
            // console.log(filteredData); // Log the filtered data for debugging
            return filteredData; // Return the length of the filtered array

            
        }
    })
    return [count, refetch]
    
};

export default useUser;