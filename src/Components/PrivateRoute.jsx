
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";


const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
  
    if (user) {
      return children;
    }
  
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  };
  

export default PrivateRoute;