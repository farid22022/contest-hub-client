import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ContestDetails = () => {
  const contest = useLoaderData();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const repo = form.repoLink.value;
    const live = form.liveLink.value;

    const newSubmittedContest = {
      submittedEmail :email,
      submittedName : name,
      ContestName: contest.ContestName,
      Image: contest.Image,
      ParticipantsCount: contest.ParticipantsCount,
      tag: contest.tag,
      ShortDescription: contest.ShortDescription,
      prizeMoney: contest.prizeMoney,
      money: contest.money,
      pending: "",
      submittedUser: user.email,
    };

    // Check if repo link is provided before making the fetch call
    if (repo && live) {
      try {
        await axiosPublic.post("/submits", newSubmittedContest);
        Swal.fire("Success!", "Your contest submission has been received.", "success");
      } catch (error) {
        Swal.fire("Error!", "There was an issue submitting your contest.", "error");
      }
    } else {
      Swal.fire("Warning!", "Please provide both repository and live links.", "warning");
    }
  };

  return (
    <div className="text-center lg:ml-36 md:ml-32 sm:ml-12 mt-12">
      <Helmet>
        <title>Submit</title>
      </Helmet>
      <div className="card card-compact w-3/4 text-center bg-base-100 shadow-xl shadow-blue-950">
        <div className="card-body">
          <h2 className="card-title text-teal-500">
            Name <span className="text-red-900"></span>{" "}
            <span className="text-blue-900 text-xl font-serif font-extrabold">{contest.ContestName}</span>
          </h2>
          <p className="text-red-600 text-xl font-extrabold">
            Description: <span className="text-emerald-500 text-xl font-light">{contest.ShortDescription}</span>
          </p>
          <h3>
            <span className="text-red-600">Total Prize Money</span>:{" "}
            <span className="text-blue-950 font-extrabold text-xl">{contest.prizeMoney}</span>
          </h3>
          <h3 className="text-2xl font-bold text-orange-800">Created By: </h3>
          <div>
            {contest.createdEmail ? (
              <p className="text-2xl font-extrabold text-center text-blue-950">{contest.createdEmail}</p>
            ) : (
              <p className="text-green-700 font-extrabold text-2xl text-center">Anonymous</p>
            )}
          </div>
          <h2 className="text-red-600 font-extrabold text-wrap">Please fill up the form</h2>
          <div className="card-actions justify-end">
            <form onSubmit={handleSubmit} className="card-body">
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">GitHub Link</span>
                  </label>
                  <input
                    type="text"
                    placeholder="repository link"
                    name="repoLink"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Live Link</span>
                  </label>
                  <input
                    type="text"
                    placeholder="live link"
                    name="liveLink"
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="form-control mt-6 flex">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>

            <button className="btn btn-primary bg-red-800 text-white">Delete</button>
            <button>
              <span className="btn btn-secondary bg-pink-950">Mark</span>
              <select className="p-3 rounded-lg" name="" id="">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="70">70</option>
                <option value="100">100</option>
              </select>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
