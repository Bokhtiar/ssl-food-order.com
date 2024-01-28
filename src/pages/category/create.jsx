import { Toastify } from "../../components/toastify"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { useEffect, useState } from "react"
import { networkErrorHandeller } from "../../utils/helper"
import { SingleSelect, TextInput } from '../../components/input';

export const CategoryCreate = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    /* submit reosurce */
    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const payload = {
                ...data,
                parent_id: data?.parent_id?.value
            }

            const response = await NetworkServices.Category.store(payload)
            if (response && response.status === 201) {
                navigate('/dashboard/category')
                return Toastify.Success(response.data.message);
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }

    return <>
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl">Category Create</h2>
            <Link to="/dashboard/category">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    list
                </span> 
            </Link>
        </section>

        <section className="shadow-md my-5 p-4 px-6">
            <form className="px-4" onSubmit={handleSubmit(onSubmit)}>


                {/* category name */}
                <div className="mb-6 lg:mb-2">
                    <TextInput
                        label="Category Name"
                        name="category_name"
                        type="text"
                        placeholder="Enter category name"
                        control={control}
                        error={errors.category_name && errors.category_name.message}
                        rules={{ required: "Category Name is required" }}
                    />
                </div>

                {/* submit button */}
                <div className="my-4 flex justify-center">
                    <PrimaryButton loading={loading} name="submit"></PrimaryButton>
                </div>

            </form>
        </section>
    </>
}