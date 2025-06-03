import sendEmail from "../config/sendEmail.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js"
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";

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

        const verifyEmailUrl=`${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

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

        const removeRefreshToken=await userModel.findByIdAndUpdate(userId,{
            refresh_token:""

        })

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
 
export async function uploadAvatar(req,res){
    try{
        const userId=req.userId;
        const image = req.file;

        const upload=await uploadImageClodinary(image);

        const updateUser=await userModel.findByIdAndUpdate(userId,{
            avatar:upload.url,
        })

        return res.json({
            message:"Upload profile",
            data:{
                _id:userId,
                avatar:upload.url
            },
        })

    }catch(error){
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false

        })
    }
}

export async function updateUserDetails(req,res){
    try{
        const userId=req.userId;
        const {name,email,mobile,password}=req.body;

        let hashPassword="";

        if(password){
            const salt =await bcrypt.genSalt(10);
            hashPassword=await bcrypt.hash(password,salt)
        }

        const updateUser=await userModel.updateOne({_id:userId},{
            ...(name && {name:name}),
            ...(email && {email:email}),
            ...(mobile && {mobile:mobile}),
            ...(password && {password:hashPassword}),
            

        })
        return res.status(200).json({
            message:"User Updated Succesfully",
            error:false,
            success:true,
            data:updateUser
        })


    }catch(error){
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}
export async function forgotPasswordController(req,res){
    try{
        const {email}=req.body;
        const user= await userModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"Email not available",
                error:true,
                success:false
            })
        }
        const otp=generatedOtp()
        const expireTime=new Date()+60*60*1000;//1hr

        const update=await userModel.findByIdAndUpdate(user._id,{
            forgot_password_otp:otp,
            forgot_password_expiry:new Date(expireTime).toISOString()
        })
        await sendEmail({
            sendTo:email,
            subject:"Forgot Password from Binkeyit",
            html:forgotPasswordTemplate({
                name:user.name,
                otp:otp
            })
        })
        return res.status(200).json({
            message:"Check your Email",
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

export async function verifyForgotPasswordOtp(req,res){
    try{
        const {email,otp}=req.body;

        if(!email||!otp){
            return res.status(400).json({
                message:"Provide email and otp",
                error:true,
                success:false
            })
        }
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User not found",
                error:true,
                success: false
            })
        }
        const currentTime=new Date().toISOString()
        
        if(user.forgot_password_expiry<currentTime){
            return res.status(400).json({
                message:"OTP expired",
                error:true,
                success:false
            })
        }

        if(user.forgot_password_otp!==otp){
            return res.status(400).json({
                message:"Invalid OTP",
                error:true,
                success:false
            })
        }
        return res.status(200).json({
            message:"OTP verified successfully",
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

export async function resetPassword(req,res){
    try{
        const {email,newPassword,confirmPassword}=req.body;
        if(!email ||!newPassword ||!confirmPassword){
            return res.status(400).json({
                message:"Provide the require Fields email,newPassword,confirmPassword",
                error:true,
                success:false
            })
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"User Not Found",
                error:true,
                success:false
            })
        }
        if(newPassword!==confirmPassword){
            return res.status(400).json({
                message:"New Password and confirm Password Does not match",
                error:true,
                success:false,

            })

        }
        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(newPassword,salt);

        const update=await userModel.findOneAndUpdate(user._id,{
            password:hashedPassword,

        })

        return res.status(200).json({
            message:"Password reset successful",
            error:false,
            success:true
        })





    }
    catch(error){
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}
export async function refreshToken(req,res){
    try{
        const refreshToken=req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1];

        if(!refreshToken){
            return res.status(401).json({
                message:"Invalid token",
                error:true,
                success:false
            })
        }
        const verifyToken=await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);

        if(!verifyToken){
            return res.status(401).json({
                message:"Token has expired",
                error:true,
                success:false
            })
        }
        
        const userId=verifyToken?._id;
        const newAccessToken=await generatedAccessToken(userId);
    

        const cookiesOptions={
            httpOnly:true,
            secure:true,
            sameSite:"None",

        }

        res.cookie("accessToken",newAccessToken,cookiesOptions)

        return res.status(200).json({
            message:"New acces token generated",
            error:false,
            success:true,
            date:{
                accessToken:newAccessToken
            }
        })

    }catch(error){
        return res.status9(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}

