import { useForm, Controller } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddContest = () => {
    const { register, handleSubmit, control, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const [startDate, setStartDate] = useState(new Date());
    const {user} = useAuth()

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
        <div className="grid grid-cols-1">
            <form className="grid grid-cols-1 text-center justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Contest Name</span>
                    </label>
                    <input className="input input-bordered w-full" {...register("name", { required: true })} />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Image*</span>
                    </label>
                    <input className="input input-bordered w-1/2" type="file" {...register("image")} />
                </div>

                <div className="flex space-x-3">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Contest Description</span>
                        </label>
                        <input className="input input-bordered w-full" {...register("description")} />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Contest Price</span>
                        </label>
                        <input className="input input-bordered w-full" {...register("price")} />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Prize Money or Gift</span>
                    </label>
                    <input className="input input-bordered w-full" {...register("gift")} />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Text Submission</span>
                    </label>
                    <input className="input input-bordered w-full" {...register("submission")} />
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

                <button className="btn w-1/4 mt-4">
                    Add Item <FaUtensils className="ml-4" />
                </button>
            </form>
        </div>
    );
};

export default AddContest;
