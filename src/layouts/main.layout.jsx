import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export const MainLayout = () => {
    return (
        <>
            <section className="">
                <Navbar></Navbar>
                <Outlet />
                <Footer></Footer>
            </section>
        </>
    );
};
