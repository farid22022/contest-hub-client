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
            <h2 className="text-4xl font-serif font-bold text center mt-8">Your Profile's Information</h2>
            <div className="bgImage card w-96 bg-base-100 shadow-xl p-5 ">
            <figure><img className="rounded-full " src={user?.photoURL} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">Name: <span>{user?.displayName}</span></h2>
                <p className="">Email: <span>{user?.email}</span></p>
                {
                    (submittedContests?.length === 0)?
                    <div className="text-xl ">
                        <h2>You did not create any contest</h2>
                        <h2>Or</h2>
                        <h2>Your are not creator</h2>
                    </div>
                    :
                    <p>Created Contests : {submittedContests?.length}</p>
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