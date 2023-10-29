import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

function PrivateRoute({ children, roles }) {
    const { isLogueado, role } = useContext(AuthContext);
    
    if (!isLogueado || (roles && !roles.includes(role))) {
        return <Navigate to="/cacharreria_cosas_bonitas/" />;
    }

    return children;
}

export default PrivateRoute;
