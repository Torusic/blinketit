export const baseUrl="http://localhost:8080"

const SummaryApi={
    register:{
        url:'/api/user/register',
        method:'post'
    },
    login:{
        url:'/api/user/login',
        method:'post'
    },
    forgotPassword:{
        url:'/api/user/forgot-password',
        method:'put'

    },
    otp_verification:{
        url:"/api/user/verify-forgot-password-otp",
        method:'put'

    },
    resetPassword:{
        url:"/api/user/reset-password",
        method:"put"
    },
    refreshToken:{
        url:"/api/user/refresh-token",
        method:"post"
    },
    userDetails:{
        url:"/api/user/user-details",
        method:"get"
    },
    logout:{
        url:"/api/user/logout",
        method:"get"
    },
    uploadAvatar:{
        url:"/api/user/upload-avatar",
        method:"put"
    },
    updateUser:{
        url:"/api/user/update-user",
        method:"put"
    },
    addCategory:{
        url:"/api/category/add-category",
        method:"post"
    },
    uploadImage:{
        url:"/api/file/upload",
        method:"post"
    },
    getCategory:{
        url:"/api/category/get",
        method:"get"

    },
    updateCategory:{
        url:"/api/category/update",
        method:"put"

    },
    deleteCategory:{
        url:"/api/category/delete",
        method:"delete"
    },
    createSubCategory:{
        url:"/api/subCategory/create",
        method:"post"
    },
    getSubCategory:{
        url:"/api/subCategory/get",
        method:"get"
    }
    


}
export default SummaryApi;