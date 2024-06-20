import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Contest from "../../../Home/AllContest/Contest";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAdmin from "../../../../Hooks/useAdmin";
import Swal from "sweetalert2";


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

    const handleAcceptContest = id =>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/contests/${id}`)
                    .then(res => {
                        console.log("accepted",res.data)
                    })
                Swal.fire({
                    title: "Accepted!",
                    text: "This contest has been accepted.",
                    icon: "success"
              });
            }
          });

        
       
    }
    
        

    return (
        <div className="grid grid-cols-1 text-center space-y-3">
            <h2 className="text-2xl font-bold text-blue-500 ">Created Contest {createdContests.length}</h2>
            
            <div>
                   
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Status</th>
                            <th>Submission</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            (!createdContests.length === 0)?
                            <div>
                               {
                                createdContests.map((contest, index) =>(
                                <tr key={contest._id}>
                                    
                                    <td className="text-yellow-500 font-serif font-bold text-xl">{index+1}</td>
                                    <td><button className="btn btn-info">{contest.name}</button></td>
                                    {
                                        ((!(contest.accepted === true)) && isAdmin)?
                                        <td>
                                            <Link to={`updatedContest/${contest._id}`}>
                                                <button className="btn btn-success">Update</button>
                                            </Link>
                                        </td>
                                        :
                                        <td><button onClick={handleNoUpdate} className="btn btn-info">Update</button></td>
                                    }
                                    {
                                        ((!(contest.accepted === true)) && isAdmin)?
                                        
                                        <td><button onClick={() => handleDeleteContest(contest._id)} className="btn btn-warning">Delete</button></td>
                                        :
                                        <td><button onClick={handleNoDelete} className="btn btn-info">Delete</button></td>
                                        
                                    }
                                    <th>
                                        {
                                            isAdmin ?
                                                <div>
                                                    {
                                                        contest.accepted?
                                                            <button  className="btn btn-success">Accepted</button>
                                                            :
                                                            <button onClick={()=>handleAcceptContest(contest._id)} className="btn btn-success">Pending</button>
                                                    }
                                                </div>
                                                :
                                                <button className="btn btn-success">You are not Admin</button>
                                        }
                                    </th>
                                    <th>
                                        <button className="btn btn-success">Submit</button>
                                    </th>

                                </tr>
                            ))}
                            </div>
                            :
                            <div>
                                <span className="loading loading-spinner text-error pt-24 mt-48 w-24 lg:ml-96 pl-4 text-6xl">No Internet</span>
                            </div>


                        }
                            
                        
                        </tbody>
                        
                        
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreatedContest;