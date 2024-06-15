import { Link } from "react-router-dom";


const Contest = ({contest}) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                src={contest.Image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{contest.ContestName}</h2>
              <p>{contest.ParticipantsCount}</p>
              <p>tag:{contest.tag}</p>
              <p>{contest.ShortDescription}</p>
              <p>{contest.ParticipantsCount}</p>
              <div className="card-actions justify-end">
              <Link to={`/submitted/${contest._id}`}>
              <button className="btn btn-primary">Register</button>
               </Link>

              </div>
            </div>
          </div>
    );
};

export default Contest;