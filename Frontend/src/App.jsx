

import {Routes, Route, data } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Admin from "./pages/Admin";
import { checkAuth } from "./authSlice";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router";
import ProblemPage from "./pages/ProblemPage";
import AdminDelete from "./Components/AdminDelete";
import AdminPanel from "./Components/AdminPanel";

export default function App(){

  const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])

  if(loading){
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>

    </div>
  }

  return (
    <>
    <Routes>
      <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
      <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<Login></Login>}></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<Signup></Signup>}></Route>
      <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin/> : <Navigate to='/' /> } ></Route>
      <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel/> : <Navigate to='/' /> } ></Route>
      <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete/> : <Navigate to='/'/>} ></Route>

      <Route path="/problem/:problemId" element={<ProblemPage/>}></Route>
    </Routes>
    </>
  )
}

