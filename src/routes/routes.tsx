import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../pages/login/login"
import Profile from "../pages/profile/profile"


function AppRoutes() {
  return (
    <>
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/login" />} />
     </Routes>
    </>
  )
}

export default AppRoutes