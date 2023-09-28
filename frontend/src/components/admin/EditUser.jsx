import React, { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { toast } from "react-toastify";

const EditUser = () => {
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
        const [nameupdate, setNameupdate] = useState("");
        const [emailupdated, setEmailupdated] = useState("");
     const navigate = useNavigate();
   const {id} =useParams();
    const getData =async()=>{
        const data =await fetch("http://localhost:8000/admin/userDetails/" + id);
        const json = await data.json();
        setName(json.name);
        setEmail(json.email)
        console.log(name,email)
    }
     getData();
 
    
    const url = "http://localhost:8000/admin/edituserDetails/" + id; 
    

   
     const handleSubmit = async (e) => {
       e.preventDefault();
       if (nameupdate.trim() === "") {
         toast.error("enter your a proper name");
         return;
       }
       const data = {
         name: nameupdate,
         email: emailupdated,
       };
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
       fetch(url, requestOptions)
         .then((response) => response.json())
         .then((datas) => {
              navigate("/adminhome");
           console.log("Response data:", datas);
         })
         .catch((error) => {
           console.error("Error:", error);
         });
     

     };
  return (
    <section className="h-screen">
      <div className="flex flex-row items-center justify-center  m-10">
        <p className="mb-0 mr-4 text-5xl text-gray-600">Edit user</p>
      </div>
      <div className="ml-40">
        <p className="mr-4 text-sm text-gray-600 mb-4">
          Name of the user is :{name}
        </p>
        <p className="mb-0 mr-4 text-sm text-gray-600">
          Email of the user is :{email}
        </p>
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
                placeholder={name}
                onChange={(e) => setNameupdate(e.target.value)}
              ></TEInput>
              <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6 mr-3"
                placeholder={email}
                onChange={(e) => setEmailupdated(e.target.value)}
              ></TEInput>
              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Edit user
                  </button>
                </TERipple>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
