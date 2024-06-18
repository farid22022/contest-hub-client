import useContest from "../../Hooks/useContest";
import Contest from "../Home/AllContest/Contest";


const AllContest = () => {

    const [contests, loading] = useContest();

    if(loading)
        return(
     <span className="loading loading-spinner text-error pt-24 mt-48 w-24 text-center items-center"></span>
    )
    
    return (
        <div className="text-center">
            <h2 className="pt-24 text-2xl font-bold text-blue-900 mb-12 ">All Contest will appear hear : {contests.length}</h2>
            <div>
                {
                    contests.map(contest => (
                        <Contest
                            key={contest._id}
                            contest={contest}
                        ></Contest>
                    ))
                }
            </div>
        </div>
    );
};

export default AllContest;