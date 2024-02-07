import { useForm } from "react-hook-form"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { getToken, networkErrorHandeller, setToken } from '../../utils/helper'
import { SingleSelect } from "../../components/input";

const inputStyle = "mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"

export const Register = () => {
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const [FloorOptions, setFloorOptions] = useState([]);
    const [loading, setLoading] = useState(false)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await NetworkServices.Authentication.login(data)
            if (response.status === 200) {
                setToken(response.data.data.token);
                navigate("/dashboard");
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }

    /* Handle search desingation */
    const handleSearchDesignation = async (input) => {
        try {
            const results = [];
            const response = await NetworkServices.UserDesignation.index()
            if (response.status === 200) {
                const arrLenght = response.data.data.length;
                if (arrLenght > 0) {
                    for (let i = 0; i < arrLenght; i++) {
                        results.push({
                            value: response.data.data[i].designation_id,
                            label: response.data.data[i].name,
                        });
                    }
                }
            }
            setOptions(results)
            return results;
        } catch (error) {
            if (error) {
                networkErrorHandeller(error);
                return [];
            }
        }
    };


    /* Handle search floor */
    const handleSearchFloor = async (input) => {
        try {
            const results = [];
            const response = await NetworkServices.UserFloor.index()
            if (response.status === 200) {
                const arrLenght = response.data.data.length;
                if (arrLenght > 0) {
                    for (let i = 0; i < arrLenght; i++) {
                        results.push({
                            value: response.data.data[i].floor_id,
                            label: response.data.data[i].name,
                        });
                    }
                }
            }
            setFloorOptions(results)
            return results;
        } catch (error) {
            if (error) {
                networkErrorHandeller(error);
                return [];
            }
        }
    };

    

    useEffect(() => {
        if (getToken()) {
            navigate("/dashboard");
        }
    }, [navigate]);

    useEffect(() => {
        handleSearchDesignation()
        handleSearchFloor()
    },[])

    return (
        <section className="flex items-center justify-center h-screen">
            <div className="shadow border border-green-100 rounded-lg" style={{ width: "400px" }}>
                <img height={60} width={60} className="mx-auto d-block border border-green-100 rounded-full mt-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzHlfUZS43dFCRG2rQ6HHMo6vfPecRCu7EuvEklOLlDg&s" alt="" />
                <form className="px-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* name */}
                    <div className="my-4">
                        <label className="block">
                            <label htmlFor="" className="uppercase text-[11px] font-bold">Name <span className=" text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                {...register("name", {
                                    required: true
                                })}
                                className={inputStyle}
                                placeholder="Mr. David lk" />
                            {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                        </label>
                    </div>

                    {/* email */}
                    <div className="my-4">
                        <label className="block">
                            <label htmlFor="" className="uppercase text-[11px] font-bold">Email <span className=" text-red-500">*</span></label>
                            <input
                                type="email"
                                name="email"
                                {...register("email", {
                                    required: true
                                })}
                                className={inputStyle}
                                placeholder="you@example.com" />
                            {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                        </label>
                    </div>

                    {/* phone */}
                    <div className="my-4">
                        <label className="block">
                            <label htmlFor="" className="uppercase text-[11px] font-bold">Phone <span className=" text-red-500">*</span></label>
                            <input
                                type="number"
                                name="phone"
                                {...register("phone", {
                                    required: true
                                })}
                                className={inputStyle}
                                placeholder="018XXXXXXXXXX" />
                            {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                        </label>
                    </div>

                    <div className='my-3'>
                        <SingleSelect
                            label="Select designation"
                            name="designation_id"
                            control={control}
                            error={errors.designation_id && errors.designation_id.message}
                            options={options}
                            isClearable={true}
                            placeholder="Select Designation"

                        />
                    </div>

                    <div className='my-3'>
                        <SingleSelect
                            label="Select Floor"
                            name="floor_id"
                            control={control}
                            error={errors.floor_id && errors.floor_id.message}
                            options={FloorOptions}
                            isClearable={true}
                            placeholder="Select Floor"

                        />
                    </div>

                    {/* password */}
                    <div className="my-4">
                        <label className="block">
                            <label htmlFor="" className="uppercase text-[11px] font-bold">Password <span className=" text-red-500">*</span></label>
                            <input
                                type="password"
                                name="password"
                                {...register("password", {
                                    required: true
                                })}
                                className={inputStyle}
                                placeholder="11111111" />
                            {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                        </label>
                    </div>
                    {/* submit button */}
                    <div className="my-4 flex justify-center">
                        <PrimaryButton loading={loading} name="submit"></PrimaryButton>
                    </div>

                </form>
            </div>
        </section>
    )
}