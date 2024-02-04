
import { permittedRoutes } from "./routes";
import { Login } from "./pages/auth/login";
import { ToastContainer } from "react-toastify";
import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "./pages/home";
import { MainLayout } from "./layouts/main.layout";

export const App = () => {

  const mainRoutes = { 
    path: "/",
    element: <MainLayout/>,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      
    ],
  };

  const routing = useRoutes([mainRoutes, ...permittedRoutes()]);
  
  return (
    <>
      {routing}
      <ToastContainer />
    </>
  );
}


