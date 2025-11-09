import { useDisclosure } from "@mantine/hooks"
import {  Text, Modal, TextInput, PasswordInput, Anchor, Divider } from "@mantine/core"
import { useForm, UseFormInput, UseFormReturnType } from "@mantine/form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AccentButton from "./AccentButton"
import { BUNNID_API_URL } from "../globals/api"
import { FormInput, PasswordFormInput } from "./FormInputs"
import { useGlobals } from "../context/globalsContext"
import { User }  from "../types/user"


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
            }).then((data)=>{
                if (!data.STATUS){
                    console.log("Wrong status in login")
                    console.log(data.MSG)
                    return
    
                }
                console.log(data.MSG)

                close()
                onClose()

                setUStoken(data.MSG.token)
                setUser({id: data.MSG.userId})

                navigate("/app")
            }).catch((reason)=>{
                console.log("ERROR IN LOGIN FETCH")
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
            }).then((data)=>{
                if (!data.STATUS){
                    console.log("Wrong status in register")
                    console.log(data.MSG)
                    
                    return
    
                }
                console.log(data.MSG)
                close()
                onClose()
            }).catch((reason)=>{
                console.log("ERROR IN REGISTER FETCH")
                console.log(reason)
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
                                <div className="w-[80%] h-auto">
                                    <AccentButton
                                        type="submit"
                                    >
                                        <Text >Login!</Text>
                                    </AccentButton>
                                </div>
                   
                            </div>
                           
                        </form>
                    
                    }
                    {modalType == "register" && 
                        <form className="flex gap-5 flex-col w-full h-auto" onSubmit={RegisterForm.onSubmit(()=>setStartAuth(true))}> 
                            <FormInput keyVal="name" placeholder="Name" form={RegisterForm}/>
                            <FormInput keyVal="login" placeholder="Login" form={RegisterForm}/>
                            <PasswordFormInput keyVal="password" placeholder="Password" form={RegisterForm}/>
                            <div className="w-full h-auto flex justify-center">
                                <div className="w-[80%] h-auto">
                                    <AccentButton
                                
                                        type="submit"
                                        onClick={()=>{}}
                             
                                    >
                                        <Text >Signup!</Text>
                                    </AccentButton>
                                </div>
                   
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