import { createBrowserRouter } from "react-router-dom";
import Login from "./frontend/interfacePages/Login";
import Register from "./frontend/interfacePages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
])

export default router