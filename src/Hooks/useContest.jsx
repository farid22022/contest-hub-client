import { useEffect, useState } from "react";


const useContest = () => {

    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect( () =>{
        fetch('http://localhost:5000/contests')
            .then(res => res.json())
            .then(data =>{
                setContests(data);
                setLoading(false);
                console.log(data);
            });
    },[setContests])
    return [contests, loading]
}

export default useContest;