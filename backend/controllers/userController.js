import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../utilis/generateToken.js";


//login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
const user = await User.findOne({ email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
  // res.status(200).json({ message: "Auth user susccessfull" });
});

//register
const registerUser = asyncHandler(async (req, res) => {
  console.log("enter here")
  const { name, email, password } = req.body;
  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(400);
    throw new Error("User already exits");
  }
  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
  res.status(200).json("Register user");
});

//logout user

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
  });
  res.status(200).json("user logged out successfully");
});

//update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("image form ",req.body)
  const user = await User.findOne({_id:req.user._id});
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if(req.body.password){
      user.password = req.body.password
    }

    const updatedDetails =await user.save()
    res.status(201).json({
      _id: updatedDetails._id,
      name: updatedDetails.name,
      email: updatedDetails.email,
    });
  }
  else{
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
};
