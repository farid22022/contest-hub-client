import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from '../../../public/Sign/login.gif'
import Swal from "sweetalert2";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import { signInWithPopup } from "firebase/auth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import './login.css'


const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const axiosPublic = useAxiosPublic();
    const { signIn , googleLogin} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    
    
    
    
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user,'33Login');
                let timerInterval;
                    Swal.fire({
                    title: `Login Successful!`,
                    html: "Please wait for <b></b> milliseconds.",
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                    }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                    }
                    });
                navigate(from, { replace: true });
            })

        // googleLogin(email, password)
        //     .then(result => {
        //         const user = result.user;
        //         console.log(user.email);
        //         const userInfo = {
        //             name:user.displayName,
        //             email:user.email,
        //             access:"on"
        //         }
        //         axiosPublic.post('/personalDetails', userInfo)
        //         axiosPublic.post('/users', userInfo)
        //         let timerInterval;
        //             Swal.fire({
        //             title: `Login Successful!`,
        //             html: "Please wait for <b></b> milliseconds.",
        //             timer: 2000,
        //             timerProgressBar: true,
        //             didOpen: () => {
        //                 Swal.showLoading();
        //                 const timer = Swal.getPopup().querySelector("b");
        //                 timerInterval = setInterval(() => {
        //                 timer.textContent = `${Swal.getTimerLeft()}`;
        //                 }, 100);
        //             },
        //             willClose: () => {
        //                 clearInterval(timerInterval);
        //             }
        //             }).then((result) => {
        //             /* Read more about handling dismissals below */
        //             if (result.dismiss === Swal.DismissReason.timer) {
        //                 console.log("I was closed by the timer");
        //             }
        //             });
        //         navigate(from, { replace: true });
        //     })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }

    

    return (
        <>
            <Helmet>
                <title>Contest Hub | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-white ">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <img className="py-6" src={login}/>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-slate-900 opacity-95 shadow-blue-600" >
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            </div>
                           
                            <div className="form-control mt-6">
                                {/* TODO: apply disabled for re captcha */}
                                <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
                            </div>
                            <h3>Login with Google</h3>
                            <div>
                                <button onClick={googleLogin}><FaGoogle/></button> 
                            </div>
                        </form>
                        <p className='px-6'><small>New Here? <Link to="/signup">Create an account</Link> </small></p>
                    </div>
                    
                </div>
            </div>
        </>
    );
};


export default Login;





