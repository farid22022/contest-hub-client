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
            <h2>ManageContest {contests.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Name</th>
                        <th>Delete</th>
                        <th>Confirm</th>
                        <th>Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        contests.map((contest, index) =>(
                            <tr key={index}>
                                <th>{index+1}</th>
                                <td className="font-bold">{contest.name}</td>
                                <td><button onClick={() =>handleDeleteContest(contest._id)} className="btn btn-ghost btn-lg">Delete</button></td>
                                <td><button  className="btn btn-ghost btn-lg">Confirm</button></td>
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