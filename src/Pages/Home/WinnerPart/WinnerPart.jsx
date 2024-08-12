// import useWinner from "../../../Hooks/useWinner";
// import prizeImage from '../../../assets/Prize/prize.png'

// const WinnerPart = () => {
    

//     const [ winners ] = useWinner()
//     console.log(winners)

//     return (
//         <div>
//             <p className="text-6xl text-red-600 font-bold text-center mb-8">Winner Part </p>
//             <p className="text-3xl text-blue-800 font-bold text-center mb-10">Total Winners {winners?.length} </p>
            
//             <div className="grid grid-cols-3">
//                 {
//                     winners.map((winner, index) => 
//                         <div key={index} className="card w-96 bg-base-100 shadow-3xl ">
//                             <figure className="px-5 pt-5">
//                                 <img src={prizeImage} alt="Shoes" className="rounded-xl" />
//                             </figure>
//                             <div className="card-body items-center text-center">
//                                 <h2 className="card-title">Congratulation</h2>
//                                 <p>{winner.winnerName}</p>
//                                 <p>{winner.winnerEmail}</p>
//                                 <div className="card-actions">
//                                 <button className="btn btn-primary">Contest : {winner.winnerContest}</button>
//                                 </div>
//                             </div>
//                         </div>)
//                 }
//                 {/* {
//                     (number === winners.length)?
//                     <button onClick={handleNumberDecrease}>See Less</button>
//                     :
//                     <button onClick={handleNumberIncrease}>See More</button>
//                 } */}
//             </div>
//         </div>
//     );
// };

// export default WinnerPart;


import { useState } from 'react';
import useWinner from "../../../Hooks/useWinner";
import prizeImage from '../../../assets/Prize/prize.png';

const WinnerPart = () => {
    const [winners] = useWinner();
    const [visibleCount, setVisibleCount] = useState(3); // Initial number of winners to show

    const handleSeeMore = () => {
        setVisibleCount(prevCount => prevCount + 3); // Show 3 more winners
    };

    const handleSeeLess = () => {
        setVisibleCount(3); // Reset to initial number of winners
    };

    return (
        <div className='transition-all duration-1000'>
            <p className="text-6xl text-red-600 font-bold text-center mb-8">Winner Part</p>
            <p className="text-3xl text-blue-800 font-bold text-center mb-10">Total Winners {winners?.length}</p>
            
            <div className="grid grid-cols-3 gap-6">
                {
                    winners.slice(0, visibleCount).map((winner, index) => 
                        <div key={index} className="card w-96 bg-base-100 shadow-3xl">
                            <figure className="px-5 pt-5">
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
                    visibleCount > 3 && 
                    <button onClick={handleSeeLess} className="btn btn-outline btn-secondary mx-2">See Less</button>
                }
            </div>
        </div>
    );
};

export default WinnerPart;
