import axiosUrl from "../components/url/Axiosurl"

export const googleAuth = (code) => {
    try{
        console.log(code,'code send by google and going to send this code to backend')
        return axiosUrl.get(`/user/google?code=${code}`)
    }catch(error){
       console.log(error,'error at auth')
    }
}