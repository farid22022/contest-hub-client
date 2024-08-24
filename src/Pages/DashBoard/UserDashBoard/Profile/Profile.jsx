// import { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useSubmittedContests from "../../../../Hooks/useSubmittedContests";
import usePersonalSubmittedContests from "../../../../Hooks/usePersonalSubmittedContests";
import './profile.css'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";


const Profile = () => {
    const { user } = useAuth();
    const [submittedContests] = useSubmittedContests();
    const [PersonalSubmittedContests] = usePersonalSubmittedContests();
    console.log(PersonalSubmittedContests);
    console.log(submittedContests);

    
    


    return (
        <motion.div className="  ml-24 "
            initial={{ x : '100vw' ,}}
            animate={{ x : 0 }}
            transition={{type:'spring', stiffness:350, delay:1 ,duration:2}}
        >
            <h2 className="text-2xl font-serif font-bold text center mt-8 ml-24 hover:text-4xl hover:mb-4 transition-all duration-1000">Your Profile's Information</h2>
            <div className="bgImage card translate-x-5 bg-base-100 shadow-xl p-5 ml- hover:mt-4 w-auto transition-all hover:border-yellow-800 duration-1000">
            <figure><img className="rounded-full hover:shadow-inner hover:shadow-red-600 transition-all duration-1000 w-1/4" src={user?.photoURL} alt="loading" /></figure>
            <div className="card-body hover:shadow-inner rounded-full hover:shadow-red-700">
                <h2 className="card-title">Name: <span>{user?.displayName}</span></h2>
                <p className="">Email: <span className="badge bg-pink-500 text-black">{user?.email}</span></p>
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
        </motion.div>
    );
};

export default Profile;