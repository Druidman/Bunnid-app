import { useDisclosure } from "@mantine/hooks"
import { Title, Text, Modal, TextInput, PasswordInput, Anchor, Divider } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AccentButton from "./AccentButton"

const AuthModal = ({initModalType, onClose}) => {
    const [opened, { open, close }] = useDisclosure(true)
    const [modalType, setModalType] = useState("login")
    const [startAuth, setStartAuth] = useState(false)
    const navigate = useNavigate()

    const FormInput = ({keyVal, placeholder, form}) => {
        return <TextInput 
                    classNames={{
                        input: "!bg-[var(--bg)] !text-[var(--text)] !w-full"
                    }}
                    radius="xl" 
                    placeholder={placeholder}
                    key={form.key(keyVal)}
                    {...form.getInputProps(keyVal)}
                />
    }
    const FormPasswordInput = ({keyVal, placeholder, form}) => {
        return <PasswordInput 
                    classNames={{
                        input: "!bg-[var(--bg)] !text-[var(--text)] !w-full"
                    }}
                    radius="xl" 
                    placeholder={placeholder}
                    key={form.key(keyVal)}
                    {...form.getInputProps(keyVal)}
                />
    }

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
       
        close()

        navigate("/app", {
            state: {token: ""}
        })
        
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
                            <FormPasswordInput keyVal="password" placeholder="Password" form={LoginForm}/>

                            <div className="w-full h-auto flex justify-center">
                                <div className="w-[80%] h-auto">
                                    <AccentButton
                                
                                        type="submit"
                                        onClick={()=>{}}
                            
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
                            <FormPasswordInput keyVal="password" placeholder="Password" form={RegisterForm}/>
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