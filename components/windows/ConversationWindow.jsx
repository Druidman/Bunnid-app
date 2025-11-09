import { useState, useEffect } from "react"
import { useDisclosure } from "@mantine/hooks"
import { LoadingOverlay } from "@mantine/core"

function Conversation({ conversation }) {
    
    const [messages, setMessages] = useState([{sender: null, id: 1, content: "Siemano"}])
    const [loadingVisible, { toggle }] = useDisclosure(true)
    const [user, setUser] = useState({name: null, id: null})


    useEffect(()=>{
        if (!conversation) return;
        // get messages
    },[conversation])

    useEffect(()=>{
        console.log(user)
        if (!user) return
        setUser(user)
    },[user])
    

    return (

        <div className="w-full h-full flex flex-col justify-around align-center">
            
            <LoadingOverlay
                visible={loadingVisible}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars', bg: "inherit" }}
            />
            <div className="w-full h-full flex flex-col justify-around align-center">
                <div className="w-full h-[90%] bg-[var(--bg-light)] gap-2 flex flex-col justify-start p-[10px] rounded-[10px]">
                    {messages.map((item, index)=>(
                        <div key={index} className={`
                            w-[100%] h-[fit-content] 

                            flex
                            ${(item?.sender == user ? "justify-end" : "justify-start")}
                        
                            `}
                        >
                            <h1 className="
                                w-[max-content]
                                h-[100%]
                                px-[15px]
                                rounded-[20px] 
                                bg-[var(--bg-dark)] 
                                text-[var(--text)]"
                            >{item.content}</h1>
                        </div>
                    ))}


                </div>
                <div className="w-full h-[5%] ">
                    <input placeholder="Typesmth" className="
                        px-[15px] 
                        w-full h-full 
                        rounded-[20px] 
                        bg-[var(--bg-light)]
                        border
                        border-[var(--border)]
                        focus:border-[var(--highlight)]
                        focus:outline-none"></input>
                </div>
            </div>
           
            
            
            

        </div>
        
        
        
    )
}

export default Conversation
