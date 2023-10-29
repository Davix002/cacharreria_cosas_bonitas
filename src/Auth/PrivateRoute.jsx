import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import PropTypes from 'prop-types';

function PrivateRoute({ children, roles }) {
    const { isLogueado, role } = useContext(AuthContext);
    
    if (!isLogueado || (roles && !roles.includes(role))) {
        return <Navigate to="/cacharreria_cosas_bonitas/" />;
    }

    return children;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    roles: PropTypes.arrayOf(PropTypes.string)
};