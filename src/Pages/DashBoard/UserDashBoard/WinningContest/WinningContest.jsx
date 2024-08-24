
import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useWinner from "../../../../Hooks/useWinner";
import { motion } from "framer-motion";

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
                        <th className="text-xl text-black">Serial</th>
                        <th className="text-xl text-black">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        winningContests.map((contest,index) =>{
                            let initialPosition = {};

                            if((index%3) === 0){
                                initialPosition = { x : '-100vw'}
                            }
                            else if((index%3) === 1){
                                initialPosition = { y : '100vw' }
                            }
                            else {
                                initialPosition = { x : '100vw' }
                            }
                            return (
                                <motion.tr key={index+1}
                                    initial={initialPosition}
                                    animate={{ x: 0, y: 0 , opacity:95}}
                                    transition={{ type: 'spring', stiffness: 200, delay: .6 * index }}
                                >
                                    <th className="text-xl text-black bg-red-500">[{index+1}]</th>
                                    <td className="text-xl font-semibold text-black bg-slate-500">{contest.winnerContest}</td>
                                    
                                </motion.tr>
                            )
                            
                        }
                         
                        )
                    }
                    
                    </tbody>
                </table>
                </div>
            
        </div>
    );
};

export default WinningContest;
{/* <tr key={index+1}>
                                <th>{index+1}</th>
                                <td>{contest.winnerContest}</td>
                                
                            </tr> */}