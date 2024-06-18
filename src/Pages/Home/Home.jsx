
import ArrayOfContests from "./AllContest/ArrayOfContests";
import Banner from "./Banner/Banner";
import CreatorPart from "./CreatorPart/CreatorPart";
import WinnerPart from "./WinnerPart/WinnerPart";
// import image1 from '../../../public/contest.png';
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

// import { PageSlides, SlideParallaxType } from '@re_point/react-page-slides';

// export const Home = () => {
//     const slides = [
//         {
//             content: <Banner></Banner>,
//             style: {
//                 backgroundImage: <img src={image1}/>
//             }
//         },
//         {
//             content: <ArrayOfContests></ArrayOfContests>,
//             style: {
//                 backgroundImage: 'url("public.jpg")'
//             }
//         },
//         {
//             content: <WinnerPart></WinnerPart>,
//             style: {
//                 backgroundImage: 'url("public/photo/photo_2.jpg")'
//             }
//         },
//         {
//             content: <CreatorPart></CreatorPart>,
//             style: {
//                 backgroundImage: 'url("public/photo/photo_2.jpg")'
//             }
//         },
//     ];

//     return (
//         <PageSlides
//             enableAutoScroll={true}
//             transitionSpeed={1000}
//             slides={slides}
//             parallax={{
//                 offset: 0.6,
//                 type: SlideParallaxType.reveal
//             }}
//         />
//     );
// };

// export default Home;
