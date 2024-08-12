import Swal from "sweetalert2";
import useArrayOfNameAndEmails from "../../../../../Hooks/useArrayOfNameAndEmails";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import { contestName } from "./TableRow";
import { useNavigate } from "react-router-dom";
// import { contestName } from "../ContestSubmitted";


const ContestWinners = () => {
    const [extractedArrayOfNameAndEmails] = useArrayOfNameAndEmails();
    const SubmittedUsers = extractedArrayOfNameAndEmails.filter(contest =>(contest.name === contestName))
    console.log(SubmittedUsers);
    // SubmittedUsers
    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();

    let winnerEmail='';
    let isDeclared = false;
    SubmittedUsers.forEach(user => {
        if (Object.prototype.hasOwnProperty.call(user, 'winner')) {
            if(user.winner)
            isDeclared = true;
            winnerEmail=user.winner;
            console.log('Winner:', user.winner,winnerEmail);

        } else {
            console.log('No winner field for this user:', user);
            isDeclared=false;
            winnerEmail='';
        }
    });
    console.log(isDeclared);

    const handleDeclare = (email) =>{

        
            

        console.log(email);
        const winnerDetail = {
            winnerEmail:email,
            winnerContest:contestName,
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

                navigate('/')
            }
          });
        

    }
    
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th className="text-center">Serial</th>
                    <th className="text-center">Submitted User's Email</th>
                    <th className="text-center">Winner</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {
                    SubmittedUsers.map((user, userIndex) => 
                        user.submittedEmails.map((email, emailIndex) =>
                            <tr className="skeleton" key={`${userIndex}-${emailIndex}`}>
                                <th className="text-center">{1+emailIndex}</th>
                                <td className="text-center">{email}</td>
                                <td className="text-center">
                                    {
                                        (isDeclared == false)?
                                        <button onClick={() => handleDeclare(email)} className="btn btn-error">Declare</button>
                                        :
                                        <button  className="btn btn-error">Winner is:  {winnerEmail}</button>
                                    }
                                </td>
                            </tr>))

                }
                
                
                </tbody>
            </table>
        </div>
    );
};

export default ContestWinners;