import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAdminlogoutMutation } from "../../slices/adminApiSllice";
import { toast } from "react-toastify";
import { logoutAdmin } from "../../slices/adminauthSlice";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminlogoutapicall] = useAdminlogoutMutation();

  const logoutHandler = async () => {
    try {
      await adminlogoutapicall().unwrap();
      dispatch(logoutAdmin());
      navigate("/adminlogin", { replace: true });
      toast.error("Logout successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between bg-gray-500">
      <Link to='/adminhome'>
        <h2 className="text-2xl text-black ml-3 px-1 py-1">
          Admin <b>Home</b>
        </h2>
      </Link>
      <div className="flex">
        <button
          className="ml-2 p-2 mr-2 text-black"
          onClick={() => navigate("/adduser")}
        >
          Add new User
        </button>
        <button className="bg-red-500 ml-2 p-2 mr-2" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
