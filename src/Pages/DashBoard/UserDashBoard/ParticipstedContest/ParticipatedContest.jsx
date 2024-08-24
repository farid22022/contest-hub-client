import { initAsyncCompiler } from "sass";
import usePersonalSubmittedContests from "../../../../Hooks/usePersonalSubmittedContests";
import { motion } from "framer-motion";

const ParticipatedContest = () => {
    const [PersonalSubmittedContests] = usePersonalSubmittedContests();

    return (
        <div>
            <h3 className="text-3xl text-center font-bold  mb-12">Total submitted contests: {PersonalSubmittedContests.length}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PersonalSubmittedContests.map((contest, index) => {
                    let initialPosition = {};

                    if((index%3) === 0){
                        initialPosition = { x:'-100vw' }
                    }
                    else if((index%3) === 1){
                        initialPosition = { y:'100vh' }
                    }
                    else if((index%3) === 2){
                        initialPosition = { x:'100vh' }
                    }

                    return (
                        <motion.div key={index} className="card card-compact bg-base-100 shadow-xl"
                            initial={initialPosition}
                            animate={{x:0,y:0}}
                            transition={{type:'spring',stiffness:250 , delay:.5, duration:1.5}}
                        >
                            <figure>
                                <img src={contest.image} alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{contest.title}</h2>
                                <p>{contest.description}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">{contest.name}</button>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
};

export default ParticipatedContest;


{/* <div key={index} className="card card-compact bg-base-100 shadow-xl">
                        <figure>
                            <img src={contest.image} alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{contest.title}</h2>
                            <p>{contest.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">{contest.name}</button>
                            </div>
                        </div>
                    </div> */}
