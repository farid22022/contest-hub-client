import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";


const AddContest = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data)
    return (
        <div className="grid grid-cols-1">
            <form className="grid grid-cols-1 text-center justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                
                {/*  */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Contest Name</span>
                    </label>
                    <input 
                        className="input input-bordered w-full" 
                        {...register("Name",{required:true})} />

                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Image*</span>
                    </label>
                    <input 
                        className="input input-bordered w-1/2" 
                        {...register("image")} />

                </div>
                <div className="flex space-x-3 ">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Contest Description</span>
                        </label>
                        <input
                            className="input input-bordered w-full"  
                            {...register("description")} />

                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Contest Price</span>
                        </label>
                        <input
                            className="input input-bordered w-full"  
                            {...register("price")} />

                    </div>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Prize Money or Gift</span>
                    </label>
                    <input 
                        className="input input-bordered w-full" 
                        {...register("gift")} />

                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Text Submission</span>
                    </label>
                    <input 
                        className="input input-bordered w-full" 
                        {...register("submission")} />

                </div>
                <div className="flex space-x-3">
                    <div className="form-control w-1/3 text-center ">
                        <label className="label">
                            <span className="label-text">Last Date</span>
                        </label>
                        <input {...register("date")} />

                    </div>
                    <div className="form-control w-1/3 text-center ">
                    <label className="label">
                                <span className="label-text">Contest Type*</span>
                            </label>
                            <select defaultValue="default" {...register('tag', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a type</option>
                                <option value="Design Contests">Design Contests</option>
                                <option value="Article Writing">Article Writing</option>
                                <option value="Marketing Strategy">Marketing Strategy</option>
                                <option value="advertisement Contests">advertisement Contests</option>
                                <option value="Digital">Digital</option>
                                <option value="Gaming Review">Gaming Review</option>
                                <option value="Business Idea Concerts">Business Idea Concerts</option>
                                <option value="Movie Review">Movie Review</option>
                            </select>

                    </div>
                    
                </div>
                <button className="btn w-1/4">
                        Add Item <FaUtensils className="ml-4"></FaUtensils>
                    </button>
                
            </form>
        </div>
    );
};

export default AddContest;