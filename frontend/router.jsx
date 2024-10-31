import { createBrowserRouter } from "react-router-dom";
import Login from "./interfacePages/Login";
import Register from "./interfacePages/Register";
import Dashboard from "./interfacePages/Dashboard";
import RouteProtector from "./RouteProtector/RouteProtector";
import Admin from "./interfacePages/Admin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/dashboard",
        element: <RouteProtector><Dashboard/></RouteProtector>
    },
    {
        path:"/admin",
        element: <RouteProtector><Admin/></RouteProtector>
    }
])

export default router