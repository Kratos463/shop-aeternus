import { NextApiRequest,NextApiResponse } from "next/types";
import userModel from '../../../models/userModel';
import bcrypt from 'bcrypt';


export default async function handler(req,res){

    const {firstName,lastName,email,phone,gender,password} = req.body;

    let existingUser;
try{
     existingUser = await userModel.findOne({email})
}catch(error){
    console.log(error)
}
   
if(existingUser){
    return res.status(400).json({message:"User already exists"})
}

const hashPassword = bcrypt.hashSync(password,10)

const user = new userModel({
firstName,
lastName,
email,
phone,
gender,
password:hashPassword


})
try{
    await user.Save();

    return  res.status(201).json({message:"User Registered successfully",user})
}catch(error){
 console.log(error)
 return res.status(500).json({message:"Failed to register "})
}


}