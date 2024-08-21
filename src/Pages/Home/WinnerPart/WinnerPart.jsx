


import { useState } from 'react';
import useWinner from "../../../Hooks/useWinner";
import prizeImage from '../../../assets/Prize/prize.png';
import Marquee from "react-fast-marquee";
import "./Winner.css"
import Typewriter from 'typewriter-effect';
const WinnerPart = () => {
    const [winners] = useWinner();
    const [visibleCount, setVisibleCount] = useState(3); // Initial number of winners to show

    const handleSeeMore = () => {
        if((winners.length - visibleCount) === 1){
            setVisibleCount(prevCount => prevCount + 1)
        }
        else if((winners.length - visibleCount) === 2){
            setVisibleCount(prevCount => prevCount + 2)
        }
        else{
        setVisibleCount(prevCount => prevCount + 3)
        } // Show 3 more winners
    };

    const handleSeeLess = () => {
        setVisibleCount(3)// Reset to initial number of winners
    };

    return ( 
        <div className=' transition-all duration-1000  '>
            <p className="text-6xl text-red-600 font-bold text-center mb-8">Winner Part</p>
            
            <Marquee className='bg-amber-400 '>
                <h3 className='text-red-700 font-semibold shadow-2xl shadow-red-900 p-2'>Unleash Your Creativity in Our Creator Contest!</h3>
            </Marquee>
            <div className='text-left ml-5 '>
                <p>Show off your talent for a chance to win incredible prizes. Check out the inspiring <br></br>work of our past winners and finalists to get motivated!</p>
                <br/>
                <p>This is your moment to shine—express your creativity and talent for a chance to win <br/>fantastic prizes. Need some inspiration? Take a look at the <br/>outstanding projects from our previous winners and finalists.<br/> Your work could be next!</p>
                <br/>
                {/* <p>Step into the spotlight with our Creator Contest!</p> */}
                <Typewriter
                className="text-amber-600 text-2xl"
                options={{
                    strings: ['Step into the spotlight with our Creator Contest!'],
                    autoStart: true,
                    loop: true,
                }}
                />
            </div>
            <p className="text-3xl text-zinc-100 font-bold text-center mb-10 bgImage bg-fixed p-4 mt-5 rounded-full">Total Winners {winners?.length}</p>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 grid-cols-3 space-y-3 bgImage bg-fixed pt-10 pb-8">
                {
                    winners.slice(0, visibleCount).map((winner, index) => 
                        <div key={index} className="card w-96 bg-base-100 shadow-3xl ml-2">
                            <figure className="">
                                <img src={prizeImage} alt="Prize" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Congratulations</h2>
                                <p>{winner.winnerName}</p>
                                <p>{winner.winnerEmail}</p>
                                <div className="card-actions">
                                    <button className="btn btn-primary">Contest: {winner.winnerContest}</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            
            <div className="text-center mt-6">
                {
                    visibleCount < winners.length && 
                    <button onClick={handleSeeMore} className="btn btn-outline btn-primary mx-2">See More</button>
                }
                {
                    (visibleCount === winners.length) && 
                    <button  onClick={handleSeeLess} className="btn btn-outline btn-secondary mx-2">See Less</button>
                }
            </div>
        </div>
    );
};

export default WinnerPart;
