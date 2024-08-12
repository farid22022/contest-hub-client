import { Link } from "react-router-dom";
import useCount from "../../../Hooks/useCount";
import moment from "moment";
import { useEffect, useState } from "react";
// import usePersonalDetails from "../../../Hooks/usePersonalDetails";
export const currentTime = moment().format("dddd, MMMM D, YYYY");

const Contest = ({contest, transformedContests, LoggedUser,userAccess}) => {
  const name = contest.name;
  const  count  = useCount(name);
  let isSubmitted = false;

  const [available, setAvailable] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');

  useEffect( () =>{
    const contestDate = moment(contest.date);

    const updateRemainigTime = () =>{
      const now = moment();
      const duration = moment.duration(contestDate.diff(now));
      if(duration.asMilliseconds() <= 0){
        setAvailable(false);
        setRemainingTime('Registration closed');
      }
      else{
        setRemainingTime(`${duration.days()}d ${duration.hours()}h ${duration.minutes()} m ${duration.seconds()}s`)
      }

      
    };
    updateRemainigTime();
      const interval = setInterval(updateRemainigTime,1000);
      return () => clearInterval(interval)
  },[contest.date] )



  
  
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

  

    return (
        <div className="card w-80 shadow-gray-50 shadow-2xl">
            <figure>
              <img
                src={contest.image}
                alt="Shoes"
              />
            </figure>
            <p className="ml-1 text-teal-300 font-bold">Remaining Time : <button className="bg-red-800 text-white">{remainingTime}</button></p>
            
            <div className="card-body  h-40">
              <h2 className="card-title">{contest.name}</h2>
              {/* <p>{contest.ParticipantsCount}</p> */}
              <p className="text-green-700">tag:<span className="text-blue-700 underline">#{contest.tag}</span></p>
              <p>{contest.description}</p>
              {/* <p>{contest.ParticipantsCount}</p> */}
              {/* <div className="card-actions justify-end">
                <Link to={`/submitted/${contest._id}`}>
                  <button className="btn btn-primary">Register</button>
                </Link>

              </div> */}
              {
                (available)?
                <div>
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
                :
                <button className="btn btn-error">Unavailable!</button>
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