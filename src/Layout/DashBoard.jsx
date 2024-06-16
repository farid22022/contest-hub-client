
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


const Dashboard = () => {

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin?
                        <>
                            <li>
                                <NavLink to="/dashboard/adminUser">
                                    <img src={adminHome}/>
                                    Admin User</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageContest">
                                    <img src={manageIcon}/>
                                    Manage Contest</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers">
                                    <img src={manageIcon}/>
                                    All Users</NavLink>
                            </li>
                        </>
                        :
                        <>
                            <li>
                                <NavLink to="/dashboard/Profile">
                                    <img src={profile}/>
                                    User Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/winningContest">
                                    <img src={winningIcon}/>
                                    Winning Contest</NavLink>
                            </li>
                            
                            <li>
                                <NavLink to="/dashboard/participatedContest">
                                    <img src={participatedIcon}/>
                                    Participated Contest</NavLink>
                            </li>
                        </>
                    }
                    
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <div><li><NavLink to="/"><img src={homeIcon}/>Home</NavLink></li></div>
                    <div className="divider text-stone-300"></div>
                    <li>
                        <NavLink to="/dashboard/addContest">
                            <img className="w-1/3" src={contestIcon}/>
                            Add Contest</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/contestSubmitted">
                            <img src={submitIcon}/>
                            Contest Submitted</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/createdContest">
                            <img src={createCOntestIcon}/>
                            Created Contest</NavLink>
                    </li>
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