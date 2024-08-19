import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import usePersonalSubmittedContests from "../../../../Hooks/usePersonalSubmittedContests";
import './profile.css'

const SubmittedContests = () => {
    const { user } = useAuth()
    const [PersonalSubmittedContests] = usePersonalSubmittedContests();
    console.log(PersonalSubmittedContests);
    const location = useLocation();
    return (
        <div>
            <Link to={location.state?.from}><button>Back</button></Link>
            <div className="grid grid-cols-3 space-x-2 space-y-1">
                {
                    PersonalSubmittedContests?.map((contest,index) => 
                        <div key={index} className="card bg-base-100 shadow-xl bgImage3 hover:shadow-inner hover:shadow-blue-600 transition-all duration-1000">
                            {/* <figure><img src={contest?.image} alt="Shoes" /></figure> */}
                            <div className="card-body">
                                <h2 className="card-title">Contest Name: {contest?.name}</h2>
                                <div className="">Creator's Email :<span className="badge">{contest?.createdEmail}</span></div>
                                <p>Prize : <span className="badge bg-red-600">{contest.prizeMoney}</span>taka</p>
                                <div className="card-actions justify-end">
                                {
                                    (contest.winner)?
                                    <>
                                        {
                                            (contest.winner === user.email)?
                                            <div className="grid grid-cols-1 bg-blue-500 rounded-md p-2">
                                                <h2 className="text-red-700 font-bold text-xl">Congratulation</h2>
                                                <h2 className="text-yellow-600">Great , You are the winner of this contest</h2>
                                            </div>
                                            :
                                            <>
                                                <h3>Oops, You are not the winner of the contest</h3>
                                            </>
                                        }
                                    </>
                                    :
                                    <>
                                        <button className="btn btn-error">Winner is not Declared</button>
                                    </>
                                }
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default SubmittedContests;