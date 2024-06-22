import './Main.css'
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../Pages/Shared/Footer/Footer";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import { useEffect } from "react";



const Main = () => {
    const location = useLocation();
    const noNavBarFooter = /login|signup/.test(location.pathname);
    const handleThemeChange = (event) => {
        const selectedTheme = event.target.value;
        document.documentElement.setAttribute('data-theme', selectedTheme);
    };

    useEffect(() => {
        const themeButtons = document.querySelectorAll('.theme-controller');
        themeButtons.forEach(button => {
            button.addEventListener('change', handleThemeChange);
        });

        return () => {
            themeButtons.forEach(button => {
                button.removeEventListener('change', handleThemeChange);
            });
        };
    }, []);

    return (
        <div>
            { noNavBarFooter || <NavBar/>}
            <Outlet />
            { noNavBarFooter || <Footer />}
            <div className=' top-24 fixed'>
                <div className="dropdown mb-72">
                    <div className="bg-red" tabIndex={0} role="button" className="btn m-1">
                    Theme
                    <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-64">
                        <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default"/></li>
                        <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro"/></li>
                        <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value="cyberpunk"/></li>
                        <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine"/></li>
                        <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" value="aqua"/></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Main;
