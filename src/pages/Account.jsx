import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  // const handleHome= async()=>{
  //   navigate('/home');
  // }
  return (
    <div className="">
      {/* <div>Account : {user && user.email}</div> */}
      
        <button
          onClick={handleLogout}
          className="bg-purple-800
          hover:bg-purple-900 font-bold px-2 py-1 rounded-md text-white my-1 shadow-3xl  hover:animate-bounce hover:duration-500"
        >
          Logout
        </button>
        {/* <button onClick={handleHome}>Home</button> */}
      
    </div>
  );
};

export default Account;
