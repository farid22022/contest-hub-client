


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
    const [contests] = useContest();
    const createdEmails = [...new Set(contests.filter(contest => contest.createdEmail).map(contest => contest.createdEmail))];
    console.log(createdEmails)
    return (
        <div>
            <h3>All Creator{contests.length} {createdEmails.length}</h3>
            <div>
                {
                    createdEmails.slice(0,2).map((Email,index) =>(
                        <div className="card bg-base-100 w-96 shadow-xl" key={index}>
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
                                
                            }</p></p>
                            
                        </div>
                   </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CreatorPart;