import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {useAdminlogoutMutation} from '../../slices/adminApiSllice'
import { toast } from 'react-toastify';
import { logoutAdmin } from '../../slices/adminauthSlice';



const AdminHome = () => {
    const [userdata,setuserdata] = useState(null);
    const [searchData,setSearch] =useState(null);
    const [searchKeyword,setSerachKeyword]=useState(null);
    useEffect(()=>{
       callApi();
    },[])
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
    const dispatch =useDispatch();
    const navigate =useNavigate();
    const [adminlogoutapicall] =useAdminlogoutMutation();
    const logoutHandler=async()=>{
        try{
        await adminlogoutapicall().unwrap();
        dispatch(logoutAdmin());
        navigate('/adminlogin', { replace: true });
        toast.error("logout successfully")
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div className=" min-h-screen  bg-gray-600 ">
      <div className="container-xl ">
        <div className="table-responsive">
          <div className="table-wrappe p-8 rounded-md min-w-max shadow">
            <div className="table-title pb-6 pt-16 text-white rounded-t-md">
              <div className="flex justify-between">
                <h2 className="text-2xl text-white">
                  Admin <b>Home</b>
                </h2>
                <div className="flex">
                  <input
                    type="search"
                    placeholder="Search Users"
                    className="rounded-l-lg py-1 px-2 focus:outline-none text-black rounded-md-full"
                    onChange={(e) => {
                      setSerachKeyword(e.target.value);
                    }}
                  />
                  <button
                    className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-r-full shadow p-2 "
                    onClick={async() => {
                      console.log("eneterd on serach data")
                      const data =await search(searchKeyword, userdata);
                      console.log(data ,"is data")
                      setSearch(data);
                      console.log(searchData);
                    }}
                  >
                    Search
                  </button>
                  <button
                    className="bg-red-500 ml-2 p-2 mr-2"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className=" bg-stone-600 flex justify-center items-center">
              <div className="container-xl">
                <div className="table-responsive">
                  <div className="table-wrapper p-8 rounded-md min-w-max shadow">
                    <table class="table-fixed ">
                      <thead>
                        <tr>
                          <th className="m-2 p-2">Name</th>
                          <th className="m-2 p-2">Email</th>
                          <th className="m-2 p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchData?.map((users) => (
                          <tr key={users._id}>
                            <td className="m-2 p-2">{users.name}</td>
                            <td className="m-2 p-2">{users.email}</td>
                            <td>
                              <button class="bg-slate-400 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Edit
                              </button>{" "}
                              <button class="bg-red-600 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome