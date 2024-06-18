
import { Link } from "react-router-dom";
import useSubmittedContests from "../../../../Hooks/useSubmittedContests";
import './style.css'


export let contestName='';
const ContestSubmitted = () => {
    const [ submittedContests] = useSubmittedContests();
    console.log(submittedContests)
    const handleNavigateInfo = (name) =>{
        contestName= name;
        console.log(contestName)
    }
    return (
        <div>
            <h2>ContestSubmitted : {submittedContests.length}</h2>
            <div>
                <div className="overflow-x-auto ">
                    <table className="table css-selector">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Title</th>
                            <th>Prize</th>
                            <th>Winner</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            submittedContests.map((submittedContest, index) => 
                            (
                                <tr key={submittedContest._id}>
                                    <th>{index+1}</th>
                                    <td>
                                        <Link to={'/dashboard/contestSubmitted/contestInfo'}>
                                            <button onClick={() =>handleNavigateInfo(submittedContest.name)} className="btn btn-error">{submittedContest.name}</button>
                                        </Link>
                                    </td>
                                    <td><Link to={`/`}><button className="btn btn-success">{submittedContest.gift} TK</button></Link></td>
                                    <td><Link to={`/`}><button className="btn btn-error">Declare</button></Link></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContestSubmitted;