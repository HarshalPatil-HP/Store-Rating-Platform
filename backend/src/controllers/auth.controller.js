import { asyncHandler } from "../utils/async-handler.utils.js";
import { ApiError } from "../utils/api-error.utils.js";
import { ApiResponse } from "../utils/api-resolve.utils.js";
import { createUser, findByEmail, findById, findByIdWithPassword, updatePassword } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const {name,email,password,address}=req.body;
  const existingUser=await findByEmail(email);

  if(existingUser){
    throw new ApiError(400,"User email already exists");
  }
  const hashedPassword=await bcrypt.hash(password, 10);

  const userId=await createUser({name,email,password:hashedPassword,address,role:"normal"});
  
  if(!userId){
    throw new ApiError(500,"Failed to create user");
  }
  return res
  .status(200)
  .json(
    new ApiResponse(200,
         { id: userId },
          "User registered successfully"
        ));
    
});

const loginUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    const user=await findByEmail(email);

    if(!user){
        throw new ApiError(401,"Invalid email or password");
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new ApiError(401,"Invalid email or password");
    }

    const token=jwt.sign(
        {
            id: user.id,
             role: user.role
            }, 
            process.env.JWT_SECRET,
             {
                expiresIn: '1d'
            });

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    return res
    .status(200)
    .cookie("accessToken", token, options)
    .json(
        new ApiResponse(200,
            { token },
            "User logged in successfully"
        ));
});

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('accessToken');
    return res
    .status(200)
    .json(
        new ApiResponse(200,
            null,
            "User logged out successfully"
        ));
});


const changePassword = asyncHandler(async (req, res) => {
    const userId=req.user.id;
    const {oldPassword,newPassword}=req.body; 
    const user=await findByIdWithPassword(userId);

    if(!user){
        throw new ApiError(404,"User not found");
    }
    const isMatch=await bcrypt.compare(oldPassword,user.password);
     if(!isMatch){
        throw new ApiError(401,"Old password is incorrect");
    }

    const hashedNewPassword=await bcrypt.hash(newPassword,10);

    await updatePassword(userId, hashedNewPassword);
    return res
    .status(200)
    .json(
        new ApiResponse(200,
            null,
            "Password changed successfully"
        ));
});

export { registerUser, loginUser, logoutUser, changePassword };