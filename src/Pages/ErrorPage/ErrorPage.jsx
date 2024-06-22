import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="hero min-h-screen errorPage" >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                
                <Link to="/"><button className="btn btn-primary">Back Home</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;