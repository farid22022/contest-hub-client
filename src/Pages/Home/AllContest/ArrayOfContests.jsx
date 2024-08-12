import {  useContext, useEffect, useState } from "react";
import Contest from "./Contest";
import { FiSearch } from "react-icons/fi";
import useContest from "../../../Hooks/useContest";
import useContestUsers from "../../../Hooks/useContestUsers";
import useAuth from "../../../Hooks/useAuth";
import usePersonalDetails from "../../../Hooks/usePersonalDetails";
import './styles.css'
import moment from 'moment';
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";

export const currentTime = moment().format("dddd, MMMM D, YYYY");

const ArrayOfContests = () => {
    const {bannerSearchedItems,isClicked} = useContext(AuthContext);
    // const [contests, setContests] = useState([]);
    const [ personalDetails ] = usePersonalDetails();
//   console.log(personalDetails);
    const { user } = useAuth();
    // console.log(user?.email);
    const LoggedUser = user?.email;
    // console.log(LoggedUser);
    const [userAccess, setUserAccess ] = useState(false);
    const [contests] = useContest();
    // const [searchInput, setSearchInput] = useState("");  // State for search input
    const [newContests, setNewContests] = useState([]);  // State for filtered contests

    const [submittedContests] = useContestUsers();
    const transformedContests = submittedContests.map(contest => {
        const { name, createdEmail, submittedEmail, submittedName, winner } = contest;
        return { name, createdEmail, submittedEmail, submittedName, winner };
    });

    
    
    // useEffect(() => {
    //     setFilteredContests(contests).reverse();
    //   }, [contests]);

       
    // setFilteredContests(contests);
    // setNewContests(contests);
      

    
    useEffect( () =>{
        if(personalDetails.length > 0){
            personalDetails.map(personalDetail => {
                if(personalDetail.email === LoggedUser && personalDetail.access){
                    setUserAccess(true)
                    return;
                }
            })
        }
    })
    
    if(contests.length == 0)
        return(
        <progress className=" progress w-56">No Internet</progress>
    )

    
    let reversedArray=[...bannerSearchedItems]
    if(bannerSearchedItems.length === 0){
        reversedArray = contests;
    }
    let finalArrayOfContest = [...reversedArray].reverse();
    
    return (
        <div className={` mt-16 shadow-2xl shadow-slate-600 border-opacity-20 border-emerald-50 ${isClicked ? 'blur-xl':''} transition-all duration-1000`}>
            
            
            <div className="fixedImageHome bg-fixed pt-12  shadow-black shadow-2xl ">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-6 space-y-6 pb-12">
                {
                    finalArrayOfContest
                        .filter(contest=>contest.accepted)
                        .slice(0,5)
                        .map(contest => (
                            <Contest
                                key={contest._id}
                                contest={contest}
                                transformedContests={transformedContests}
                                LoggedUser={LoggedUser}
                                userAccess={userAccess}
                                className=""
                            ></Contest>
                    ))
                }
                </div>
                <div className="text-center mt-6 pb-8">
                    <Link to="/allContests"><button>See More</button></Link>
                </div>
            </div>
            
        </div>
    );
};
export default ArrayOfContests;
