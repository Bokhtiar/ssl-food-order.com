
import { permittedRoutes } from "./routes";
import { Login } from "./pages/auth/login";
import { ToastContainer } from "react-toastify";
import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "./pages/home";
import { MainLayout } from "./layouts/main.layout";
import { ProductShow } from "./pages/product/show";
import { CartProvider } from "./contextApi/cartContext";

export const App = () => {

  const mainRoutes = { 
    path: "/",
    element: <MainLayout/>,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <Home /> },
      { path: "/product/show/:id", element: <ProductShow /> },
      { path: "/login", element: <Login /> },
      
    ],
  };

  const routing = useRoutes([mainRoutes, ...permittedRoutes()]);
  
  return (
    <>
      <CartProvider> 
      {routing}
      <ToastContainer />
      </CartProvider>
    </>
  );
}


