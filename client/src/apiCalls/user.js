const {axiosInstance} = require('./index')

//Register new User

export const RegisterUser = async (value) => {
    try{
        const response = await axiosInstance.post("api/users/register", value);
        return response.data;
    }catch(error){
        console.log(error);
    }
}


// login user

export const LoginUser = async (value) =>{
    try {
        const response = await axiosInstance.post("api/users/login", value);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

// get current user from the frontend
export const GetCurrentUser = async () =>{
    try {
        const response = await axiosInstance.get('api/users/get-current-user')
        return response.data
    } catch (error) {
       console.log(error)
    }
}






// proxy in client/package.json is set to http://localhost:8081
// so the request will be made to http://localhost:8081/api/users/register
// Proxy is used to forward the request from the client to the server
// This is done to avoid CORS errors
// CORS stands for Cross-Origin Resource Sharing
// It is a security feature implemented in browsers
// It prevents requests from one origin to another
// For example, if you're on http://localhost:3000
// You cannot make a request to http://localhost:8081
// This is a security feature to prevent malicious attacks
// But in development, we need to make requests to different ports
// So we use a proxy to forward the request to the server
// This is only for development
// In production, the client and server will be on the same domain
// So there will be no CORS issues
