const verifyEmailTemplate=({name,url})=>{
    return`
    <p> Dear${name}<?p> 
    <p> Thank You for registering EasyShopt</p>

    <a href=${url} style="color:black;background:orange;margin-top:10px;padding:20px;display:block">
    Verify Email
    </a>
    `

}
export default verifyEmailTemplate;