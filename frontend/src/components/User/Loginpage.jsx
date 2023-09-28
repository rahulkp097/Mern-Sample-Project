import React, { useState,useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { TEInput, TERipple } from "tw-elements-react";
import { useLoginMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { useDispatch,useSelector } from 'react-redux';
import {toast} from 'react-toastify'
const Loginpage = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] =useState('');
  const dispatch =useDispatch();
  const navigate = useNavigate();
  
  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

   useEffect(() => {
    if (userInfo) {
      navigate('/home');
    }
  }, [navigate, userInfo]);
   const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
        navigate('/home');
    
    } catch (err) {
      console.log(err)
      toast.error(err?.data.message)
      
    }

  }
  return (
    <section className="h-screen">
      <div className="flex flex-row items-center justify-center ">
                <p className="mb-0 mr-4 text-5xl text-gray-600 mt-5">CRUD APPLICATION</p>
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
                type="email"
                label="Email address"
                size="lg"
                className="mb-6 mr-3"
                onChange={(e)=>setEmail(e.target.value)}
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

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?{" "}
                  <Link to='register'>
                  <a
                    href="#!"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
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

export default Loginpage