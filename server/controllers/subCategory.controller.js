import SubCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController=async(req,res)=>{
    try {
        const{name,image,category}=req.body;
        if(!name||!image||!category[0]){
            return res.status(400).json({
                message:"Please Provide All fields",
                error:true,
                success:false
            })
        }
        const payload={
            name,image,category
        }
        const createSubCategory=new SubCategoryModel(payload);
        const save=await createSubCategory.save()

        return res.status(200).json({
            message:"SubCategory added Successfully",
            error:false,
            success:true,
            data:save
        })
        
    } catch (error) {
       return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
        
    }
}
export const getSubCategory=async(req,res)=>{
    try {
        const data= await SubCategoryModel.find().sort({createdAt:-1})

        return res.status(200).json({
            message:"SubCatagory fecthed Successfully",
            data:data,
            error:false,
            success:true
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message|error,
            error:true,
            success:false
        })
        
    }
}
