import { Navigate } from "react-router-dom";
import {AuthContext} from "../Contexts/AuthProvider"
import { useContext } from 'react';

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    if(user){
        return children
    }
    return <Navigate to="/login"/>
};

export default PrivateRoute;