import { Title, Text} from "@mantine/core"

import "./MainPage.css"

import { useState } from "react";
import AuthModal from "../components/AuthModal";
import AccentButton from "../components/AccentButton";
import { AuthModel } from "../objects/auth/AuthModel";
import { useGlobals } from "../context/globalsContext";
import { Loading } from "../components/LoadingOverlay";
import { useDisclosure } from "@mantine/hooks";

function MainPage() {

    const [authOpen, setAuthOpen] = useState<boolean>(false)
    const [authType, setAuthType] = useState<string>("login")

    const {setUser, setUStoken} = useGlobals()


    return (
        <div className="w-[100vw] h-[100vh] bg-[var(--bg-dark)] flex justify-center items-center flex-col overflow-scroll ">
            {
                authOpen && 
                <AuthModal authModel={
                    new AuthModel(
                        ()=>{
                            setAuthOpen(false)
                            close()
                        }, 
                        setUser,
                        setUStoken
                    )
                    } 
                />
            }
            <div className="absolute top-1 card flex flex-row justify-start items-center p-[10px] w-[90%] no-border-highlight">
                <div className="w-[fit-content] h-full px-[10px] !pr-[20px]">
                    <Title className="text-[var(--accent)]" order={1}>
                        Bunnid
                    </Title>
                </div>
                <div className="flex-1 flex justify-end gap-3">
                    
                    <button className="button">
                        <Title 
                            order={2} className="text-[var(--text-muted)]"
                            onClick={()=>{
                                setAuthType("register")
                                setAuthOpen(true)
                            }}>Sign up</Title>
                    </button>
                    
                    
                    <button className="button">
                        <Title 
                            order={2} className="text-[var(--text-muted)] " 
                            onClick={()=>{
                                setAuthType("login")
                                setAuthOpen(true)
                            }}>Log in</Title>
                    </button>
                    
                    
                    
                </div>
                
            </div>
            
            <div className="card p-5 border-3 border-dashed bg-[inherit] flex flex-col no-border-highlight  z-1">
                
                <Title className="text-[var(--accent)]" order={1}>
                    Bunnid{" "}
                    <Text component="span" className="!text-[var(--text)]" inherit>
                        Open Source and tiled web communicator
                    </Text>
                </Title>
                
                <div className="w-[100%] flex justify-center items-center mt-[50px]">

                    <AccentButton 
                        onClick={()=>{
                            setAuthType("login")
                            setAuthOpen(true)
                        }}
                        className="!w-[50%]"
                    >
                        <Title order={2} className="darkText">Get started!</Title>
                    </AccentButton>
                    
                    
                </div>
            

            
            </div>   
            <div className="glowCircle"></div>
            
            
            
            
            
        
        </div>
    
  )
}

export default MainPage;
