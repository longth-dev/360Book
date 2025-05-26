import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutesAdmin = () => {
    const roles = getRoleFromToken()
    console.log(roles)
    return roles && roles.includes("ADMIN") ? <Outlet /> : <Navigate to="/login" />
}

function getRoleFromToken() {
    const token = localStorage.getItem('token');

    if (token) {
        const decodedToken = jwtDecode(token);
        const roles = decodedToken.scope ? [decodedToken.scope] : [];
        return roles;
    }
    return null;
}

export default ProtectedRoutesAdmin