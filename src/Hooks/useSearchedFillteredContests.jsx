import { useState } from "react";


const useSearchedFillteredContests = () => {
    const [searchedFilteredContests, setSearchedFillteredContests] = useState([]);
    return [searchedFilteredContests,setSearchedFillteredContests];

};

export default useSearchedFillteredContests;