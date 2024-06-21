import { Link, useNavigate } from "react-router-dom";
import useWinner from "../../../../../Hooks/useWinner";

export let contestName='';
const TableRow = ({serial,submittedContest,prizeMoney,name}) => {

    

    const navigate = useNavigate()

    const [ winners ] = useWinner();
    console.log(winners)
    let declared = winners.find(contest => contest.winnerContest === name);
    console.log(declared);
    console.log(declared?.winnerContest);
    const winnerParticipator = declared?.winnerEmail;
    console.log(declared?.winnerEmail)
    if(declared?.winnerContest === name){
        declared=true;
    }
    else{
        declared=false;
    }
    console.log(declared);

    contestName=name;
    const handleNavigateWinnerDetails = (name)=>{
        contestName= name;
        navigate("/dashboard/contestSubmitted/winnerDetails");
        // contestName=''
    }

    const handleNavigateInfo = (name) =>{
        contestName= name;
        console.log(contestName)
    }

    

    return (
        <tr>
            <th>{serial}</th>
            <td>
                <Link to={'/dashboard/contestSubmitted/contestInfo'}>
                    <button onClick={() =>handleNavigateInfo(submittedContest.name)} className="btn btn-error">{submittedContest.name}</button>
                </Link>
            </td>
            <td><button className="btn btn-success">{submittedContest.prizeMoney} TK</button></td>
            {
                declared?
                <td className="">
                    <button className="btn btn-error grid grid-cols-1 ml-20 text-center">
                        <h2 className="ml-4">Declared 📢</h2>
                        <h3 className="ml-4">Winner is : {winnerParticipator}</h3>
                    </button>
                </td>
                :
                <td><button onClick={() =>handleNavigateWinnerDetails(submittedContest.name)} className="btn btn-error">Declare</button></td>
            }
        </tr>
    );
};

export default TableRow;