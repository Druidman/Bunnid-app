import { useState, useEffect } from "react"

function ChatWindow({ initialData }) {
    
    const [messages, setMessages] = useState([])


    useEffect(()=>{
        console.log(initialData)
        if (!initialData) return
        setMessages(initialData)

    },[initialData])
    

    return (
        <div className="w-full h-full flex flex-col justify-around align-center">
            <div className="w-full h-[90%] bg-[var(--bg-light)] flex flex-col justify-start p-[10px] rounded-[10px]">
                {messages.map((item, index)=>(
                    <div key={index} className={`
                        w-[100%] h-[fit-content] 
                       
                        flex
                        
                        my-2
                 
                        ${(item?.sender == "user" ? "justify-end" : "justify-start")}
                    
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
        
        
        
    )
}

export default ChatWindow
