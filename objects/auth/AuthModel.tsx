import { UseFormReturnType } from "@mantine/form"
import {BUNNID_API_URL} from "../../globals/api"
import {ApiRequestResult, LoginResponse, RegisterResponse, UserSessionTokenResponse} from "../../types/ApiResponses"
import {User} from "../../types/user"

import {NavigateFunction} from "react-router-dom"
type loginValues = {
    login: string;
    password: string;
}

type registerValues = {
    login: string;
    password: string;
    name: string;
}



type loginFormType = UseFormReturnType<
    loginValues,
    (values: loginValues) => loginValues
>
type registerFormType = UseFormReturnType<
    registerValues,
    (values: registerValues) => registerValues
>
export class AuthModel{
    onClose: ()=>void = ()=>{};
    setUser: (nUser: User)=>void = ()=>{};
    setSessionToken: (token: string) => void = ()=>{};

    modalType: string = "login"
    

    constructor(onClose: ()=>void, setUser: (nUser: User)=>void, setSessionToken: (token: string) => void){
        this.onClose = onClose
        this.setUser = setUser
        this.setSessionToken = setSessionToken
    }
    async login(loginForm: loginFormType, onSuccess: ()=>void) {
        let loginData = loginForm.getValues()
        console.log("dfs")
        fetch(
            BUNNID_API_URL + "auth/login", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    login: loginData.login,
                    password: loginData.password
                })
            }
            
        ).then((response)=>{
            return response.json()
        }).then(async (data: ApiRequestResult<LoginResponse>)=>{
            if (data.error){
                console.error("Error in login request: " + data.error)
                return

            }

        
            this.onClose()
            if (
                !data.response.user_id
            ){
                console.info("Didn't receive full login data " + data.response.user_id)
            }
            else{
                this.setUser({id: data.response.user_id})
                await this.getUserSessionToken()
                onSuccess()
            }
            
        }).catch((reason)=>{
            console.log("Exception in Login request: ")
            console.log(reason)

            this.onClose()
        })
        

        
    }

    async register(registerForm: registerFormType){
        let registerData = registerForm.getValues()
        fetch(
            BUNNID_API_URL + "auth/register", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: registerData.name,
                    login: registerData.login,
                    password: registerData.password
                })
            }
            
        ).then((response)=>{
            return response.json()
        }).then((data: ApiRequestResult<RegisterResponse>)=>{
            if (data.error){
                console.error("Error in register request: " + data.error)
            }
            if (!data.response.result){
                console.info("Register didn't succeed")
            }
            
         
            this.onClose()
        }).catch((reason)=>{
            console.error("Exception in register request")
            console.error(reason)
        
            this.onClose()
        })
        
        
        
    }

    async getUserSessionToken(){
        await fetch(
            BUNNID_API_URL + "auth/get_session", 
            {
                method: "GET",

                // important for us to get authenticated for token access
                // in cookies there is refresh session token which authenticates us
                credentials: "include" 
            }
            
        ).then((response)=>{
            return response.json()
        }).then((data: ApiRequestResult<UserSessionTokenResponse>)=>{
            if (data.error){
                console.error("Error in UserSessionTokenResponse request: " + data.error)
                return
            }

            if (
                data.response.session_token == null
            ){
                console.info("Didn't receive token " + data.response.session_token)
            }
            else{
                this.setSessionToken(data.response.session_token)
            }
            
        }).catch((reason)=>{
            console.log("Exception in get user session token request: ")
            console.log(reason)
        })
    }
}
