import {  useEffect, useState } from "react";
import Contest from "./Contest";
import { FiSearch } from "react-icons/fi";
import useContest from "../../../Hooks/useContest";
import useContestUsers from "../../../Hooks/useContestUsers";
import useAuth from "../../../Hooks/useAuth";

const ArrayOfContests = () => {
    // const [contests, setContests] = useState([]);
    const { user } = useAuth();
    console.log(user?.email);
    const LoggedUser = user?.email;
    const [contests] = useContest();
    const [searchInput, setSearchInput] = useState("");  // State for search input
    const [filteredContests, setFilteredContests] = useState([]);  // State for filtered contests

    const [submittedContests] = useContestUsers();
    console.log(submittedContests);
    const transformedContests = submittedContests.map(contest => {
        const { name, createdEmail, submittedEmail, submittedName, winner } = contest;
        return { name, createdEmail, submittedEmail, submittedName, winner };
    });
    
    console.log(transformedContests);
    useEffect(() => {
        setFilteredContests(contests);
      }, [contests]);

    if(contests.length == 0)
        return(
    //  <span className="loading loading-spinner text-error pt-24 mt-48 w-24 lg:ml-96 pl-4 text-6xl">No Internet</span>
        <progress className="progress w-56"></progress>
    )

    
    // console.log(contests);
    const handleSearch = () => {
        setFilteredContests([])
        const searchedContests = contests.filter(contest => contest.tag === searchInput);
        setFilteredContests(searchedContests);
        console.log(filteredContests);
        
    };

    return (
        <div className="mt-12">
            <div>
                <div className="inline-block mt-12 mb-12">
                    <input 
                        type="text"
                        placeholder="tag"
                        required
                        value={searchInput}  // Bind input value to searchInput state
                        onChange={(e) => setSearchInput(e.target.value)}  // Update state on input change
                        className="p-4 pt-7 pb-2 rounded-l-2xl bg-yellow-100 text-xl"
                    />
                    <button 
                        className="text-xl bg-slate-500 rounded-r-2xl p-2 pl-8"
                        onClick={handleSearch}  // Call handleSearch on button click
                    >
                        <FiSearch />
                        <h2>Search</h2>
                    </button>
                </div>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-3 space-y-4">
                {
                    filteredContests.map(contest => (
                        <Contest
                            key={contest._id}
                            contest={contest}
                            transformedContests={transformedContests}
                            LoggedUser={LoggedUser}
                        ></Contest>
                    ))
                }
            </div>
        </div>
    );
};
export default ArrayOfContests;
