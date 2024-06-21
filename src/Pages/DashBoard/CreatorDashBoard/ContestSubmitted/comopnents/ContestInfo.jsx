import useArrayOfNameAndEmails from "../../../../../Hooks/useArrayOfNameAndEmails";
import { contestName } from "./TableRow";
// import { contestName } from "../ContestSubmitted";


const ContestInfo = () => {

    const [extractedArrayOfNameAndEmails] = useArrayOfNameAndEmails();
    const SubmittedUsers = extractedArrayOfNameAndEmails.filter(contest =>(contest.name === contestName))
    console.log(SubmittedUsers);

    return (
        <div>
            <h2 className="text-xl font-bold ml-12 mb-3">Submitted Users are :</h2>
            {
                SubmittedUsers.map((user, userIndex) => 
                user.submittedEmails.map((email, emailIndex) =>
                <h2 className="text-xl font-bold ml-12 mb-3" key={`${userIndex}-${emailIndex}`}><span className="text-red-800">{emailIndex+1} </span>. Email : <span className=" text-blue-700 font-bold">{email}</span></h2>))
            }
        </div>
    );
};

export default ContestInfo;