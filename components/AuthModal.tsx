import { useDisclosure } from "@mantine/hooks"
import {  Text, Modal, TextInput, PasswordInput, Anchor, Divider, Title } from "@mantine/core"
import { useForm, UseFormInput, UseFormReturnType } from "@mantine/form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AccentButton from "./AccentButton"
import { BUNNID_API_URL } from "../globals/api"
import { FormInput, PasswordFormInput } from "./FormInputs"
import { useGlobals } from "../context/globalsContext"
import { ApiRequestResult, LoginResponse, RegisterResponse } from "../types/ApiResponses"


const AuthModal = ({initModalType, onClose} : {initModalType: string, onClose: Function}) => {
    const [opened, { open, close }] = useDisclosure(true)
    const [modalType, setModalType] = useState("login")
    const [startAuth, setStartAuth] = useState(false)
    const navigate = useNavigate()
    const {setUStoken, setUser} = useGlobals()

    
    

    const RegisterForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
          name: '',
          login: '',
          password: '',
        },
    
        validate: {
          login: (value) => (value ? null : 'Invalid login'),
          name: (value) => (value ? null : "Invalid name"),
          password: (value) => (value ? null : "Invalid password")
        },
    });
    const LoginForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
          
          login: '',
          password: '',
        },
    
        validate: {
          login: (value) => (value ? null : 'Invalid login'),
          password: (value) => (value ? null : "Invalid password")
        },
    });
    

    useEffect(()=>{
        setModalType(initModalType)
    },[initModalType])


    useEffect(()=>{
        if (!startAuth) return;

        const getUserSessionToken = async () => {
            let loginData = LoginForm.getValues()
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
            }).then((data: ApiRequestResult<LoginResponse>)=>{
                if (data.error){
                    console.error("Error in login request: " + data.error)
                    return
    
                }

                close()
                onClose()
                if (
                    !data.response.token ||
                    !data.response.user_id
                ){
                    console.info("Didn't receive full login data")
                }
                else{
                    setUStoken(data.response.token)
                    setUser({id: data.response.user_id})

                    navigate("/app")
                }
                
            }).catch((reason)=>{
                console.log("Exception in Login request: ")
                console.log(reason)
                close()
                onClose()
            })
          
    
            
        }
        const registerUser = () => {
            let registerData = RegisterForm.getValues()
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
                
                close()
                onClose()
            }).catch((reason)=>{
                console.error("Exception in register request")
                console.error(reason)
                close()
                onClose()
            })
            
            
            
        }

        if (modalType == "login"){
            getUserSessionToken()
            
        }
        else if (modalType == "register"){
            registerUser()
            
        }
        else {
            console.log("Wrong modalType")
            setStartAuth(false)
            return
        }
        setStartAuth(false)
        
       
        
        
    }, [startAuth])

    return (
        <Modal 
            opened={opened} 
            onClose={()=>{
                close()
                onClose()
            }} 
            title={
                <Text size="xl" fw={700} className="text-[var(--text)]" >
                    {modalType == "login" && "Login"}
                    {modalType == "register" && "Signup"}
                </Text>
                
            }
            centered
        >
            <div className="bg-[var(--bg)] w-full h-[fitcontent]  flex  gap-5 flex-col justify-start items-center">
                <div className="w-[100%] h-auto  flex gap-5 flex-col">
                    {modalType == "login" && 
                        <form className="flex gap-5 flex-col w-full h-auto" onSubmit={LoginForm.onSubmit(()=>setStartAuth(true))}> 
                            <FormInput keyVal="login" placeholder="Login" form={LoginForm}/>
                            <PasswordFormInput keyVal="password" placeholder="Password" form={LoginForm}/>

                            <div className="w-full h-auto flex justify-center">
                                
                                <AccentButton
                                    type="submit"
                                    className="!w-[80%]"
                                >
                                    <Title order={3}>Login!</Title>
                                </AccentButton>
                                
                   
                            </div>
                           
                        </form>
                    
                    }
                    {modalType == "register" && 
                        <form className="flex gap-5 flex-col w-full h-auto" onSubmit={RegisterForm.onSubmit(()=>setStartAuth(true))}> 
                            <FormInput keyVal="name" placeholder="Name" form={RegisterForm}/>
                            <FormInput keyVal="login" placeholder="Login" form={RegisterForm}/>
                            <PasswordFormInput keyVal="password" placeholder="Password" form={RegisterForm}/>
                            <div className="w-full h-auto flex justify-center">
                               
                                <AccentButton
                            
                                    type="submit"
                                    className="w-[80%]"

                                >
                                    <Title order={3}>Sign up!</Title>
                                </AccentButton>
                                
                   
                            </div>
                            
                        </form>
                    
                    }
                </div>
                
                <div className="w-[100%] h-[fitcontent] flex justify-center">
                    {modalType == "register" && 
                        <Text size="xs" className="!text-[var(--text-muted)]">
                            Already have an account?{" "}
                            <Anchor href="#" onClick={()=>setModalType("login")}>Login</Anchor>
                        </Text>
                    }
                    {modalType == "login" && 
                        <Text size="xs" className="!text-[var(--text-muted)]">
                            Don't have an account?{" "}
                            <Anchor href="#" onClick={()=>setModalType("register")}>Register</Anchor>
                        </Text>
                    }
                    
                </div>
                <div className="w-[100%] h-[fitcontent] flex justify-center flex-col items-center">
                    <Divider className="w-[80%]" my="xs" label="Or" labelPosition="center" />
                    <Text className="!text-[var(--text-muted-dark)]">Other options comming soon...</Text>
                </div>
                
                
                
            </div>
        </Modal>
    )
}

export default AuthModal;