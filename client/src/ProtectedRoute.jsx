import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const card = JSON.parse(localStorage.getItem("card"));
    if(!card) return <Navigate to={"/card"}/>
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute
