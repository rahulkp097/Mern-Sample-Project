import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import EditUser from "./EditUser";

const AdminBody = () => {
   const [userdata, setuserdata] = useState(null);
   const [searchData, setSearch] = useState(null);
   const [searchKeyword, setSerachKeyword] = useState(null);
   const navigate =useNavigate();
   useEffect(() => {
     callApi();
   }, [navigate]);
   async function callApi() {
     const data = await fetch("http://localhost:8000/admin/getdata");
     const json = await data.json();
     setuserdata(json);
     setSearch(json);
   }
   function search(item, details) {
     return details.filter((data) => {
       return (
         data?.name?.toLowerCase().includes(item?.toLowerCase()) ||
         data?.email?.toLowerCase().includes(item?.toLowerCase())
       );
     });
   }

   async function  deleteUser(id){
     await fetch('http://localhost:8000/admin/deleteuser/'+id);
     
     await callApi();
   }
   function editUser(id){
    navigate('/edituser/'+id)
   }

  return (
    <div className="bg-stone-600 flex justify-center items-center">
      <div className="container-xl">
        <div>
          <input
            type="search"
            placeholder="Search Users"
            className="rounded-l-lg py-1 px-2 focus:outline-none text-black rounded-md-full"
            onChange={(e) => {
              setSerachKeyword(e.target.value);
            }}
          />
          <button
            className=" hover:bg-gray-100 text-gray-800 font-semibold  border border-gray-400 rounded-r-full shadow py-1 px-2"
            onClick={() => {
              console.log("clicked here")
              const data = search(searchKeyword, userdata);
              console.log("data ",data)
              setSearch(data);
              console.log("search data",searchData)
            }}
          >
            Search
          </button>
        </div>
        <div className="table-responsive">
          <div className="table-wrapper p-8 rounded-md min-w-max shadow">
            <table className="table-fixed">
              <thead>
                {searchData?.length > 0 ? (
                  <tr>
                    <th className="m-2 p-2">Name</th>
                    <th className="m-2 p-2">Email</th>
                    <th className="m-2 p-2">Actions</th>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="3">
                      <p>No users</p>
                    </td>
                  </tr>
                )}
              </thead>
              <tbody>
                {searchData?.map((user) => (
                  <tr key={user._id}>
                    <td className="m-2 p-2">{user.name}</td>
                    <td className="m-2 p-2">{user.email}</td>
                    <td>
                      <button className="bg-slate-400 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={()=>{editUser(user._id)}}>
                        Edit
                      </button>{" "}
                      <button
                        className="bg-red-600 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={() => {
                          const shouldDelete = window.confirm(
                            "Are you sure you want to delete?"
                          );
                          if (shouldDelete) {
                            deleteUser(user._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBody;
