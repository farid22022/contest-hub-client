import Swal from "sweetalert2";
import useArrayOfNameAndEmails from "../../../../../Hooks/useArrayOfNameAndEmails";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import { contestName } from "../ContestSubmitted";


const ContestWinners = () => {
    const [extractedArrayOfNameAndEmails] = useArrayOfNameAndEmails();
    const SubmittedUsers = extractedArrayOfNameAndEmails.filter(contest =>(contest.name === contestName))
    console.log(SubmittedUsers);
    SubmittedUsers

    const axiosPublic = useAxiosPublic();

        
    const  isDeclared = false;
    
    
    console.log(isDeclared)
    
    
    
    

    const handleDeclare = (email) =>{

        console.log(email);
        const winnerDetail = {
            winnerEmail:email,
            winnerContest:contestName
        }

        Swal.fire({
            title: "Are you sure?",
            text: `${winnerDetail.winnerEmail} will be the winner` ,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.post('/winnerDetails',winnerDetail)
                .then(res =>{
                    console.log(res.data)
                })

                
                axiosPublic.patch(`/submits?name=${contestName}&anotherParam=${email}`)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.error(err);
                    });

                Swal.fire({
                    title: "Done",
                    text: `${winnerDetail.winnerEmail} is now winner of this ${contestName}`,
                    icon: "success"
                });
            }
          });
        

    }
    
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Serial</th>
                    <th>Email</th>
                    <th>Select</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {
                    SubmittedUsers.map((user, userIndex) => 
                        user.submittedEmails.map((email, emailIndex) =>
                            <tr className="skeleton" key={`${userIndex}-${emailIndex}`}>
                                <th>{1+emailIndex}</th>
                                <td>{email}</td>
                                <td>
                                    <button onClick={() => handleDeclare(email)} className="btn btn-error">Declare</button>
                                </td>
                            </tr>))

                }
                
                
                </tbody>
            </table>
        </div>
    );
};

export default ContestWinners;