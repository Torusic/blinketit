import uploadImageClodinary from "../utils/uploadImageClodinary.js"

const uploadImageController=async(req,res)=>{
    try {
        const file=req.file
        const uploadImage=await uploadImageClodinary(file)

        return res.status(200).json({
            message:"Upload Done",
            error:true,
            success:false,
            data:uploadImage
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
        
    }
}
export default uploadImageController;
