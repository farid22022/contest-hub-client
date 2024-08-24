import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
// import Contest from "../../../Home/AllContest/Contest";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAdmin from "../../../../Hooks/useAdmin";
import Swal from "sweetalert2";
import { index } from "../../../../Layout/DashBoard";
import { motion } from "framer-motion";


const CreatedContest = () => {

    

    const [isAdmin] = useAdmin();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { data : createdContests=[]} = useQuery({
        queryKey: ['createdContest'],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/contests?email=${user.email}`);
            const Contests = res.data;
            const PersonalContests = Contests.filter(contest => contest.createdEmail === user.email)
            return PersonalContests;
        }
        
    })
    console.log(createdContests);

    const handleNoUpdate =() =>{
        Swal.fire({
            title: "You Can Not Update",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
    }

    const handleNoDelete = () =>{
        Swal.fire({
            title: "Alert!",
            text: "Only admin can delete it . You are not admin",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
    }

    const handleDeleteContest = id =>{
        

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/contests/${id}`)
                .then(res =>{
                    console.log(res.data, "deleted");
                })
                Swal.fire({
                    title: "Deleted!",
                    text: `This has contest been deleted.`,
                    icon: "success"
              });
            }
          });
        
    }

    const handleAcceptContest = () =>{

        Swal.fire({
            title: "Alert!",
            text: "Only admin can accept it . You are not admin",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
    }

    // if(createdContests.length == 0)
    //     return(
    // //  <span className="loading loading-spinner text-error pt-24 mt-48 w-24 lg:ml-96 pl-4 text-6xl">No Internet</span>
    //     <progress className="loader progress w-56"></progress>
    // )
    
        

    return (
        <div className="grid grid-cols-1 text-center space-y-3">
            {
                (index === 1)?
                <h2 className="text-2xl font-bold text-blue-500 translate-x-56 hover:text-yellow-400  duration-1000">Created Contest {createdContests.length}</h2>
                :
                <h2 className="text-2xl font-bold text-blue-500  hover:text-yellow-400  duration-1000">Created Contest {createdContests.length}</h2>
            }
            
            <div>
                   
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th >Serial</th>
                                <th className="translate-x-5">Name</th>
                                <th className="translate-x-4">Update</th>
                                <th className="translate-x-3">Delete</th>
                                <th className="translate-x-5">Status</th>
                                <th>Submission</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            
                               
                                createdContests.map((contest, index) =>{
                                    let initialPosition={};

                                    if((index%3) === 0){
                                        initialPosition = { x :'-100vw' }
                                    }
                                    else if((index%3) === 1){
                                        initialPosition = { y : '100vw' }
                                    }
                                    else if((index%3) === 2){
                                        initialPosition = { x :'100vw' }
                                    }

                                    return (
                                        <motion.tr key={index}
                                          initial={initialPosition}
                                          animate={{x:0, y:0}}
                                          transition={{type:'spring', stiffness:250, delay:index, duration:index}}
                                        >
                                    
                                    <td className="text-yellow-500 font-serif font-bold text-xl translate-x-2">[{index+1}]</td>
                                    <td><button className="btn btn-info">{contest.name}</button></td>
                                    {
                                        ((!(contest.accepted === true)) )?
                                        <td>
                                            <Link to={`updatedContest/${contest._id}`}>
                                                <button className="btn btn-success">Update</button>
                                            </Link>
                                        </td>
                                        :
                                        <td><button onClick={handleNoUpdate} className="btn btn-info">Update</button></td>
                                    }
                                    {
                                        ((!(contest.accepted === true)) )?
                                        
                                        <td><button onClick={() => handleDeleteContest(contest._id)} className="btn btn-warning">Delete</button></td>
                                        :
                                        <td><button onClick={handleNoDelete} className="btn btn-info">Delete</button></td>
                                        
                                    }
                                    <th>
                                        
                                        {
                                            contest.accepted?
                                                <button  className="btn btn-success">Accepted</button>
                                                :
                                                <button onClick={()=>handleAcceptContest(contest._id)} className="btn btn-success bg-red-600">Pending</button>
                                        }
                                                
                                    </th>
                                    <th>
                                        <Link to="/dashboard/contestSubmitted"><button className="btn btn-success">Submit</button></Link>
                                    </th>

                                </motion.tr>
                                    )
                                })
                            }
                            


                        
                            
                        
                        </tbody>
                        
                        
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreatedContest;

                             