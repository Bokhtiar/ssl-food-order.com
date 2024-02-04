import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { NetworkServices } from "../../network/index";
import { Product } from "../../components/product";
import { networkErrorHandeller } from "../../utils/helper";
import { Images } from "../../utils/images";
import {ImageShow} from '../../utils/helper'

export const ProductShow = () => {
    const { id } = useParams();
    const [product, setProduct] = useState()
    const [categoryPorduct, setCategoryProduct] = useState([])

    /** single resource */
    const fetchData = useCallback(async () => {
        try {
            const response = await NetworkServices.UserProduct.show(id)
            if (response.status === 200) {
                setProduct(response?.data?.data)
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    }, [id])

    /** category product */
    const fetchCategoryHasAssingProduct = useCallback(async() => {
        try {
            const response = await NetworkServices.UserCategory.categoryHasAssignProduct(product?.category_id)
            if (response.status === 200) {
                setCategoryProduct(response?.data?.data)
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    },[product])

    useEffect(() => {
        fetchData()
        fetchCategoryHasAssingProduct()
    }, [])
    
    
    console.log("product category", categoryPorduct);

    return <>
        {
            product ? <section className="">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-3 container">
                    {/* product image */}
                    <div className=" col-span-1  md:my-5 rounded-lg">
                        <img src={ImageShow(product?.image)} alt="" className="mx-auto md:h-96  h-72 rounded-2xl" />
                        {/* <div className="grid grid-cols-4 md:grid-cols-7 gap-4 py-5 justify-center md:flex md:px-14">
                            <img src={Images.Banner} alt="" className="mx-auto md:h-14 h-14 w-28  border border-primary rounded-md hover:bg-primary" />
                            <img src={Images.Banner} alt="" className="mx-auto md:h-14 h-14 w-28  border border-primary rounded-md hover:bg-primary" />
                            <img src={Images.Banner} alt="" className="mx-auto md:h-14 h-14 w-28  border border-primary rounded-md hover:bg-primary" />
                            <img src={Images.Banner} alt="" className="mx-auto md:h-14 h-14 w-28  border border-primary rounded-md hover:bg-primary" />
                            <img src={Images.Banner} alt="" className="mx-auto md:h-14 h-14 w-28  border border-primary rounded-md hover:bg-primary" />
                            <img src={Images.Banner} alt="" className="mx-auto md:h-14 h-14 w-28  border border-primary rounded-md hover:bg-primary" />
                        </div> */}
                    </div>

                    {/* product image */}
                    <div className=" col-span-1 md:my-5">
                        <p className="flex items-center mb-4">
                            <span className="text-gray-400 font-content text-sm">Home/</span>
                            <span className="text-gray-400 font-content px-1 text-sm"> Product/</span>
                            <span className="text-gray-600 font-content font-bold text-sm"> Mango tree</span>
                        </p>
                        <h3 className=" font-heading text-2xl text-primary">{product?.title}</h3>

                        <h4 className=" font-heading text-primary">{product?.price} TK</h4>

                        <p className="flex items-center font-content my-5">
                            <span class="material-symbols-outlined text-gray-400">
                                category
                            </span>
                            <span>{product?.category?.category_name}</span>
                        </p>
                       

                        <Link to="" className='font-bold border rounded-lg px-4 font-content md:text-[12px] text-[12px] py-1 border-primary hover:bg-primary hover:text-white transition delay-150 text-gray-600'>Add To Card</Link>
                        <h4 className="mt-5 font-heading text-gray-700 ">Product Details</h4>
                        <p className="text-gray-500 text-justify font-content text-sm">
                            {product?.body}
                        </p>
                    </div>
                </section>

                {/* releted product */}
                <div className='bg-gray-100 my-16'>
                    <section className='container py-16'>
                        <div className='p-5 bg-white py-4'>
                            {/* div header */}
                            <div className='flex items-center justify-between'>
                                <span className=' font-heading text-primary text-md md:text-xl py-5'>Suggested Product for you</span>
                            </div>

                            {/* product list */}
                            <section className='grid grid-cols-2 md:grid-cols-5 gap-4 my-4'>
                                {
                                    categoryPorduct.map((item, i) => {
                                        return <Product key={i} price={item.price} title={item.title} product_id={item.product_id} image={item.image} ></Product>
                                    })
                                }
                            </section>
                        </div>
                    </section>
                </div>
            </section> : <>loading</>
        }

    </>
}