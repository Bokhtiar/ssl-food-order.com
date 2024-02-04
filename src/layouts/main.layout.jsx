import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";

export const MainLayout = () => {
    return (
        <>
            <section className="">
                <Navbar></Navbar>
                <Outlet />
            </section>
        </>
    );
};
