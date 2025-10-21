import { useState, useEffect } from "react"

function ChatWindow({ initialData }) {
    
    const [messages, setMessages] = useState([])


    useEffect(()=>{
        console.log(initialData)
        if (!initialData) return
        setMessages(initialData)

    },[initialData])
    

    return (
        <div className="w-full h-full">
            <div className="w-full h-[90%]">
                {messages.map((item, index)=>(
                    <h1 key={index} className="
                    w-[fit-content] h-[fit-content] 
                    radius-[20px] 
                    bg-[var(--bg-dark)] 
                    text-[var(--text)]
                    flex flex-col
                    my-6
                    ">{item}</h1>
                ))}


            </div>
            <div className="w-full h-[5%]">
                <input placeholder="Typesmth" className="w-full h-full"></input>
            </div>

        </div>
        
        
        
    )
}

export default ChatWindow
