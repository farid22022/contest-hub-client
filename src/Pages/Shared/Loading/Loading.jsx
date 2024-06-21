

const Loading = ({Length}) => {
    if(Length == 0)
        return(
     <div className="text-center space-x-3">
        <h2 className="text-2xl text-red-700 font-serif font-bold mb-12">No Internet</h2>
        {/* <span className="loading loading-spinner text-error pt-24  w-96 pl-4 text-6xl">No Internet</span> */}
        <progress className="progress w-56"></progress>
     </div>
    )
};

export default Loading;