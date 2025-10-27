import { Title, Text, Modal, TextInput, PasswordInput, Anchor, Divider } from "@mantine/core"
import { useDisclosure } from '@mantine/hooks';

import { useNavigate } from "react-router-dom";
import "./MainPage.css"

import Box from "../components/Box"
import { useState } from "react";

function MainPage() {
    const navigate = useNavigate()
    const [opened, { open, close }] = useDisclosure(false)
    const [modalType, setModalType] = useState("register")

  return (
    <div className="w-[100vw] h-[100vh] bg-[var(--bg-dark)] flex justify-center items-center flex-col overflow-scroll ">
        <Modal 
            opened={opened} 
            onClose={close} 
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
                    <button className="button !text-[var(--text-dark)] !bg-[var(--accent)] 
                        duration-300 hover:rounded-[30px] hover:!bg-[var(--info)]">
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
        <div className="absolute top-1 card flex flex-row justify-start items-center p-[10px] w-[90%] no-border-highlight">
            <div className="w-[fit-content] h-full px-[10px] !pr-[20px]">
                <Title className="text-[var(--accent)]" order={1}>
                    Bunnid
                </Title>
            </div>
            <div className="flex-1 flex justify-end ">
                <div className="w-[fitcontent] mx-[10px]">
                    <button className="button px-[10px]" order={1}>
                        <Title 
                            order={2} className="text-[var(--text-muted)]"
                            onClick={()=>{
                                setModalType("register")
                                open()
                            }}>Sign up</Title>
                    </button>
                </div>
                <div className="w-[fitcontent] ">
                    <button className="button px-[10px] " order={1}>
                        <Title 
                            order={2} className="text-[var(--text-muted)] " 
                            onClick={()=>{
                                setModalType("login")
                                open()
                            }}>Log in</Title>
                    </button>
                </div>
                
                
            </div>
            
        </div>
        
        <div className="card p-5 border-3 border-dashed bg-[inherit] flex flex-col no-border-highlight  z-1">
            
            <Title className="text-[var(--accent)]" order={1}>
                Bunnid{" "}
                <Text component="span" className="!text-[var(--text)]" inherit>
                    Open Source and tiled web communicator
                </Text>
            </Title>
            
            <div className="w-[100%] flex justify-center items-center mt-[50px] flex-col">

                <div className="w-[50%]">
                    <button 
                        className="button px-[10px] duration-200 !text-[var(--text-dark)] !bg-[var(--accent)] hover:!bg-[inherit] hover:!text-[var(--text-muted)]" 
                        order={1}
                        onClick={open}
                    >
                        <Title order={2} >Get started!</Title>
                    </button>
                </div>
            </div>
           

           
        </div>   
        <div className="glowCircle"></div>
        
        
        
        
        
       
    </div>
    
  )
}

export default MainPage;
