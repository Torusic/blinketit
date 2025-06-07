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

    }


}
export default SummaryApi;