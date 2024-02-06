import { getToken } from "../utils/helper"
import { Navigate } from "react-router-dom"
import { Dashboard } from '../components/dashboard'

import { DashboardLayout } from "../layouts/dashboard.layout"
import { Cart } from "../pages/cart";


const appRoutes = [
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            { path: "*", element: <Navigate to="/404" /> },
            { path: "", element: <Dashboard /> },
            
            /** category */
            // { path: "category", element: <CategoryList /> },
            // { path: "category/create", element: <CategoryCreate /> },
            // { path: "category/edit/:id", element: <CategoryEdit /> },
            { path: "cart", element: <Cart /> },
          
        ],
    }, 
]; 

/* Generate permitted routes */
export const permittedRoutes = () => {
    const token = getToken();
    if (token) {
        return appRoutes;
    }

    return [];
};