
import ArrayOfContests from "./AllContest/ArrayOfContests";
import Banner2 from "./Banner/Banner2";
import CreatorPart from "./CreatorPart/CreatorPart";
import WinnerPart from "./WinnerPart/WinnerPart";
import {Helmet} from 'react-helmet-async';

const Home = () => {
    return (
        <div className="space-y-2">
            <Helmet>
                <title>Home | Contest Hub</title>
            </Helmet>
            <Banner2></Banner2>
            <ArrayOfContests></ArrayOfContests>
            <WinnerPart></WinnerPart>
            <CreatorPart></CreatorPart>
        </div>
    );
};

export default Home;

