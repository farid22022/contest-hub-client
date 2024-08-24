import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
export let LoggedEmail = '';
import { motion } from "framer-motion";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    LoggedEmail = user?.email;

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    const navOption1 = 
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
            {
                user?.photoURL ?
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                :
                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            }
        </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 ">
            {
                user ?
                <>
                <li className="hover:ml-12 transition-all duration-700">
                    <Link className="" to="dashboard/profile">Profile
                    <div className="ml-3 p-2 bg-pink-700 rounded-md">{user?.displayName}</div>
                    </Link>
                </li>
                <li className="hover:ml-16 transition-all duration-700"><Link to="/dashboard/profile">Dashboard</Link></li>
                <li className="hover:ml-16 transition-all duration-700" onClick={handleLogOut}>Logout</li>
                </>
                :
                <li className="btn hover:ml-16 transition-all duration-700"><Link to="/login">Login</Link></li>
            }
        </ul>
    </div>

    const navOptions = <>
        <li><Link className="hover:text-xl hover:shadow-inner hover:shadow-white transition-all duration-700" to="/">Home</Link></li>
        <li><Link className="hover:text-xl hover:shadow-inner hover:shadow-white transition-all duration-700" to="/allContests">All Contests</Link></li>
        {
            user && <li><Link className="hover:text-xl hover:shadow-inner hover:shadow-white transition-all duration-700" to="/dashboard/profile">Dashboard</Link></li>
        }
    </>

    return (
        <div className="navbar fixed z-10 -mt-2 bg-opacity-30 max-w-screen-xl bg-black text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <motion.ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52" initial={{ y: -550 }} animate={{ y: 10 }}>
                        {navOptions}
                    </motion.ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Contest Hub</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <motion.ul className="menu menu-horizontal px-1"
                    initial={{x:'-100vw'}}
                    animate={{x:0}}
                    transition={{type:'spring', stiffness:350, delay:0, duration:1.5}}
                >
                    {navOptions}
                </motion.ul>
            </div>
            <motion.div className="navbar-end"
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 300 }}
            >
                {navOption1}
            </motion.div>
        </div>
    );
};

export default NavBar;
