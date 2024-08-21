


import { useState } from "react";
import useContest from "../../../Hooks/useContest";

// const CreatorPart = () => {
//     const [contests] = useContest();
//     const {setCreators} = useContext(AuthContext);
//     const uniqueEmails = Array.from(new Set(contests.map(contest => contest.createdEmail)));
//     const contestsCreatedByEmail = uniqueEmails.map(email => ({
//         email: email,
//         contestsCount: contests.filter(contest => contest.createdEmail === email).length
//     }));

//     const sortedContestsCreatedByEmail = contestsCreatedByEmail.sort((a, b) => b.contestsCount - a.contestsCount);
//     setCreators(sortedContestsCreatedByEmail)

//     return (
//         <div>
//             <h2 className="text-center text-4xl font-bold text-blue-600 mb-12">Best Creator Part</h2>
//             <div className="text-center bg-zinc-700 p-5 mt-12 rounded-md grid grid-cols-2">
//                 {sortedContestsCreatedByEmail.slice(0,2).map((creator, index) => (
                //     <div className="card bg-base-100 w-96 shadow-xl" key={index}>
                //         <div className="card-body">
                //             {
                //                 (index===0) &&
                //                 <>
                //                     <h3 className="text-3xl">Best Creator</h3>
                //                     <img src="./../../../../public/gold-medal.png"/>
                //                 </>
                //             }
                //             <h2 className="card-title">Email</h2>
                //             <h2 className='text-emerald-600'>{creator.email}</h2>
                //             <p>Created Contest : <p className='badge bg-red-800'>{creator.contestsCount}</p></p>
                            
                //         </div>
                //    </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CreatorPart;



const CreatorPart = () => {
    const [isVisible, setIsVisible] = useState(3)
    const [contests] = useContest();
    console.log(contests)
    const emailContestCount = contests.reduce((acc, contest) => {
        if (contest.createdEmail) {
            acc[contest.createdEmail] = (acc[contest.createdEmail] || 0) + 1;
        }
        return acc;
    }, {});
    
    console.log(emailContestCount);

    

    // Convert the object into an array of [email, count] pairs and sort it
    const ArrayOfContests = Object.entries(emailContestCount)
        .sort((a, b) => b[1] - a[1]); // Sort by the count in descending order

    console.log(ArrayOfContests);
    const handleSeeMore = () =>{
        setIsVisible(ArrayOfContests.length)
    }
    const handleSeeLess = () =>{
        setIsVisible(3+isVisible)
    }    
    return (
        <div className="transition-all duration-1000 mt-10 mb-12 pt-10 z-50">
            <h3 className="text-center text-yellow-800 font-semibold text-2xl mb-12">All Creator</h3>
            <div className="grid grid-cols-3 space-y-3">
                {
                    ArrayOfContests.slice(0,isVisible).map(([Email,count],index) =>(
                        <div className="card bg-base-100 w-96 shadow-xl shadow-emerald-300" key={index}>
                        <div className="card-body">
                            {
                                (index===0) &&
                                <>
                                    <h3 className="text-3xl">Best Creator</h3>
                                    <img src="./../../../../public/gold-medal.png"/>
                                </>
                            }
                            <h2 className="card-title">Email</h2>
                            <h2 className='text-emerald-600'>{Email}</h2>
                            <p>Created Contest : <p className='badge bg-red-800'>{
                                count
                            }</p></p>
                            
                        </div>
                   </div>
                    ))
                }
            </div>
            <div className="text-center mt-6">
                {
                    isVisible < ArrayOfContests.length && 
                    <button onClick={handleSeeMore} className="btn btn-outline btn-primary mx-2">See More</button>
                }
                {
                    isVisible > 3 && 
                    <button onClick={handleSeeLess} className="btn btn-outline btn-secondary mx-2">See Less</button>
                }
            </div>
        </div>
    );
};

export default CreatorPart;