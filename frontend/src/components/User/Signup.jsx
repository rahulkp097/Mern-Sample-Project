import React, { useState,useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { TEInput, TERipple } from "tw-elements-react";
import { useDispatch,useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import { useRegisterMutation } from '../../slices/userApiSlice';
import {toast} from 'react-toastify'
const Signup = () => {
    const [name,setName] =useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] =useState('');
  const disaptch =useDispatch();
  const navigate =useNavigate();
  const [register,{isloading}]=useRegisterMutation();
  const {userInfo} = useSelector((state)=>state.auth);
  useEffect(()=>{
    if(userInfo){
      navigate('/');
    }
  },[navigate,userInfo])
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(name.trim()===''){
       toast.error("enter your a proper name");
       return;
    }
    if(password.trim()===''){
       toast.error("enter a proper password");
       return
    }
    try{
      const res = await register({name,email,password}).unwrap();
      console.log(res)
      disaptch(setCredentials({...res}))
      navigate('/home');
    }
    catch(err){
      console.log(err);
      toast.error(err?.data?.message)
    }

  }
  return (
    <section className="h-screen">
      <div className="flex flex-row items-center justify-center  m-10">
                <p className="mb-0 mr-4 text-5xl text-gray-600">CRUD APPLICATION</p>
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
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 pr-5">
            <form onSubmit={handleSubmit}>
               <TEInput
                type="text"
                label="name"
                size="lg"
                className="mb-6 mr-3"
                onChange={(e)=>setName(e.target.value)}
              ></TEInput>
              <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6 mr-3"
                onChange={(e)=>setEmail(e.target.value)}
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
                onChange={(e)=>setPassword(e.target.value)}
              ></TEInput>
              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                  Signup
                  </button>
                </TERipple>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Already have an account{" "}
                  <Link to='/'>
                  <a
                    href="#!"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                   Login
                  </a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup;