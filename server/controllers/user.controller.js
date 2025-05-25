import sendEmail from "../config/sendEmail.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";

export async function registerUserController(req,res){
    try{
        
        const{name,email,password}=req.body;
        if(!name||!email||!password){
            return res.status(400).json({
                message:"Provide email,name and password",
                error:true,
                success:false
            })

        }
        const user=await userModel.findOne({email})

        if(user){
            return res.status(400).json({
                message:"User already exists",
                error:true,
                success:false

            })
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const payload={
            name,
            email,
            password:hashedPassword,
        }
        const newUser=new userModel(payload);
        const save=await newUser.save();

        const verifyEmailUrl=`${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail=await sendEmail({
            sendTo:email,
            subject:"Verify your Email",
            html:verifyEmailTemplate({
                name,
                url:verifyEmailUrl

            })

        })
        return res.status(201).json({
            message:"User Registered successfully",
            error:false,
            success:true,
            data:save
        })



    }
    catch(error){
       return  res.status(500).json({
        message:error.message ||error,
        error:true,
        success:false
})

    }


}

export async function verifyEmailController(req,res){
    try{
        const {code}=req.body;
         const user=await userModel.findOne({_id:code});
         if(!user){
            return res.status(404).json({
                message:"Invalid code",
                error:true,
                success:false
            })
         }
         const updateUser=await userModel.updateOne({_id:code},{
            verify_email:true,
         })
         return res.status(200).json({
            message:"Email verified successfully",
            error:false,
            success:true
         })

    }catch(error){
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}

export async function loginUserController(req,res){
    try{
        const{email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({
                message:"Provide email and password",
                error:true,
                success:false
            })
        }
        const user=await userModel.findOne({email});

        if(!user){
            return res.status(404).json({
                message:"user not found",
                error:true,
                success:false
            })
        }
        if(user.status!=="Active"){
            return res.status(400).json({
                message:"Contact to Admin",
                error:true,
                success:false
            })
        }
        const checkPassword=await bcrypt.compare(password,user.password);

        if(!checkPassword){
            return res.status(400).json({
                message:"Invalid password",
                error:true,
                success:false
            })
        }
        const accessToken=await generatedAccessToken(user._id);
        const refreshToken=await generatedRefreshToken(user._id);

        const cookiesOptions={
            httpOnly:true,
            secure:true,
            sameSite:"None",

        }

        res.cookie("accessToken",accessToken,cookiesOptions);
        res.cookie("refreshToken",refreshToken,cookiesOptions);

        return res.status(200).json({
            message:"User logged in Successfully",
            error:false,
            success:true,
            data:{
                accessToken,
                refreshToken,
            }
        })

    }catch(error){
        return res.status(500).json({
            message:error.message||error,
        error:true,
        success:false
            })
    }

}

export async function logoutController(req,res){
    try{
        const userId=req.userId;

        const cookiesOptions={
            httpOnly:true,
            secure:true,
            sameSite:"None",

        }

        
        res.clearCookie("accessToken",cookiesOptions)
        res.clearCookie("refreshTokn",cookiesOptions)

        return res.status(200).json({
            message:"User logged out Successfully",
            error:false,
            success:true,
        })

    }catch(error){
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}