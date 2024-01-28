import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toastify } from "../../components/toastify"
import { NetworkServices } from '../../network/index'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { PrimaryButton } from "../../components/button";
import { BreadCrumbs } from "../../components/breadCrumbs";
import { networkErrorHandeller } from "../../utils/helper";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SingleSelect, TextInput } from "../../components/input";


export const ProductCreate = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState()
    const [options, setOptions] = useState([])
    const [body, setBody] = useState()
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState();
    const [fields, setFields] = useState([{ size: '', price: '' }]);

    /** file submit */
    function handleChangeFile(event) {
        setFile(event.target.files[0])
    }
    console.log("ifle", file);
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("title", data?.title);
        formData.append("image", file);
        formData.append("body", body);
        formData.append("price", data?.price);
        formData.append("total_qty", data?.total_qty);
        formData.append("available_qty", data?.available_qty);
        formData.append("category_id", data?.category_id?.value);

        try {
            const response = await NetworkServices.Product.store(formData)
            navigate('/dashboard/product')
            return Toastify.Success(response.data.message);

        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    };

    /** fetchCategory */
    const fetchCategory = async () => {
        try {
            const results = [];
            const response = await NetworkServices.Category.index()
            console.log("cate res", response);
            if (response.status === 200) {
                const arrLenght = response.data.data.length;
                if (arrLenght > 0) {
                    for (let i = 0; i < arrLenght; i++) {
                        results.push({
                            value: response.data.data[i].category_id,
                            label: response.data.data[i].category_name,
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

    useEffect(() => {
        fetchCategory()
    }, [])

    return <>
        <BreadCrumbs title="Product Create" link="/dashboard/product" icon="list" />

        <section className="shadow-md my-5 p-4 px-6">
            <form enctype="multipart/form-data" className="px-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* product title */}
                    <TextInput
                        label="Product Title"
                        name="title"
                        type="text"
                        placeholder="Enter product title"
                        control={control}
                        error={errors.title && errors.title.message}
                        rules={{ required: "Product title is required" }}
                    />
                    {/* file */}

                    <div className="">
                        <p className="text-sm mb-1 text-gray-500">Image</p>
                        <input className="w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300" type="file" onChange={handleChangeFile} />
                    </div>
                    {/* product price */}
                    <TextInput
                        label="Product Price"
                        name="price"
                        type="text"
                        placeholder="Enter product price"
                        control={control}
                        error={errors.price && errors.price.message}
                        rules={{ required: "Product price is required" }}
                    />

                    {/* product title */}
                    <TextInput
                        label="Product Total qty"
                        name="total_qty"
                        type="number"
                        placeholder="Enter total qty"
                        control={control}
                        error={errors.total_qty && errors.total_qty.message}
                        rules={{ required: "Product total qty is required" }}
                    />

                    {/* product title */}
                    <TextInput
                        label="Product available qty"
                        name="available_qty"
                        type="number"
                        placeholder="Enter available qty"
                        control={control}
                        error={errors.available_qty && errors.available_qty.message}
                        rules={{ required: "Product available qty is required" }}
                    />

                    
                    {/* ctegory */}
                    <SingleSelect
                        label="Select Category"
                        name="category_id"
                        control={control}
                        error={errors.category_id && errors.category_id.message}
                        options={options}
                        isClearable={true}
                        placeholder="Select category"
                    />
                </div>
                

                <div className="mt-5">
                    <p className="text-sm mb-1 text-gray-500"> Body</p>
                    <CKEditor
                        {...register("body")}
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor&nbsp;5!</p>"
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log("body", data);
                            // console.log({ event, editor, data });
                            setBody(data)
                        }}
                        onBlur={(event, editor) => {
                            // console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            // console.log('Focus.', editor);
                        }}
                    />
                </div>

                {/* submit button */}
                <div className="my-4 flex justify-center col-span-2">
                    <PrimaryButton loading={loading} name="Product Submit"></PrimaryButton>
                </div>

            </form>
        </section>
    </>
}