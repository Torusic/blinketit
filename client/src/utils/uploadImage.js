import SummaryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
const uploadImage=async(image)=>{
    try {
        const formData=new FormData();
        formData.append('file',image)
        const response=await Axios({
            ...SummaryApi.uploadImage,
            data:formData


        })
        return response.data
        
    } catch (error) {
        return error
        
    }
}
export default uploadImage;