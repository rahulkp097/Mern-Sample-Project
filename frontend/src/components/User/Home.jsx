import React, { useState } from "react";
import {
  useLogoutMutation,
  useAddImageMutation,
} from "../../slices/userApiSlice";
import { logout, updatesetCredentials } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [image, setImage] = useState();
  const [sentData,setsentData] =useState();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [addImageAPIcall] = useAddImageMutation();
  
  const logoutHandler = async () => {
    try {

      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
      toast.error("logout successfully");
    } catch (err) {
      toast.error(err.error)
    }
  };
 const handleImageUpload = async () => {
   if (!image) {
     toast.error("Please select an image to upload");
     return;
   }
   
   const formData = new FormData();
   formData.append("image", image);
   console.log(formData)

   try {
     const response = await addImageAPIcall(image).unwrap();
     dispatch(updatesetCredentials(response.imageUrl));
     toast.success("Image uploaded successfully");
   } catch (err) {
     console.error(err);
     toast.error("Error uploading image");
   }
 };


  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-500 p-4 flex justify-between items-center">
          <h1 className="text-white text-2xl">My App</h1>
          <button className="text-white" onClick={logoutHandler}>
            Logout
          </button>
        </header>
        <main className="p-4">
          <div className="bg-blue-200 p-4 rounded-lg shadow-md text-center">
            <img
              src={sentData}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <h2 className="text-lg font-semibold">Name :{userInfo?.name}</h2>
            <p className="text-gray-600">Email :{userInfo?.email}</p>
          </div>
          {userInfo?.imageUrl ? (
            <img
              src={sentData}
              alt="Profile"
              className="w-12 h-12 rounded-full mx-auto mb-2"
            />
          ) : (
            // <button className='bg-green-500 text-white p-2 m-2' onClick={addImage} >Add image</button>
            <div className="text-center">
              <label className="block text-gray-700 font-bold mb-2">
                Upload Image
                <input
                  type="file"
                  onChange={(e) => {
                    setsentData(URL.createObjectURL(e.target.files[0]));
                    setImage(e.target.files[0]);
                    console.log(image);
                  }}
                />
              </label>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleImageUpload}
              >
                Select Image
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
