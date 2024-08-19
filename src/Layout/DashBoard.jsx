
import { NavLink, Outlet } from "react-router-dom";
// import useAdmin from "../hooks/useAdmin";
import adminHome from '../../public/administrator.png'
import manageIcon from '../../public/manage.png';
import profile from '../../public/profile.png';
import winningIcon from '../../public/cup.png';
import participatedIcon from '../../public/teamwork.png';
import contestIcon from '../../public/contest.png';
import submitIcon from '../../public/submit.png';
import createCOntestIcon from '../../public/design.png'
import homeIcon from '../../public/house.png';
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
export let index =0;

const Dashboard = () => {

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    // const isAdmin = true;
    const { user } = useAuth();
    const funIndex = () =>{
        index=1;
    }


    return (
        <div className="flex ">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-slate-900">
                <ul className="menu p-4">
                    
                        

                        <div className="text-center">
                            <img className="rounded-full w-1/2 mb-5 translate-x-12 transition-all duration-1000" src={user?.photoURL}/>
                            <h2 className="badge badge-secondary mb-10">{user?.displayName}</h2>
                        </div>  
                    
                    
                    {/* shared nav links */}
                    <div><li><NavLink className="hover:ml-10 transition-all hover:shadow-xl hover:shadow-red-700 duration-1000" to="/"><img src={homeIcon}/>Home</NavLink></li></div>
                    <div className="divider text-stone-300"></div>
                    {
                        isAdmin ?
                        <>
                                <li className="font-bold text-center mb-2 hover:text-rose-500 transition-all duration-500">Admin Section</li>
                                
                                <li>
                                    <NavLink className="hover:ml-12 transition-all duration-1000" to="/dashboard/manageContest">
                                        <img src={adminHome}/>
                                        Manage Contest</NavLink>
                                </li>
                                <li>
                                    <NavLink className="hover:ml-12 transition-all duration-1000" to="/dashboard/allUsers">
                                        <img src={manageIcon}/>
                                        All Users</NavLink>
                                </li>
                            </>
                            :
                            <div className="">
                                <li className="font-bold text-center mb-2 hover:text-rose-500 hover:text-xl hover:shadow-orange-600 hover:shadow-xl rounded-md transition-all duration-500">Creator Section</li>
                                <li>
                                    <NavLink  className="hover:bg-red-400 hover:text-white hover:ml-12 transition-all duration-1000 " to="/dashboard/addContest">
                                        <img  className="w-1/3 hover:w-1/2 transition-all duration-700" src={contestIcon}/>
                                        <span className="hover:mr-0 -mr-3 -translate-x-3">Add Contest</span></NavLink>
                                </li>
                                <li>
                                    <NavLink className="hover:bg-red-400 hover:text-white hover:ml-12 transition-all duration-1000" to="/dashboard/createdContest">
                                        <img className="" src={createCOntestIcon}/>
                                        Created Contest</NavLink>
                                </li>
                                <li>
                                    <NavLink className="hover:bg-red-400 hover:text-white hover:ml-12 transition-all duration-1000" to="/dashboard/contestSubmitted">
                                        <img className="" src={submitIcon}/>
                                        Contest Submitted</NavLink>
                                </li>
                            </div>
                    }

                    <div className="divider "></div>

                    <h3 className="text-center font-bold mb-2 hover:text-rose-500 hover:text-xl hover:shadow-orange-600 hover:shadow-xl rounded-md transition-all duration-500">User Section</h3>
                        <>
                            <li>
                                <NavLink className="hover:bg-red-400 hover:text-white hover:ml-12 transition-all duration-1000" to="/dashboard/Profile">
                                    <img src={profile}/>
                                    User Profile</NavLink>
                            </li>
                            <li>
                                <NavLink className="hover:bg-red-400 hover:text-white  hover:ml-12 transition-all duration-1000" to="/dashboard/winningContest">
                                    <img src={winningIcon}/>
                                    Winning Contest</NavLink>
                            </li>
                            
                            <li>
                                <NavLink className="hover:bg-red-400 hover:text-white  hover:ml-12 transition-all duration-1000" to="/dashboard/participatedContest">
                                    <img src={participatedIcon}/>
                                    Participated Contest</NavLink>
                            </li>
                        </>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;