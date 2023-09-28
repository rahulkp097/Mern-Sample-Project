import React, { useState,useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { TEInput, TERipple } from "tw-elements-react";
import { useAdminloginMutation} from '../../slices/adminApiSllice';
import { setCredentialsAdmin } from '../../slices/adminauthSlice';
import { useDispatch,useSelector } from 'react-redux';
import {toast} from 'react-toastify'
const Adminlogin= () => {
  const [userName,setUsername] = useState('');
  const [password,setPassword] =useState('');
  const dispatch =useDispatch();
  const navigate = useNavigate();
  
  const [adminlogin] = useAdminloginMutation()

  const { adminInfo } = useSelector((state) => state.adminauth);
  

  console.log(adminInfo)
   useEffect(() => {
    if (adminInfo) {
      navigate('/adminhome');
    }
  }, [navigate, adminInfo]);
   const handleSubmit = async (e)=>{
    e.preventDefault();
    if(userName.trim()===''){
      toast.error("enter a valid username")
      return;
    }
    if(password.trim()===''){
      toast.error("enter a valid password")
      return;
    }
    try {
      const res = await adminlogin({ userName, password }).unwrap();
      console.log(res)
      dispatch(setCredentialsAdmin({ ...res }));

        navigate('/adminhome');
    
    } catch (err) {
      console.log(err)
      toast.error(err?.data.message)
      
    }

  }
  return (
    <section className="h-screen">
      <div className="flex flex-row items-center justify-center ">
                <p className="mb-0 mr-4 text-5xl text-gray-600 mt-5">Admin login page</p>
                </div>
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          
          <div className="mt-0 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 pr-5">
            <form onSubmit={handleSubmit}>
         
              <TEInput
                type="text"
                label="username"
                size="lg"
                className="mb-6 mr-3"
                onChange={(e)=>setUsername(e.target.value)}
              ></TEInput>

              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
                onChange={(e)=>setPassword(e.target.value)}
              ></TEInput>
         
              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">
                  <button
                     type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Login
                  </button>
                </TERipple>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Adminlogin