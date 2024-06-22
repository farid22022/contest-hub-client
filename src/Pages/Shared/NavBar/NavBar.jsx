import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
// import useCart from "../../../hooks/useCart";
// import useAdmin from "../../../hooks/useAdmin";
export let  LoggedEmail = '' 
const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    LoggedEmail = user?.email;
    // const [isAdmin] = useAdmin();
    // const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOption1 = 
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
            {
                (user?.photoURL)?
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                :
                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            }
        </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            {
                user?
                <>
                <li>
                    <a className="justify-between">
                    <Link to="dashboard/profile">Profile
                    <div className="badge badge-secondary ml-3">{user?.displayName}</div>
                    </Link>
                    </a>
                </li>
                <li><Link to="/dashboard"><a>Dashboard</a></Link></li>
                <li onClick={handleLogOut}><a>Logout</a></li>
                </>
                :
                <li className="btn"><Link to="/login">Login</Link></li>
            }
        </ul>
    </div>

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/allContests">All Contests</Link></li>
        {
            user &&  <li><Link to="/dashboard/profile">Dashboard</Link></li>
        }
        
        
    </>

    return (
        <>
            <div className="navbar fixed z-10 -mt-2 bg-opacity-30 max-w-screen-xl bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Contest Hub</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* <a className="btn">Get started</a> */}
                    {
                        navOption1
                    }
                </div>
            </div>
        </>
    );
};

export default NavBar;