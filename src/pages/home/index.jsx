import { Link } from "react-router-dom"
import { Images } from "../../utils/images"
import { PrimaryButton, SecButton } from "../../components/button"
import { SectionHeading } from "../../components/heading"
import { Product } from "../../components/product"
import {NetworkServices} from '../../network/index'
import { useCallback, useEffect, useState } from "react"
import { networkErrorHandeller } from "../../utils/helper"
 
export const Home = () => {
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])

    // category
    const fetchCategory = useCallback( async() => {
        try {
            const response = await NetworkServices.UserCategory.index()
            if (response.status === 200) {
                setCategory(response?.data?.data)
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    },[])

    // product
    const fetchProduct = useCallback(async()=> {
        try {
            const response = await NetworkServices.UserProduct.index()
            if (response.status === 200) {
                setProduct(response?.data?.data)
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    },[])
    
    // category has assign product
    const categoryHasAssingProduct =async(id)=> {
        const response = await NetworkServices.UserCategory.categoryHasAssignProduct(id)
        if (response.status === 200) {
            setProduct(response?.data?.data)
        }
    }

    useEffect(() =>{
        fetchProduct()
        fetchCategory()
    },[])
    return <>
        {/* https://dribbble.com/shots/21617600-Restaurant-Landing-Page-Design-UI */}

        <section className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* content section */}
                <div className=" col-span-1 my-auto">
                    <h1 className="text-6xl font-[800]">SSL WIRELESS</h1>
                    <h4 className="text-xl my-6 text-gray-600">Food is mainly composed of water, lipids, proteins, and carbohydrates. Minerals (e.g., salts) and organic substances (e.g., vitamins) can also be found in food.</h4>
                    <SecButton name="View Item"></SecButton>
                </div>

                {/* image section */}
                <div className=" col-span-1 my-auto">
                    <img src={Images.Banner} className="w-full" alt="" />
                </div>
            </div>

            {/* our menu */}
            <div className="my-12">
                {/* heading */}
                <SectionHeading title="Our Menu"></SectionHeading>
                {/* category */}
                <div className="flex items-center gap-5 my-6">
                    <span className=" border border-primary px-7 rounded-lg py-2 bg-primary text-white">All</span>
                    {
                        category.map((category, i) => {
                            return <span onClick={(e) => categoryHasAssingProduct(category.category_id)} className=" border border-primary px-7 rounded-lg py-2 hover:bg-primary hover:text-white">{category?.category_name}</span>
                        })
                    }
                   
                  </div>
                {/* category ways product */}
                <div className=" grid grid-cols-2 md:grid-cols-5 gap-5">
                    {
                        product.map((product, i) => {
                            return <Product key={i} {...product} ></Product>
                        })   
                    }
                    
                
                </div>
                
            </div>
        </section>
    </>
}