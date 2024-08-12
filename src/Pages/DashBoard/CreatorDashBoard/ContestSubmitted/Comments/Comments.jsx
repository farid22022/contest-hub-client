import { comment } from "postcss";
import { useEffect, useState } from "react";
import Profile from "../../../../../../public/profile.png"
import usePersonalContests from "../../../../../Hooks/usePersonalContests";


const Comments = () => {
    const [comments, setComments] = useState([]);
    useEffect( () =>{
        fetch('https://contest-hub-server-alpha.vercel.app/commentDetails')
            .then(res => res.json())
            .then(data =>{
                setComments(data);
            });
    },[setComments]);

    

    return (
        <div>
            <h3 className="text-center text-xl text-black font-semibold mb-8">Comment Section</h3>
            <h2 className="text-black font-bold">Total comments: {comments.length}</h2>
            <div>
                {
                    comments.map((comment,index) =>
                    <div key={index} className="flex mt-8">
                        <div className="w-1/5 translate-x-36 translate-y-2">
                            <img src={Profile}/>
                        </div>
                        <div className="w-4/5 hover:translate-x-2 transition-all duration-500 rounded-md">
                            <div className="grid grid-cols-2">
                                <h2 className="font-semibold text-black">{comment.createdEmail}</h2>
                                <h2 className="-translate-x-7">{comment.commentTime}</h2>
                            </div>
                            <div>
                                <p>{comment.commentDescription}</p>
                            </div>
                            <div className="text-slate-400">Contest:{comment.contestName}</div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Comments;