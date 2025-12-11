import { useDisclosure } from "@mantine/hooks"
import {  Text, Modal, Anchor, Divider, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import AccentButton from "./AccentButton"

import { FormInput, PasswordFormInput } from "./FormInputs"
import { AuthModel } from "../objects/auth/AuthModel"
import { Loading } from "./LoadingOverlay"



const AuthModal = ({authModel} : {authModel: AuthModel}) => {
    const [opened, { close }] = useDisclosure(true)
    const [startAuth, setStartAuth] = useState(false)
    const navigate = useNavigate()
    const [renderTrigger, triggerRender] = useState(true)

    const [loadingOpened, loading] = useDisclosure(false)

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
        if (!startAuth) return;

        const login = async () =>{
            
            await authModel.login(LoginForm, {onStart: loading.open, onSuccess: ()=>{
                navigate("/app/app")
                close()
                loading.close()
                authModel.onClose()
            }})
            
            
        }

        const register = async () =>{
            await authModel.register(RegisterForm, {onStart: loading.open, onSuccess: ()=>{
                close()
                loading.close()
                authModel.onClose()
            }})
            
        }

        if (authModel.modalType == "login"){
            login()

        }
        else if (authModel.modalType == "register"){
            register()
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
                loading.close()
                authModel.onClose()
            }} 
            title={
                <Text size="xl" fw={700} className="text-[var(--text)]" >
                    {authModel.modalType == "login" && "Login"}
                    {authModel.modalType == "register" && "Signup"}
                </Text>
                
            }
            centered
        >
            <Loading loadingVisible={loadingOpened}/>
            <div className="bg-[var(--bg)] w-full h-[fitcontent]  flex  gap-5 flex-col justify-start items-center">
                <div className="w-[100%] h-auto  flex gap-5 flex-col">
                    {authModel.modalType == "login" && 
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
                    {authModel.modalType == "register" && 
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
                    {authModel.modalType == "register" && 
                        <Text size="xs" className="!text-[var(--text-muted)]">
                            Already have an account?{" "}
                            <Anchor href="#" onClick={()=>{
                                authModel.modalType = "login"
                                triggerRender(!renderTrigger)
                            }}>Login</Anchor>
                        </Text>
                    }
                    {authModel.modalType == "login" && 
                        <Text size="xs" className="!text-[var(--text-muted)]">
                            Don't have an account?{" "}
                            <Anchor href="#" onClick={()=>{
                                authModel.modalType = "register"
                                triggerRender(!renderTrigger)
                            }}>Register</Anchor>
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