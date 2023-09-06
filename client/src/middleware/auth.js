import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to={"/"} replace={true}></Navigate>;
    }

    return children;
};
export const ProtectUserRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to={"/profile"} replace={true}></Navigate>;
    }

    return children;
};

export const AuthorizeAdmin = ({ children }) => {
    const token = localStorage.getItem("adminToken");
  
    if (!token) {
      return <Navigate to={"/admin-login"} replace={true} />;
    }
  
    return children;
  };

export const ProtectAdminRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");
  
    if (token) {
      return <Navigate to={"/admin"} replace={true} />;
    }
  
    return children;
  };

export const ProtectRoute = ({ children }) => {
    const username = useSelector((state) => state.userReducer.username);

    if (!username) {
        return <Navigate to={"/profile"} replace={true}></Navigate>;
    }
    return children;
};
