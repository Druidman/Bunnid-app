import { useEffect } from "react"
import { useDisclosure } from "@mantine/hooks"
import { ActionIcon, LoadingOverlay, Title } from "@mantine/core"
import { IconSettings } from "@tabler/icons-react"
import { useGlobals } from "../../context/globalsContext"


import ConversationModel from "../../objects/conversation/ConversationModel"



interface ConversationParams {
    conversation: ConversationModel;
}

function Conversation({ conversation } : ConversationParams) {
    const [loadingVisible, { toggle, open, close }] = useDisclosure(false)
    const { eventPool } = useGlobals()

    useEffect(()=>{
        if (!conversation) return;
        console.log("?")
        conversation.fetchMessages({onFinished: close, onStart: open})
        conversation.registerMsgListenerToEventPool(eventPool)
        
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
                <div className="px-2 flex items-center gap-2">
                    <Title order={1} className="text-[var(--accent)]">{conversation.conversationTitle}</Title>
                    <ActionIcon aria-label="Settings" variant="filled" radius="xl" size="md">
                        <IconSettings></IconSettings>
                    </ActionIcon>
                        
                </div>
                <div className="w-full h-full p-[20px] flex flex-col gap-2">
                    <div className="w-full h-[90%] bg-[var(--bg-light)] gap-2 flex flex-col justify-start p-[10px] rounded-[10px] overflow-scroll">
                        {conversation.messages?.map((msg, index)=>(
                            <div key={index} className={`
                                w-[100%] h-[fit-content] 

                                flex
                                ${(msg.user_id == conversation.user.id ? "justify-end" : "justify-start")}
                            
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
                    <div className="w-full">
                        <input 
                            placeholder="Typesmth"
                            className="regularInput"
                            onKeyDown={(e)=>{
                                if (e.key != "Enter"){
                                    return
                                }
                                let element = e.target as HTMLInputElement
                                conversation.sendMsg(element.value)
                                conversation.addMessage({user_id: conversation.user.id, content: element.value})
                                element.value = ""
                            }}></input>
                    </div>
                </div>
                
            </div>
           
            
            
            

        </div>
        
        
        
    )
}

export default Conversation
