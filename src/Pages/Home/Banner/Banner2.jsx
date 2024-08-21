import {  useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import useContest from "../../../Hooks/useContest";
import useContestUsers from "../../../Hooks/useContestUsers";
import useAuth from "../../../Hooks/useAuth";
import usePersonalDetails from "../../../Hooks/usePersonalDetails";
import './Banner2.css'
import { AuthContext } from "../../../providers/AuthProvider";
import Banner1 from "./../../../../public/BannerBg/Banner1.jpg"
import Banner20 from "./../../../../public/BannerBg/Banner2.jpg"
import Banner3 from "./../../../../public/BannerBg/Banner3.jpg"
import Banner4 from "./../../../../public/BannerBg/Banner4.jpg"
const Banner2 = () => {

    const [ personalDetails ] = usePersonalDetails();
    const { user } = useAuth();
    const { 
         setBannerSearchedItems,
         bannerSearchedItems,
        setLoading,
        isClicked, 
        setIsClicked} = useContext(AuthContext);
    const [isBlurred,setIsBlur] = useState(false);
    const LoggedUser = user?.email;
    const [userAccess, setUserAccess ] = useState(false);
    const [contests] = useContest();
    const [searchInput, setSearchInput] = useState("");  

    const [submittedContests] = useContestUsers();
    const transformedContests = submittedContests.map(contest => {
        const { name, createdEmail, submittedEmail, submittedName, winner } = contest;
        return { name, createdEmail, submittedEmail, submittedName, winner };
    });
    
    
    // console.log(transformedContests);

    useEffect( () =>{
        if(personalDetails.length > 0){
            personalDetails.map(personalDetail => {
                if(personalDetail.email === LoggedUser && personalDetail.access){
                    setUserAccess(true)
                    return;
                }
            })
        }
    })

    
    const handleSearch = () => {
        setBannerSearchedItems([])
        const searchedContests = contests.filter(contest => {
            console.log(contest.tag,searchInput);
            return contest.tag === searchInput
        });
        console.log(searchedContests);
        setBannerSearchedItems(searchedContests);
        console.log(bannerSearchedItems);
        setIsBlur(false);
        isClicked(false)
        
    };

    // if(bannerSearchedItems.length !== 0){
    //     setIsClicked(false)
    // }

    const handleSetBlurEffect = () => {
        setIsBlur(true);
    }

    const handleRemoveBlurEffect = () => {
        setIsBlur(false);
    }

    const handleSetClickedOn = () => {
        setIsClicked(!isClicked);

    }
    



    console.log('clicked',isClicked);

    
    

    return (
        <div className={`carousel w-full shadow-2xl shadow-black-u ${isClicked? 'border-opacity-5':''} `}>
            <div id="slide1"  className={`carousel-item relative w-full transition-all duration-1000`}>
                <img
                src={Banner1}
                className={`w-full ${isClicked?'blur-xl':''} shadow-2xl shadow-slate-600 border-opacity-10 transition-all duration-1000`} />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <div onMouseEnter={handleSetBlurEffect} onMouseLeave={handleRemoveBlurEffect}  className={`ml-96 mt-   search-bar hover:shadow-2xl hover:shadow-black  ${isClicked ? 'translate-y-10':''} transition-all duration-1000`}>
                    <div onClick={handleSetClickedOn} className={`inline-block mt-16 mb-12 sm:mt-0 rounded-md sm:mb-0 md:mb-0 md:mt-0 ${isClicked ? '':''}`}>
                        <input 
                            type="text"
                            placeholder="tag"
                            required
                            value={searchInput}  // Bind input value to searchInput state
                            onChange={(e) => setSearchInput(e.target.value)}  // Update state on input change
                            className={`p-2 rounded-l-2xl bg-yellow-100 text-xl ${isClicked ? 'p-5 shadow-2xl w-96 transition-all duration-1000 shadow-slate-700': ''} transition-all duration-1000`}
                        />
                        <button 
                            className={`text-xl bg-slate-500 rounded-l-2xl p-2 ${isClicked ? 'p-5 w-44 shadow-slate-700':''} transition-all duration-1000`}
                            onClick={handleSearch}  // Call handleSearch on button click
                        >
                            <h2><FiSearch className="text-xs inline-flex"/>Search</h2>
                        </button>
                    </div>
                </div>
                <a href="#slide4" className="btn absolute sm:top-16 sm:text-xs md:btn-circle md:top-20 top-36 right-48">❮</a>
                <a href="#slide2" className="btn absolute sm:top-16 sm:text-xs md:btn-circle md:top-20 top-36 right-6">❯</a>
                </div>
            </div>
            <div id="slide2"  className={`carousel-item relative w-full transition-all duration-1000`}>
                <img
                src={Banner20}
                className={`w-full ${isClicked?'blur-xl':''} shadow-2xl shadow-slate-600 border-opacity-10 transition-all duration-1000`} />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <div onMouseEnter={handleSetBlurEffect} onMouseLeave={handleRemoveBlurEffect}  className={`ml-96 mt-   search-bar hover:shadow-2xl hover:shadow-black  ${isClicked ? 'translate-y-10':''} transition-all duration-1000`}>
                    <div onClick={handleSetClickedOn} className={`inline-block mt-16 mb-12 sm:mt-0 rounded-md sm:mb-0 md:mb-0 md:mt-0 ${isClicked ? '':''}`}>
                        <input 
                            type="text"
                            placeholder="tag"
                            required
                            value={searchInput}  // Bind input value to searchInput state
                            onChange={(e) => setSearchInput(e.target.value)}  // Update state on input change
                            className={`p-2 rounded-l-2xl bg-yellow-100 text-xl ${isClicked ? 'p-5 shadow-2xl w-96 transition-all duration-1000 shadow-slate-700': ''} transition-all duration-1000`}
                        />
                        <button 
                            className={`text-xl bg-slate-500 rounded-l-2xl p-2 ${isClicked ? 'p-5 w-44 shadow-slate-700':''} transition-all duration-1000`}
                            onClick={handleSearch}  // Call handleSearch on button click
                        >
                            <h2><FiSearch className="text-xs inline-flex"/>Search</h2>
                        </button>
                    </div>
                </div>
                <a href="#slide1" className="btn absolute sm:top-16 sm:text-xs md:btn-circle md:top-20 top-36 right-48">❮</a>
                <a href="#slide3" className="btn absolute sm:top-16 sm:text-xs md:btn-circle md:top-20 top-36 right-6">❯</a>
                </div>
            </div>
            <div id="slide3"  className={`carousel-item relative w-full transition-all duration-1000`}>
                <img
                src={Banner3}
                className={`w-full ${isClicked?'blur-xl':''} shadow-2xl shadow-slate-600 border-opacity-10 transition-all duration-1000`} />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <div onMouseEnter={handleSetBlurEffect} onMouseLeave={handleRemoveBlurEffect}  className={`ml-96 mt-   search-bar hover:shadow-2xl hover:shadow-black  ${isClicked ? 'translate-y-10':''} transition-all duration-1000`}>
                    <div onClick={handleSetClickedOn} className={`inline-block mt-16 mb-12 sm:mt-0 rounded-md sm:mb-0 md:mb-0 md:mt-0 ${isClicked ? '':''}`}>
                        <input 
                            type="text"
                            placeholder="tag"
                            required
                            value={searchInput}  // Bind input value to searchInput state
                            onChange={(e) => setSearchInput(e.target.value)}  // Update state on input change
                            className={`p-2 rounded-l-2xl bg-yellow-100 text-xl ${isClicked ? 'p-5 shadow-2xl w-96 transition-all duration-1000 shadow-slate-700': ''} transition-all duration-1000`}
                        />
                        <button 
                            className={`text-xl bg-slate-500 rounded-l-2xl p-2 ${isClicked ? 'p-5 w-44 shadow-slate-700':''} transition-all duration-1000`}
                            onClick={handleSearch}  // Call handleSearch on button click
                        >
                            <h2><FiSearch className="text-xs inline-flex"/>Search</h2>
                        </button>
                    </div>
                </div>
                <a href="#slide2" className="btn absolute sm:top-16 sm:text-xs md:btn-circle md:top-20 top-36 right-48">❮</a>
                <a href="#slide4" className="btn absolute sm:top-16 sm:text-xs md:btn-circle md:top-20 top-36 right-6">❯</a>
                </div>
            </div>
            <div id="slide4"  className={`carousel-item relative w-full transition-all duration-1000`}>
                <img
                src={Banner4}
                className={`w-full ${isClicked?'blur-xl':''} shadow-2xl shadow-slate-600 border-opacity-10 transition-all duration-1000`} />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <div onMouseEnter={handleSetBlurEffect} onMouseLeave={handleRemoveBlurEffect}  className={`ml-96 mt-   search-bar hover:shadow-2xl hover:shadow-black  ${isClicked ? 'translate-y-10':''} transition-all duration-1000`}>
                    <div onClick={handleSetClickedOn} className={`inline-block mt-16 mb-12 sm:mt-0 rounded-md sm:mb-0 md:mb-0 md:mt-0 ${isClicked ? '':''}`}>
                        <input 
                            type="text"
                            placeholder="tag"
                            required
                            value={searchInput}  // Bind input value to searchInput state
                            onChange={(e) => setSearchInput(e.target.value)}  // Update state on input change
                            className={`p-2 rounded-l-2xl bg-yellow-100 text-xl ${isClicked ? 'p-5 shadow-2xl w-96 transition-all duration-1000 shadow-slate-700': ''} transition-all duration-1000`}
                        />
                        <button 
                            className={`text-xl bg-slate-500 rounded-l-2xl p-2 ${isClicked ? 'p-5 w-44 shadow-slate-700':''} transition-all duration-1000`}
                            onClick={handleSearch}  // Call handleSearch on button click
                        >
                            <h2><FiSearch className="text-xs inline-flex"/>Search</h2>
                        </button>
                    </div>
                </div>
                <a href="#slide3" className="btn absolute sm:top-16 sm:text-xs md:btn-circle md:top-20 top-36 right-48">❮</a>
                <a href="#slide1" className="btn absolute sm:top-16 sm:text-xs md:btn-circle md:top-20 top-36 right-6">❯</a>
                </div>
            </div>
            
            
        </div>
    );
};

export default Banner2;

//
//
//https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg
// https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg