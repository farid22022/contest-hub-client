import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useContest from "../../../Hooks/useContest";


const CreatorPart = () => {

    const axiosPublic = useAxiosPublic();
    const {data : users =[], refetch} = useQuery({
        queryKey:['users'],
        queryFn: async () =>{
            const res = await axiosPublic.get('/users',{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
              }
            });
            return res.data
        }
    })
    console.log(users);
    

    const [contests, loading] = useContest();
    console.log(contests)

    const contestsCreatedByEmail = users.map(user => {
        const createdEmail = user.email;
        const createdContests = contests.filter(contest => contest.createdEmail === createdEmail);
        console.log(createdEmail, createdContests.length);
        return {
            email: createdEmail,
            contestsCount: createdContests.length
        };
    });
    const sortedContestsCreatedByEmail = contestsCreatedByEmail.sort((a, b) => b.contestsCount - a.contestsCount);
    console.log(contestsCreatedByEmail,sortedContestsCreatedByEmail);


    return (
        <div>
            <h2 className="text-center text-4xl font-bold text-blue-600">Best Creator Part</h2>
            <div className="text-center bg-zinc-700 p-5 mt-12 rounded-md grid grid-cols-1">
                {sortedContestsCreatedByEmail.map((creator, index) => (
                    <div className="btn border-b-pink-600 text-xl mb-4 bg-blue-700 pl-12" key={index}>
                        
                        {index+1}<span className="text-xl text-yellow-700">{creator.email}</span>creator  created contests : <span className="btn border-t-cyan-500 bg-red-700 rounded-3xl">{creator.contestsCount} </span>
                        {
                            (index === 0)?
                            <p className="bg-red-800 font-bold rounded-2xl p-2 ">Best Creator</p>
                            :
                            <></>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreatorPart;


// const newTitle = title.trim().toLowerCase();
// console.log('newTitle:', newTitle);
// console.log(submittedAssignments.length)

// let isTitleSubmitted = false;

// titles?.forEach(item => {
//     const itemTitle = item.title.trim().toLowerCase();
//     console.log('Comparing with item title:', itemTitle);

//     if (itemTitle === newTitle) {
//         console.log('Title matched:', item.title);
//         console.log(submittedAssignments)
//         const titleEmail = item.userEmail?.trim().toLowerCase() || ""; // Assuming you want to compare the userEmail of the title item
//         submittedAssignments?.forEach(submitted => {
//             const email = submitted.submittedEmail?.trim().toLowerCase() || "";
//             console.log('Checking submitted:', submitted.title);
//             if (email === titleEmail) {
//                 isTitleSubmitted = true;
//                 console.log(`Match found: ${submitted.submittedEmail}`);
//             }
//         });
//     }