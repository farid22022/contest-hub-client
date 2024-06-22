import useAuth from "../../../../Hooks/useAuth";
import usePersonalSubmittedContests from "../../../../Hooks/usePersonalSubmittedContests";
import './profile.css'

const SubmittedContests = () => {
    const { user } = useAuth()
    const [PersonalSubmittedContests] = usePersonalSubmittedContests();
    console.log(PersonalSubmittedContests);
    return (
        <div>
            {
                PersonalSubmittedContests?.map((contest,index) => 
                    <div key={index} className="card w-1/2 bg-base-100 shadow-xl bgImage3">
                        <figure><img src={contest?.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Contest Name: {contest?.name}</h2>
                            <div className="">Creator's Email :<span>{contest?.createdEmail}</span></div>
                            <p>Prize : <span>{contest.prizeMoney}</span></p>
                            <div className="card-actions justify-end">
                            {
                                (contest.winner)?
                                <>
                                    {
                                        (contest.winner === user.email)?
                                        <div className="grid grid-cols-1 bg-blue-500 rounded-md p-2">
                                            <h2 className="text-red-700 font-bold">Congratulation</h2>
                                            <h2>Great , You are the winner of this contest</h2>
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
    );
};

export default SubmittedContests;