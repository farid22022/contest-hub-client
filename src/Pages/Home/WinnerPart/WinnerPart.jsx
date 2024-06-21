import useWinner from "../../../Hooks/useWinner";
import prizeImage from '../../../assets/Prize/prize.png'

const WinnerPart = () => {

    const [ winners ] = useWinner()

    return (
        <div>
            <p>Winner Part {winners.length}</p>
            <div>
                {
                    winners.map((winner, index) => 
                        <div key={index} className="card w-96 bg-base-100 shadow-3xl grid grid-cols-2">
                            <figure className="px-5 pt-5">
                                <img src={prizeImage} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Congratulation</h2>
                                <p>{winner?.winnerName}</p>
                                <p>{winner.winnerEmail}</p>
                                <div className="card-actions">
                                <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default WinnerPart;