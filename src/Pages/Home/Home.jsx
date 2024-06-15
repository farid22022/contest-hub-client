
import ArrayOfContests from "./AllContest/ArrayOfContests";
import Banner from "./Banner/Banner";
import CreatorPart from "./CreatorPart/CreatorPart";
import WinnerPart from "./WinnerPart/WinnerPart";
import {Helmet} from 'react-helmet-async';

const Home = () => {
    return (
        <div className="space-y-2">
            <Helmet>
                <title>Home | Contest Hub</title>
            </Helmet>
            <Banner></Banner>
            {/* <AllContest className="w-1/2 h-1/2"></AllContest> */}
            <ArrayOfContests></ArrayOfContests>
            <WinnerPart></WinnerPart>
            <CreatorPart></CreatorPart>
        </div>
    );
};

export default Home;