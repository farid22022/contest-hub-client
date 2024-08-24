import {  useEffect, useState } from "react";
import Contest from "./Contest";
import { FiSearch } from "react-icons/fi";
import useContest from "../../../Hooks/useContest";
import useContestUsers from "../../../Hooks/useContestUsers";
import useAuth from "../../../Hooks/useAuth";
import usePersonalDetails from "../../../Hooks/usePersonalDetails";
import './styles.css'
import { AuthContext } from "../../../providers/AuthProvider";
import { motion } from "framer-motion";
const ArrayOfContests = () => {
    const [ personalDetails ] = usePersonalDetails();
    console.log(personalDetails);
    const { user } = useAuth();
    console.log(user?.email);
    const LoggedUser = user?.email;
    console.log(LoggedUser);
    const [userAccess, setUserAccess ] = useState(false);
    const [contests] = useContest();
    const [searchInput, setSearchInput] = useState("");  // State for search input
    const [filteredContests, setFilteredContests] = useState([]);  // State for filtered contests = 
    const {
        isClicked} = useContest(AuthContext)

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

    // setFilteredContests(contests);
    

    //   useEffect(() => {
        // if (personalDetails.length > 0) {
        //     let userHasAccess = personalDetails.some(aUser => aUser.email === user?.email);
        //     setAccess(userHasAccess);
        //     console.log('access', userHasAccess);
        // }
    // }, [personalDetails,setAccess,user]);
    useEffect( () =>{
        if(personalDetails.length > 0){
            personalDetails.map(personalDetail => {
                console.log(personalDetail, personalDetail.access,personalDetail.email,LoggedUser)
                if(personalDetail.email === LoggedUser && personalDetail.access){
                    setUserAccess(true)
                    console.log(userAccess);
                    return;
                }
            })
        }
    },[])
      
    if(contests.length == 0)
        return(
    //  <span className="loading loading-spinner text-error pt-24 mt-48 w-24 lg:ml-96 pl-4 text-6xl">No Internet</span>
        <progress className="loader progress w-56"></progress>
    )

    
    // console.log(contests);
    const handleSearch = () => {
        setFilteredContests([])
        const searchedContests = contests.filter(contest => contest.tag === searchInput);
        setFilteredContests(searchedContests);
        console.log(filteredContests);
        
    };

    let reversedArray=[...filteredContests].reverse()
    console.log('ArrayOfContests1',isClicked)

    return (
        
        <div className={`fixedImage bg-fixed mt-12 ${isClicked ?'blur-xl':''}`}>
            <div>
                <motion.div className="inline-block mt-16 mb-12 "
                    initial={{x:'100vw'}}
                    animate={{x:'10vw'}}
                    transition={{type:'spring',duration:2.5 , stiffness:300}}
                >
                    <input 
                        type="text"
                        placeholder="tag"
                        required
                        value={searchInput}  // Bind input value to searchInput state
                        onChange={(e) => setSearchInput(e.target.value)}  // Update state on input change
                        className=" p-2 rounded-l-2xl bg-yellow-100 text-xl"
                    />
                    <button 
                        className="text-xl bg-slate-500 rounded-l-2xl p-2"
                        onClick={handleSearch}  // Call handleSearch on button click
                    >
                        
                        <h2><FiSearch className="text-xs inline-flex "/>Search</h2>
                    </button>
                </motion.div>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-3 space-y-6 mb-12 pb-12 p-4">
                {
                    reversedArray
                    .filter(contest => contest.accepted)
                    .map((contest, key) => {
                        let initialPosition = {};

                        if ((key%3) === 0 ) {
                            initialPosition = { x: '-100vw' ,opacity:5};  // Slide in from the left
                        } 
                        else if ((key%3) === 1) {
                            initialPosition = { y: '100vh' , opacity:5};  // Slide in from the top
                        } 
                        else if ((key%3) === 2) {
                            initialPosition = { x: '100vw' , opacity:5};   // Slide in from the right
                        }

                        return (
                            <motion.div
                                key={contest._id}
                                initial={initialPosition}
                                animate={{ x: 0, y: 0 , opacity:95}}
                                transition={{ type: 'spring', stiffness: 200, delay: 1.1 * key }}
                            >
                                <Contest
                                    contest={contest}
                                    transformedContests={transformedContests}
                                    LoggedUser={LoggedUser}
                                    userAccess={userAccess}
                                />
                            </motion.div>
                        );
                    })
                }
            </div>
        </div>
        
    );
};
export default ArrayOfContests;
