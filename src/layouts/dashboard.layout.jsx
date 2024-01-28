import { Outlet } from "react-router-dom";
import { DashboardNavbar } from "../components/dashboardNavbar";
import { DashboardSidebar } from "../components/DashboardSidebar";

export const DashboardLayout = () => {
    return (
        <>
            <section className="">
                <div className="grid grid-cols-1 md:grid-cols-5 ">
                    <DashboardSidebar />
                    <div className=" col-span-4">
                        <div> <DashboardNavbar /> </div>
                        <div className="p-3"><Outlet /></div>
                    </div>
                </div>
            </section>
        </>
    );
};
