import { useEffect, useState } from 'react';
import { contestName } from '../ContestSubmitted';

const ContestInfo = () => {
    const name = contestName;
    const [contests, setContests] = useState([]);
    useEffect( () =>{
        fetch(`http://localhost:5000/submits/${name}`)
            .then(res => res.json())
            .then(data => setContests(data))
    },[name])
    console.log(contests)
    return (
        <div>
            <h2 className=''>Name:{name}</h2>
            <div>
                {
                    contests.map(name =><h2 key={name._id}>{name.submittedEmail}</h2>)
                }
            </div>
        </div>
    );
};

export default ContestInfo;