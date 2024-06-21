import Swal from "sweetalert2";
import useContest from "../../../../Hooks/useContest";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
// import { comment } from "postcss";
import './style.css'

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

    const handleComment = (e, contestName, createdEmail) =>{

        e.preventDefault();
        const form = e.target;
        const  commentDetails= form.commentDetails.value;

        console.log(contestName,contestName);
        
        

        Swal.fire({
            position:"top-start",
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                const comment ={
                    commentDescription:commentDetails,
                    contestName:contestName,
                    createdEmail:createdEmail
                }
                axiosSecure.post('/commentDetails',comment)
                .then(res =>{
                    console.log(res.data, "posted");
                })
                Swal.fire({
                    title: "Deleted!",
                    text: `This has contest been deleted.`,
                    icon: "success",
                    customClass:{
                        popup:'custom-popup'
                    }
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
                                <td><>
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Comment</button>
                                    <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Hello!</h3>
                                        <p className="py-4">Press ESC key or click the button below to close</p>
                                        
                                        <div className="modal-action grid grid-cols-1">
                                        <form  onSubmit={(e) =>handleComment(e,contest.name, contest.createdEmail)} className="card-body text-center modal-popup">
                                            <div className="form-control text-center">
                                            <label className="label">
                                                <span className="label-text">Comment Section</span>
                                            </label>
                                                <input type="text" name="commentDetails" placeholder="Comment" className="input input-bordered test-area" required />
                                            </div>
                                            <div className="form-control mt-2">
                                            <button className="lg:ml-36 btn btn-primary w-1/3 text-center">Comment it</button>
                                            </div>
                                        </form>
                                        <form method="dialog">
                                        
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">Close</button>
                                        </form>
                                        </div>
                                    </div>
                                    </dialog>
                                </></td>
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