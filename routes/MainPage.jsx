import { Title, Text, Divider } from "@mantine/core"
import { useNavigate } from "react-router-dom";
import "./MainPage.css"

import Box from "../components/Box"

function MainPage() {
    const navigate = useNavigate()

  return (
    <div className="w-[100vw] h-[100vh] bg-[var(--bg-dark)] flex justify-center items-center flex-col overflow-scroll ">
        <div className="absolute top-1 card flex flex-row justify-start items-center p-[10px] w-[90%] no-border-highlight">
            <div className="w-[fit-content] h-full px-[10px] !pr-[20px]">
                <Title className="text-[var(--accent)]" order={1}>
                    Bunnid
                </Title>
            </div>
            <div className="flex-1 flex justify-end ">
                <div className="w-[fitcontent] mx-[10px]">
                    <button className="button px-[10px]" order={1}>
                        <Title order={2} className="text-[var(--text-muted)]">Sign up</Title>
                    </button>
                </div>
                <div className="w-[fitcontent] ">
                    <button className="button px-[10px] " order={1}>
                        <Title order={2} className="text-[var(--text-muted)]">Log in</Title>
                    </button>
                </div>
                
                
            </div>
            
        </div>
        
        <div className="card p-5 border-3 border-dashed bg-[inherit] flex flex-col no-border-highlight">
           
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
                        onClick={()=>navigate("/app")}
                    >
                        <Title order={2} >Get started!</Title>
                    </button>
                </div>
            </div>
           

           
        </div>   
        {/* <div className="w-[90%]">
            <Divider size="xs" />
            <p>test</p>
        </div> */}
        
        
       
    </div>
    
  )
}

export default MainPage;
