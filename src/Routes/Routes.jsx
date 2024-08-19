import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
// import AllContest from "../Pages/AllContest/AllContest";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/DashBoard";
import ParticipatedContest from "../Pages/DashBoard/UserDashBoard/ParticipstedContest/ParticipatedContest";
import Profile from "../Pages/DashBoard/UserDashBoard/Profile/Profile";
import WinningContest from "../Pages/DashBoard/UserDashBoard/WinningContest/WinningContest";
import AdminUser from "../Pages/DashBoard/AdminDashBoard/AdminUser/AdminUser";
import ManageContest from "../Pages/DashBoard/AdminDashBoard/ManageContest/ManageContest";
import AddContest from "../Pages/DashBoard/CreatorDashBoard/AddContest/AddContest";
import ContestSubmitted from "../Pages/DashBoard/CreatorDashBoard/ContestSubmitted/ContestSubmitted";
import CreatedContest from "../Pages/DashBoard/CreatorDashBoard/CreatedContest/CreatedContest";
import ContestDetails from "../Pages/Shared/ContestDetails/ContestDetails";
import AllUsers from "../Pages/DashBoard/AdminDashBoard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import UpdateContest from "../Pages/DashBoard/CreatorDashBoard/AddContest/UpdateContest";
import ContestInfo from "../Pages/DashBoard/CreatorDashBoard/ContestSubmitted/comopnents/ContestInfo";
import ContestWinners from "../Pages/DashBoard/CreatorDashBoard/ContestSubmitted/comopnents/ContestWinners";
import ArrayOfContests from "../Pages/AllContest/AllContest/ArrayOfContests";
import SubmittedContests from "../Pages/DashBoard/UserDashBoard/Profile/SubmittedContests";
import CommentBox from "../Pages/DashBoard/AdminDashBoard/ManageContest/CommentBox";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Comments from "../Pages/DashBoard/CreatorDashBoard/ContestSubmitted/Comments/Comments";
import Payment from "../Pages/Shared/Payment/Payment";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/allContests',
                element: <ArrayOfContests></ArrayOfContests>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path:'/signup',
                element: <SignUp></SignUp>
            },
            {
                path:'/submitted/:id',
                element: <ContestDetails></ContestDetails>,
                loader: ({params}) => fetch(`https://contest-hub-server-alpha.vercel.app/contests/${params.id}`)
            },
            {
               path: '/up'
            },
            {
              path:'/payment/:id',
              element:<Payment></Payment>,
              loader: ({params}) => fetch(`https://contest-hub-server-alpha.vercel.app/contests/${params.id}`)
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
          // normal user routes
          {
            path: 'participatedContest',
            element: <ParticipatedContest></ParticipatedContest>
          },
          {
            path: 'profile',
            element: <Profile></Profile>
          },
          {
            path: 'commentDetails',
            element: <CommentBox></CommentBox>
          },
          {
            path: 'submittedContests',
            element: <SubmittedContests></SubmittedContests>
          },
          {
            path: 'winningContest',
            element: <WinningContest></WinningContest>
          },
          {
            path: 'commentSection',
            element:<Comments></Comments>
          },
          // admin only routes
          {
            path: 'adminUser',
            element: <AdminRoute><AdminUser></AdminUser></AdminRoute>
          },
          {
            path: 'manageContest',
            element: <AdminRoute><ManageContest></ManageContest></AdminRoute>
          },
          {
            path: 'allUsers',
            element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
          },
          //creator routes
          {
            path:'addContest',
            element: <AddContest></AddContest>
          },
          {
            path: 'contestSubmitted',
            element: <ContestSubmitted></ContestSubmitted>
          },
          {
            path: 'createdContest',
            element: <CreatedContest></CreatedContest>
          },
          {
            path: 'createdContest/updatedContest/:id',
            element: <UpdateContest></UpdateContest>,
            loader: ({params}) => fetch(`https://contest-hub-server-alpha.vercel.app/contests/${params.id}`)
          },
          {
            path: 'contestSubmitted/contestInfo',
            element: <ContestInfo></ContestInfo>
          },
          {
            path: 'contestSubmitted/winnerDetails',
            element: <ContestWinners></ContestWinners>
          }
          
        //   {
        //     path: 'manageItems',
        //     element: <AdminRoute><ManageItems></ManageItems>
        //   },
        //   {
        //     path: 'updateItem/:id',
        //     element: <AdminRoute><UpdateItem></UpdateItem>,
        //     loader: ({params}) => fetch(`https://bistro-boss-server-seven-sage.vercel.app/menu/${params.id}`)
        //   },
        //   {
        //     path: 'users',
        //     element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        //   }
  
        ]
      }
])