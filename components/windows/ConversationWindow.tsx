import { useState, useEffect } from "react"
import { useDisclosure } from "@mantine/hooks"
import { LoadingOverlay } from "@mantine/core"

import ConversationModel from "../../objects/conversation/ConversationModel"


interface ConversationParams {
    conversation: ConversationModel;
}

function Conversation({ conversation } : ConversationParams) {
    const [loadingVisible, { toggle, open, close }] = useDisclosure(false)

    useEffect(()=>{
        if (!conversation) return;
        
        conversation.fetchMessages({onFinished: close, onStart: open}) // TODO ADD SOME CALLBACK OR SMTH
    },[])
    
    return (

        <div className="w-full h-full flex flex-col justify-around align-center">
            
            <LoadingOverlay
                visible={loadingVisible}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 10, bg: "inherit" }}
                loaderProps={{ color: 'var(--accent)', type: 'bars', bg: "inherit" }}
            />
            <div className="w-full h-full flex flex-col justify-around align-center">
                <div className="w-full h-[90%] bg-[var(--bg-light)] gap-2 flex flex-col justify-start p-[10px] rounded-[10px]">
                    {conversation.messages?.map((msg, index)=>(
                        <div key={index} className={`
                            w-[100%] h-[fit-content] 

                            flex
                            ${(msg.userId == conversation.user.id ? "justify-end" : "justify-start")}
                        
                            `}
                        >
                            <h1 className="
                                w-[max-content]
                                h-[100%]
                                px-[15px]
                                rounded-[20px] 
                                bg-[var(--bg-dark)] 
                                text-[var(--text)]"
                            >{msg.content}</h1>
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
