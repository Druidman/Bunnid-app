import { useDisclosure } from "@mantine/hooks"
import { Title, Text, Modal, TextInput, PasswordInput, Anchor, Divider } from "@mantine/core"
import { useEffect, useState } from "react"

const AuthModal = ({initModalType, onClose}) => {
    const [opened, { open, close }] = useDisclosure(false)
    const [modalType, setModalType] = useState("login")
    useEffect(()=>{
        setModalType(initModalType)
    },[initModalType])

    useEffect(()=>{open()}, [])

    const handleAuthButtonClick = (e) =>{}


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
                    {modalType == "login" && <> 
                        <TextInput classNames={{
                            input: "!bg-[var(--bg)] !text-[var(--text)]"
                        }}radius="xl" placeholder="Login" />
                        <PasswordInput classNames={{
                            input: "!bg-[var(--bg)] !text-[var(--text)]"
                        }}radius="xl" placeholder="Password"/>
                        </>
                    
                    }
                    {modalType == "register" && <> 
                        <TextInput classNames={{
                            input: "!bg-[var(--bg)] !text-[var(--text)]"
                        }}radius="xl" placeholder="Name" />
                        <TextInput classNames={{
                            input: "!bg-[var(--bg)] !text-[var(--text)]"
                        }}radius="xl" placeholder="Login" />
                        <PasswordInput classNames={{
                            input: "!bg-[var(--bg)] !text-[var(--text)]"
                        }}radius="xl" placeholder="Password"/>
                        </>
                    
                    }
                </div>
                <div className="w-[80%] h-[fitcontent]">
                    <button 
                        className="button !text-[var(--text-dark)] !bg-[var(--accent)] 
                            duration-300 hover:rounded-[30px] hover:!bg-[var(--info)]"
                        onClick={handleAuthButtonClick}
                    >
                        {modalType == "login" && <Title order={2} >Login!</Title>}
                        {modalType == "register" && <Title order={2} >Signup!</Title>}
                    </button>
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