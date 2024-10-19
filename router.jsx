import { createBrowserRouter } from "react-router-dom";
import Login from "./frontend/interfacePages/Login";
import Register from "./frontend/interfacePages/Register";
import Dashboard from "./frontend/interfacePages/Dashboard";
import RouteProtector from "./frontend/RouteProtector/RouteProtector";

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
    }
])

export default router