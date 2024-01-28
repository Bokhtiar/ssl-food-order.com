import { useCallback, useEffect, useState } from "react"
import {networkErrorHandeller} from '../../utils/helper'
import {NetworkServices} from "../../network/index"
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form"
import { Toastify } from "../../components/toastify";
import { TextInput } from "../../components/input";
import { PrimaryButton } from "../../components/button";

export const CategoryEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [show, setShow] = useState()
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
            const response = await NetworkServices.Category.update(payload, id)
            if (response.status === 201) {
                navigate('/dashboard/category')
                return Toastify.Success(response.data.message);
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }


    const fetchCategory = useCallback(async() => {
        try {
            setLoading(true)
            const response = await NetworkServices.Category.show(id);
            setLoading(false)
            if (response.status === 200) {
                setShow(response?.data?.data)
            } 
        } catch (error) {
            networkErrorHandeller(error)    
        }
    },[id])

    useEffect(() => {
        fetchCategory()
    },[])

    return <>
        {
            show ? <>
                <form className="px-4" onSubmit={handleSubmit(onSubmit)}>


                    {/* category name */}
                    <div className="mb-6 lg:mb-2">
                        <TextInput
                            label="Category Name"
                            name="category_name"
                            type="text"
                            placeholder="Enter category name"
                            control={control}
                            defaultvalue={show?.category_name || ""}
                            error={errors.category_name && errors.category_name.message}
                            rules={{ required: "Category Name is required" }}
                        />
                    </div>

                    {/* submit button */}
                    <div className="my-4 flex justify-center">
                        <PrimaryButton loading={loading} name="submit"></PrimaryButton>
                    </div>

                </form>
            </> : <>loading</>
        }
    </>


}