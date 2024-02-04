import { Link } from "react-router-dom"
import { Images } from "../../utils/images"
import { PrimaryButton, SecButton } from "../../components/button"
import { SectionHeading } from "../../components/heading"

export const Home = () => {
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
                <div className="flex items-center gap-5">
                    <span className=" border border-primary px-7 rounded-lg py-2 bg-primary text-white">All</span>
                    <span className=" border border-primary px-7 rounded-lg py-2 hover:bg-primary hover:text-white">Coffea</span>
                    <span className=" border border-primary px-7 rounded-lg py-2 hover:bg-primary hover:text-white">Coffea</span>
                    <span className=" border border-primary px-7 rounded-lg py-2 hover:bg-primary hover:text-white">Coffea</span>
                    <span className=" border border-primary px-7 rounded-lg py-2 hover:bg-primary hover:text-white">Coffea</span>
                </div>
                {/* category ways product */}
                
            </div>
        </section>
    </>
}