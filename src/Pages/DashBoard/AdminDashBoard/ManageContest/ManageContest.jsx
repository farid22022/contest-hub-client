import Swal from "sweetalert2";
import useContest from "../../../../Hooks/useContest";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
// import { comment } from "postcss";
import './style.css'
import CommentBox from "./CommentBox";
export let commentedContest='';
export let commentedContestEmail =''
const ManageContest = () => {
    const [ contests ] = useContest();
    console.log(contests)
    const axiosSecure = useAxiosSecure();

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
                axiosSecure.patch(`/contests/${id}`)
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

    const handleDeleteContest = ( id) =>{
        

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
                axiosSecure.delete(`/contests/${id}`)
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

    

    


    return (
        <div>
            <h2 className="text-center">ManageContest </h2>
            <h2 className="text-left translate-x-5 text-xl ">Total Contest: <span className="text-red-900">{contests.length}</span></h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className="text-sm">
                        <th>Serial</th>
                        <th>Name</th>
                        <th className="translate-x-4">Delete</th>
                        <th className="translate-x-4">Confirm</th>
                        <th className="translate-x-24">Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        contests.map((contest, index) =>(
                            <tr key={index}>
                                <th className="translate-x-3">({index+1})</th>
                                <td className="font-bold ">{contest.name}</td>
                                <td><button onClick={() =>handleDeleteContest(contest._id)} className="btn btn-ghost btn-lg bg-orange-600">Delete</button></td>
                                <td>{
                                        (contest.accepted === true)?
                                        <button className="btn btn-ghost btn-lg bg-green-600">Confirmed</button>
                                        :
                                        <button onClick={()=>handleAcceptContest(contest._id)} className="btn btn-ghost btn-lg bg-red-600">Pending</button>
                                    }
                                </td>
                                <td>
                                    <CommentBox
                                    commentedContest={contest.name}
                                    commentedContestEmail={contest.createdEmail}
                                    ></CommentBox>
                                </td>
                            </tr>
                        ))
                    }
                    
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContest;