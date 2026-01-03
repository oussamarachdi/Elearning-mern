import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { isLogged } = useContext(AuthContext);

    if (!isLogged) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
