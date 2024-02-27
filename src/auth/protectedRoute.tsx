import { useAuth } from "@clerk/clerk-react"
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { isSignedIn } = useAuth();

    return isSignedIn ? (<Outlet />) : (<Navigate to="/" replace />)
}