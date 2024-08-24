import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import addIcon from './../../../../assets/Add/add.png'
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import { index } from "../../../../Layout/DashBoard";
import { motion } from "framer-motion";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddContest = () => {
    const { register, handleSubmit, control, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const [startDate, setStartDate] = useState(new Date());
    const {user} = useAuth();
    console.log(index)

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const contestItem = {
                name: data.name,
                description: data.description,
                price: data.price,
                gift: data.gift,
                submission: data.submission,
                date: data.date,
                image: res.data.data.display_url,
                tag:data.tag,
                createdEmail: user?.email
            };

            const contestRes = await axiosPublic.post('/contests', contestItem);
            console.log(contestRes.data);
            if (contestRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} contest is added .`,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }
        console.log('with image url', res.data);
        
    };

    return (
        
        <motion.div className="grid grid-cols-1  ml-72 p-2 hover:shadow-inner shadow-2xl shadow-slate-300  rounded-xl hover:shadow-slate-950 w-full transition-all duration-1000 "
            initial={{x:'-100vw'}}
            animate={{x: '-15vw'}}
            transition={{type:'spring', stiffness:350 ,  duration:.5}}
        >
            <h3 className=" text-yellow-900 hover:ml-16 hover:text-yellow-300 transition-all duration-1000  text-3xl bg-slate-600 font-bold text-center rounded-xl p-2">Add A Contest</h3>
            <form className="grid grid-cols-1 text-center justify-center items-center" onSubmit={handleSubmit(onSubmit)}
                

            >
                <div className=" form-control w-full"> 
                    <label className="label">
                        <span className="label-text">Contest Name</span>
                    </label>
                    <input className="hover:bg-neutral-950 transition-all duration-300 input input-bordered w-full" {...register("name", { required: true })} />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Image*</span>
                    </label>
                    <input className="hover:bg-neutral-950 transition-all duration-300 input input-bordered w-1/2" type="file" {...register("image")} />
                </div>

                <div className="flex space-x-3">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Contest Description</span>
                        </label>
                        <input className="hover:bg-neutral-950 transition-all duration-300 input input-bordered w-full" {...register("description")} />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Contest Price</span>
                        </label>
                        <input className="hover:bg-neutral-950 transition-all duration-300 input input-bordered w-full" {...register("price")} />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Prize Money or Gift</span>
                    </label>
                    <input className="hover:bg-neutral-950 transition-all duration-300 input input-bordered w-full" {...register("gift")} />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Text Submission</span>
                    </label>
                    <input className="hover:bg-neutral-950 transition-all duration-300 input input-bordered w-full" {...register("submission")} />
                </div>

                <div className="flex space-x-3">
                    <div className="form-control w-1/3 text-center">
                        <label className="label">
                            <span className="label-text">Last Date</span>
                        </label>
                        <Controller
                            control={control}
                            name="date"
                            defaultValue={startDate}
                            render={({ field }) => (
                                <DatePicker
                                    className="input input-bordered w-full"
                                    selected={field.value}
                                    onChange={(date) => {
                                        field.onChange(date);
                                        setStartDate(date);
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="form-control w-1/3 text-center">
                        <label className="label">
                            <span className="label-text">Contest Type*</span>
                        </label>
                        <select defaultValue="default" {...register('tag', { required: true })} className="select select-bordered w-full">
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

                <button className=" transition-all duration-1000 hover:text-xl hover:mt- btn w-1/4 mt-4">
                    Add Contest <img  src={addIcon}/>
                </button>
            </form>
            <button className="btn btn-ghost bg-blue-800 w-1/6 mt-6">Back</button>
        </motion.div>
    );
};

export default AddContest;
