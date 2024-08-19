
import moment from "moment";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";


const CommentBox = ({ commentedContest, commentedContestEmail }) => {
    const currentTime = moment().format("dddd, MMMM D, YYYY");
    const [commentState, setCommentState] = useState({ isComment: false, commentId: null });
    currentTime
    const axiosPublic = useAxiosPublic();
    const { data: Comments = [], refetch } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/commentDetails');
            console.log(res.data);
            return res.data;
        }
    });

    const { user } = useAuth();



    useEffect(() => {
        const matchingComment = Comments.find(comment => comment.contestName === commentedContest);
        if (matchingComment) {
            setCommentState({ isComment: true, commentId: matchingComment._id });
        } else {
            setCommentState({ isComment: false, commentId: null });
        }
    }, [Comments, commentedContest]);

    console.log(Comments);
    console.log('._id',commentState.commentId,commentedContest);
    console.log(commentState);

    const handleComment = event => {
        event.preventDefault();
        const form = event.target;
        const comment = form.comment.value;

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Comment it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const newComment = {
                    commentDescription: comment,
                    contestName: commentedContest,
                    createdEmail: commentedContestEmail,
                    commentTime:currentTime,
                    authName:user.displayName,
                    authEmail:user.email
                };
                axiosPublic.post('/commentDetails', newComment).then(() => {
                    Swal.fire({
                        title: "Commented!",
                        icon: "success"
                    });
                    refetch();
                });
            }
        });
    };

    const handleDeleteComment = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This comment will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/commentDetails/${commentState.commentId}`)
                
                // axiosSecure.delete(`/users/${user._id}`)
                .then((res) => {
                    Swal.fire({
                        title: "Deleted!",
                        icon: "success"
                    });
                    console.log(res)
                    refetch();
                });
            }
        });
    };

    return (
        <div>
            {
                commentState.isComment ? 
                (
                    <button className="btn btn-error" onClick={handleDeleteComment}>Delete Previous Comment</button>
                ) 
                : 
                (
                    <form onSubmit={handleComment} className="card-body grid grid-cols-2">
                        <div className="form-control">
                            <input
                                type="text"
                                name="comment"
                                placeholder="text"
                                className="input input-bordered "
                                required
                            />
                        </div>

                        <div className="form-control w-1/3">
                            <button className="btn btn-primary p-3">Comment it!</button>
                        </div>
                    </form>
                )
            }
        </div>
    );
};

export default CommentBox;
