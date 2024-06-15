import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import AllContest from "../Pages/AllContest/AllContest";
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

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Main></Main>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/allContests',
                element: <AllContest></AllContest>
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
                loader: ({params}) => fetch(`http://localhost:5000/contests/${params.id}`)
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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
            path: 'winningContest',
            element: <WinningContest></WinningContest>
          },
          // admin only routes
          {
            path: 'adminUser',
            element: <AdminUser></AdminUser>
          },
          {
            path: 'manageContest',
            element: <ManageContest></ManageContest>
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