import { createBrowserRouter } from "react-router-dom";
import Login from "./frontend/interfacePages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    }
])

export default router