// import { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useSubmittedContests from "../../../../Hooks/useSubmittedContests";
import usePersonalSubmittedContests from "../../../../Hooks/usePersonalSubmittedContests";
import './profile.css'
import { Link } from "react-router-dom";


const Profile = () => {
    const { user } = useAuth();
    const [submittedContests] = useSubmittedContests();
    const [PersonalSubmittedContests] = usePersonalSubmittedContests();
    console.log(PersonalSubmittedContests);
    console.log(submittedContests);
    


    return (
        <div className="  ml-24 ">
            <h2 className="text-2xl font-serif font-bold text center mt-8 ml-24 hover:text-4xl hover:mb-4 transition-all duration-1000">Your Profile's Information</h2>
            <div className="bgImage card translate-x-5 bg-base-100 shadow-xl p-5 ml-36 hover:mt-4 w-96 transition-all hover:border-yellow-800 duration-1000">
            <figure><img className="rounded-full hover:shadow-inner hover:shadow-red-600 transition-all duration-1000" src={user?.photoURL} alt="loading" /></figure>
            <div className="card-body hover:shadow-inner rounded-full hover:shadow-red-700">
                <h2 className="card-title">Name: <span>{user?.displayName}</span></h2>
                <p className="">Email: <span className="badge">{user?.email}</span></p>
                <Link to="/dashboard/commentSection"><button>Comments</button></Link>
                {
                    (submittedContests?.length === 0)?
                    <div className="text-xl ">
                        <h2 className="badge text-sm text-red-500">You did not create any contest</h2>
                        <h2 className="">Or</h2>
                        <h2 className="badge text-sm text-orange-600">Your are not creator</h2>
                    </div>
                    :
                    <p>Created Contests : <span className="badge bg-orange-500">{submittedContests?.length}</span></p>
                }
                <div className="card-actions justify-end">
                {
                    (PersonalSubmittedContests?.length === 0)?
                    <button className="btn btn-primary">You have not submitted any contest</button>
                    :
                    <Link to="/dashboard/submittedContests"><button className="btn btn-primary bg-teal-500">Total submittedContests : <p className="badge-secondary rounded-full p-1">{PersonalSubmittedContests?.length}</p></button></Link>
                }
                
                </div>
            </div>
            </div>
        </div>
    );
};

export default Profile;