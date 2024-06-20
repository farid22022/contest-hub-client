import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        <span className="loading loading-spinner text-error pt-24 mt-48 w-24 lg:ml-96 pl-4 text-6xl">No Internet</span>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;