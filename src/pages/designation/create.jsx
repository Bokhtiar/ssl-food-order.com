import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BreadCrumbs } from "../../components/breadCrumbs";
import { SkeletonForm } from "../../components/loading/skeleton-table";
import { PrimaryButton } from "../../components/button";
import { NetworkServices } from '../../network/index'
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { TextInput } from "../../components/input";

export const DesignationCreate = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true)
        const payload = {
            ...data
            
        }
        try {
            const response = await NetworkServices.Designation.store(payload)
            console.log("response", response);
            navigate('/dashboard/designation')
            return Toastify.Success(response.data.message);
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    };


    return <>
        <BreadCrumbs title="Designation Create" link="/dashboard/designation" icon="list" />
        {
            <section className="shadow-md my-5 p-4 px-6">
                <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Designation name */}
                        <TextInput
                            type="text"
                            name="name"
                            control={control}
                            label="Designation name"
                            placeholder="Enter designation name"
                            error={errors.name && errors.name.message}
                            rules={{ required: "Designation name is required" }}

                        />
                    </div>

                    {/* submit button */}
                    <div className="my-4 flex justify-center col-span-2">
                        <PrimaryButton loading={loading} name="Product Submit"></PrimaryButton>
                    </div>

                </form>
            </section>
        }

    </>
}