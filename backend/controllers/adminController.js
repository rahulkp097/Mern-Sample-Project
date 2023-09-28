import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
const adminAuth=(req,res)=>{
    const {userName,password}=req.body
   if (userName === process.env.ADMINUSERNAME && password ===process.env.ADMINPASS) {
    const adminToken = jwt.sign({ username :userName }, "adminPanel", {
      expiresIn: "2d",
    });
       res.status(200).json({  adminToken });
   
   } else {
     res.status(400);
     throw new Error("invalid credentials");
   }
}
const logoutAdmin = (async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json("user logged out successfully");
});

const getData =(async(req,res)=>{
const user = await User.find();
res.status(200).json(user)
});
const deleteUser=(async(req,res)=>{
  console.log(req.cookies)
  const id =req.params.id;
  await User.findByIdAndDelete(id);
  res.status(200).json("deleted");
})
const userDetails=(async(req,res)=>{
  const id= req.params.id;
  const details = await User.findById(id);
  res.status(200).json(details);
})
const editUser = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  console.log(req.body)
  const updateData = {
    email: req.body.email,
    name :req.body.name
  };
  await User.updateOne({ _id: id }, { $set: updateData })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  res.status(200).json("successful");
};

export { adminAuth, logoutAdmin, getData, deleteUser, userDetails, editUser };