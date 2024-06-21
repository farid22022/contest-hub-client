import usePersonalSubmittedContests from "./usePersonalSubmittedContests";


const useArrayOfNameAndEmails = () => {
    const allContestsSubmitted = usePersonalSubmittedContests();
    console.log(allContestsSubmitted[0]);
    const nameToInfoMap = {};

    // Iterate through the array and populate the object
    allContestsSubmitted[0].forEach(obj => {
        if (!nameToInfoMap[obj.name]) {
            nameToInfoMap[obj.name] = {
                prizeMoney: obj.prizeMoney,
                submittedEmails: [],
                winner: obj?.winner
            };
        }
        nameToInfoMap[obj.name].submittedEmails.push(obj.submittedEmail);
    });

    // Transform the object into the desired array format
    const extractedArrayOfNameAndEmails = Object.keys(nameToInfoMap).map(name => ({
        name: name,
        prizeMoney: nameToInfoMap[name].prizeMoney,
        submittedEmails: nameToInfoMap[name].submittedEmails,
        winner:nameToInfoMap[name].winner
    }));

    console.log(extractedArrayOfNameAndEmails);
 
    
    return [extractedArrayOfNameAndEmails];

};

export default useArrayOfNameAndEmails;