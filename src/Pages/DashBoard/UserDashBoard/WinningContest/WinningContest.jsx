// import { useEffect, useState } from "react";
// import useAuth from "../../../../Hooks/useAuth";
// import useWinner from "../../../../Hooks/useWinner";
// import { key } from "localforage";


// const WinningContest = () => {
//     const { user } = useAuth();
//     const [ winners ] = useWinner();
//     const [WinningContests, setWinningContests] = useState([]);
    


//     console.log(WinningContests)


//     return (
//         <div>
//             <h2>WinningContest {WinningContests.length}</h2>
//             <div>
//                 {
//                     WinningContests?.map((contest,index) =>
//                     <div key={index}>
//                         <h2>Serial; {key+1}</h2>
//                         <div className="card">
//                             {/* <h2>COntest name : {contest}</h2> */}
//                         </div>
//                     </div>
//                     )
//                 }
//             </div>
//         </div>
//     );
// };

// export default WinningContest;

import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useWinner from "../../../../Hooks/useWinner";

const WinningContest = () => {
    const { user } = useAuth();
    const [winners] = useWinner();
    const [winningContests, setWinningContests] = useState([]);

    useEffect(() => {
        if (user && winners) {
            const userWinningContests = winners.filter(contest => contest.winnerEmail === user.email);
            setWinningContests(userWinningContests);
        }
    }, [user, winners]);

    return (
        <div>
            <h2 className="text-2xl text-blue-600 font-bold text-center">Total  Winning Contests : {winningContests.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        winningContests.map((contest,index) =>
                            <tr key={index+1}>
                                <th>{index+1}</th>
                                <td>{contest.winnerContest}</td>
                                
                            </tr>
                        )
                    }
                    
                    </tbody>
                </table>
                </div>
            
        </div>
    );
};

export default WinningContest;
