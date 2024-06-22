import { Link } from "react-router-dom";
import useCount from "../../../Hooks/useCount";
// import usePersonalDetails from "../../../Hooks/usePersonalDetails";


const Contest = ({contest, transformedContests, LoggedUser,userAccess}) => {
  console.log(transformedContests)
  console.log(contest);
  const name = contest.name;
  const  count  = useCount(name);
  console.log(count[0]);
  let isSubmitted = false;

  
  
  console.log('This contest is submitted by this user',isSubmitted);
  const filteredContests = transformedContests.filter(contestItem => contestItem.name === name);
  let winner = filteredContests.some(contestItem => contestItem.winner);

  let submitted = filteredContests.find(contest => contest.submittedEmail === LoggedUser);
  console.log(submitted?.submittedEmail)
  if(submitted?.submittedEmail === LoggedUser){
    isSubmitted=true;
  }
  else{
    isSubmitted=false;
  }

  console.log(userAccess);

  // console.log('Filtered Contests:', filteredContests);
  console.log('Winner is declared for this contest',winner);
  

    return (
        <div className="card w-80 shadow-gray-50 shadow-2xl">
            <figure>
              <img
                src={contest.image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body h-40 ">
              <h2 className="card-title">{contest.name}</h2>
              {/* <p>{contest.ParticipantsCount}</p> */}
              <p>tag:{contest.tag}</p>
              <p>{contest.description}</p>
              {/* <p>{contest.ParticipantsCount}</p> */}
              {/* <div className="card-actions justify-end">
                <Link to={`/submitted/${contest._id}`}>
                  <button className="btn btn-primary">Register</button>
                </Link>

              </div> */}
              {
                (userAccess === true)?
                <>
                {
                isSubmitted?
                <button className="btn btn-error">Submitted</button>
                :
                <>
                  {
                    winner?
                    <button className="btn btn-error text-red-700">Winner Is Declared</button>
                    :
                    <div className="card-actions justify-end">
                      <Link to={`/submitted/${contest._id}`}>
                        <button className="btn btn-primary">Register</button>
                      </Link>

                    </div>
                  }
                </>
              }
                </>
                :
                <button className="btn btn-error">Blocked!</button>
              }
            </div>
            <div className="divider"></div>
            <div>
              <button className="btn mb-2 ml-2">
                Participants
                <div className="badge badge-secondary">{count[0]}</div>
              </button>
              
            </div>
          </div>
    );
};

export default Contest;