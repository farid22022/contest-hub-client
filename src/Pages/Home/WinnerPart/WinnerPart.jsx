import useWinner from "../../../Hooks/useWinner";
import prizeImage from '../../../assets/Prize/prize.png'

const WinnerPart = () => {



    const [ winners ] = useWinner()
    console.log(winners)

    return (
        <div>
            <p className="text-6xl text-red-600 font-bold text-center mb-8">Winner Part </p>
            <p className="text-3xl text-blue-800 font-bold text-center mb-10">Total Winners {winners?.length} </p>
            
            <div className="grid grid-cols-3">
                {
                    winners.map((winner, index) => 
                        <div key={index} className="card w-96 bg-base-100 shadow-3xl ">
                            <figure className="px-5 pt-5">
                                <img src={prizeImage} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Congratulation</h2>
                                <p>{winner.winnerName}</p>
                                <p>{winner.winnerEmail}</p>
                                <div className="card-actions">
                                <button className="btn btn-primary">Contest : {winner.winnerContest}</button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default WinnerPart;