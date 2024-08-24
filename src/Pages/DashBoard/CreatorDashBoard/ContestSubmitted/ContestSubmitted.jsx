// import { Link, useNavigate } from "react-router-dom";
// import useSubmittedContests from "../../../../Hooks/useSubmittedContests";
import './style.css'
// import Loading from "../../../Shared/Loading/Loading";
// import usePersonalSubmittedContests from "../../../../Hooks/usePersonalSubmittedContests";
import useArrayOfNameAndEmails from "../../../../Hooks/useArrayOfNameAndEmails";
import TableRow from "./comopnents/TableRow";
import { motion } from 'framer-motion';


export let contestName='';
// export let WinnerContestName = ''
const ContestSubmitted = () => {
    // const [ submittedContests] = useSubmittedContests();
    const [extractedArrayOfNameAndEmails] = useArrayOfNameAndEmails();
    console.log(extractedArrayOfNameAndEmails);

    

 
    // const handleNavigateInfo = (name) =>{
    //     contestName= name;
    //     console.log(contestName)
    // }


    // const navigate = useNavigate()
    
    if(extractedArrayOfNameAndEmails.length == 0)
        return(
    //  <span className="loading loading-spinner text-error pt-24 mt-48 w-24 lg:ml-96 pl-4 text-6xl">No Internet</span>
        <progress className="progress w-56"></progress>
    )

    // const handleNavigateWinnerDetails = (name)=>{
    //     contestName= name;
    //     navigate("/dashboard/contestSubmitted/winnerDetails");
    //     // contestName=''
    // }


    return (
        <div>
            <h2 className="text-2xl text-center text-blue-800 font-bold font-serif mb-2">ContestSubmitted : <span className="mt-24 text-red-500 pb-12 mb-24">{extractedArrayOfNameAndEmails.length}</span></h2>
            <div>
                <div className="overflow-x-auto ">
                    <table className="table css-selector">
                        {/* head */}
                        <thead>
                        <tr className='relative'>
                            <th className="text-xl font-serif font-extrabold border-b-4 rounded-b-xl border-red-600 text-red-600">Serial</th>
                            <th className="text-xl font-serif font-extrabold border-b-4 rounded-b-xl border-red-600 text-yellow-400 left-20 absolute">Title</th>
                            <th className="text-xl font-serif font-extrabold border-b-4 rounded-b-xl border-red-600 text-green-950 absolute -translate-x-80 right-96">Prize</th>
                            <th className="text-xl font-serif font-extrabold border-b-4 rounded-b-xl border-red-600 text-cyan-900 absolute -translate-x-80 right-40">Winner</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {/* {
                            extractedArrayOfNameAndEmails.map((submittedContest, index) => 
                            (
                                <tr key={index}>
                                    <th>{index+1}</th>
                                    <td>
                                        <Link to={'/dashboard/contestSubmitted/contestInfo'}>
                                            <button onClick={() =>handleNavigateInfo(submittedContest.name)} className="btn btn-error">{submittedContest.name}</button>
                                        </Link>
                                    </td>
                                    <td><button className="btn btn-success">{submittedContest.prizeMoney} TK</button></td>
                                    <td><button onClick={() =>handleNavigateWinnerDetails(submittedContest.name)} className="btn btn-error">Declare</button></td>
                                </tr>
                            ))
                        } */}
                        {
                            extractedArrayOfNameAndEmails.map((submittedContest, index) => {
                                let initialPosition = {};

                                if ((index%3) === 0 ) {
                                    initialPosition = { x: '-100vw' };  // Slide in from the left
                                } 
                                else if ((index%3) === 1) {
                                    initialPosition = { y: '100vh' };  // Slide in from the top
                                } 
                                else if ((index%3) === 2) {
                                    initialPosition = { x: '100vw' };   // Slide in from the right
                                }
                                
                                return(<motion.div
                                key={index}
                                initial={initialPosition}
                                animate={{ x: 0, y: 0 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 1.1 * index }}
                            >
                                <div key={index}>
                                    <TableRow 
                                        key={index} 
                                        serial={index+1}
                                        submittedContest={submittedContest}
                                        prizeMoney={submittedContest.prizeMoney}
                                        name={submittedContest.name}
                                    />
                                </div>
                            </motion.div>)
                                
                        })
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContestSubmitted;