import { Link } from "react-router-dom";
import useCount from "../../../Hooks/useCount";


const Contest = ({contest}) => {
  const name = contest.name;
  const count = useCount(name);
  console.log(count[0]);
  

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                src={contest.image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{contest.name}</h2>
              {/* <p>{contest.ParticipantsCount}</p> */}
              <p>tag:{contest.tag}</p>
              <p>{contest.description}</p>
              {/* <p>{contest.ParticipantsCount}</p> */}
              <div className="card-actions justify-end">
              <Link to={`/submitted/${contest._id}`}>
              <button className="btn btn-primary">Register</button>
               </Link>

              </div>
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