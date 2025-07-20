//logic for login and register
import bcrypt from 'bcryptjs'
import { userModel } from '../models/UserModel.js';
import jwt from 'jsonwebtoken';


//-------------------register controller---------------------

export const registerController = async (req,res)=>{

    const {name,email,password,role} = req.body;

    //validation cheking
    if(!name){
        return res.status(401).json({
            success:false,
            message:"name is required!"
        })
        
    }

    if(!email){
        return res.status(401).json({
            success:false,
            message:"email is required!"
        })
        
    }

    if(!password){
        return res.status(401).json({
            success:false,
            message:"password is required!"
        })
        
    }

    try {
        
    //checking if already registered
    const alreadyUser = await userModel.findOne({email})
    if (alreadyUser) {
        return  res.status(201).json({
            success:true,
            message:"Already a user, please login!"
        })
    }

    //hashing password using bcryptjs
    const hashPassword = await bcrypt.hash(password,10);

    //creating & saving new-user in database
    const newUser = await userModel({name,email,password:hashPassword,role})
    newUser.save()
        
        res.status(200).json({
            newUser,
            success:true,
            message:"New user created!"
        })
    } catch (error) {
        res.status(400).json({
            error,
            success:false,
            message:"Error in register!!"
        })
    }

}


//-------------Login Controller----------------------------

export const loginController = async (req,res)=>{
    
  const {email,password} = req.body;

    //validation cheking
    if(!email){
        return res.status(401).json({
            success:false,
            message:"email is required!"
        })
    }

    if(!password){
        return res.status(401).json({
            success:false,
            message:"password is required!"
        })       
    }

try {

//checking for a regisetered user
const registeredUser = await userModel.findOne({email})
if(!registeredUser){
    return res.status(401).json({
            success:false,
            message:"Not a regiseted user, please register!"
        }) 
}

//comparing password
const comparePassword = await bcrypt.compare(password,registeredUser.password)
if(!comparePassword){
    return res.status(401).json({
            success:false,
            message:"password not matching!"
        }) 
}

//token creation
const token = jwt.sign({id:registeredUser._id,role:registeredUser.role},process.env.JWT_SECRET,{expiresIn:'7d'})

res.status(200).json({
    success:true,
    message:"Login successful!",
    token,
    role:registeredUser.role
})

} catch (error) {
     res.status(400).json({
            error,
            success:false,
            message:"Error in login!!"
        })
}

}




//-------------Test Controller----------------------------
export const testController =  (req,res)=>{
    res.status(200).json("testing successful")
}


//-------------Admin Test Controller----------------------------
export const adminTestController =  (req,res)=>{
    res.status(200).json("admin testing successful")
}


//-------------Forgot Password Controller----------------------------
export const forgotPasswordController =async (req,res)=>{
    const {email,password} = req.body;
    //validation
    if(!email || !password){
        return res.status(401).json({
            success:false,
            messgae:"Error in email or password"
        })
    }

    try {
        //verifing the email is already registered
        const user = await userModel.findOne({email})

        if(!user){
            return  res.status(401).json({
            success:false,
            messgae:"Not a user, Register first!"
        })
        }
         //hashing password using bcryptjs
    const hashPassword = await bcrypt.hash(password,10);

//find the user and updating password
    const updatedUser = await userModel.findByIdAndUpdate(user._id,{password:hashPassword})

   res.status(200).json({
            success:true,
            message:"user details",
           updatedUser
         })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error in forgot route",
            error
        })
    }
}

