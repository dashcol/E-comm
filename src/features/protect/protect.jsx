import { useSelector } from "react-redux";
import { userSelector } from "../Users/redux/user.redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useSelector(userSelector);
  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}
