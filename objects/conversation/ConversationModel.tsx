import BoxModel from "../BoxModel"
import Conversation from "../../components/windows/ConversationWindow"
import { BUNNID_API_URL } from "../../globals/api"
import { User } from "../../types/user";
import { ConversationMessage } from "../../types/message";
import { Position } from "../../types/position";

export default class ConversationModel extends BoxModel{
    user: User;
    conversationId: number = -1;
    conversationTitle?: string = "";
    messages: ConversationMessage[] = []
    members: User[] = [];
    userSessionToken: string;
    messagesFetched: boolean = false;
    
    constructor(
        position: Position, 
        conversationId: number, 
        user: User,
        userSessionToken: string,
        conversationTitle?: string
        
    ) {
        super(position)
        this.conversationId = conversationId
        this.user = user
        this.userSessionToken = userSessionToken
        this.conversationTitle = conversationTitle
    }

    fetchMessages({force=false, onFinished=()=>{}, onStart=()=>{}} : {force?: boolean, onFinished?: ()=>void, onStart?: ()=>void} ) : void{
        if (!this.conversationId){
            return 
        }
        if (this.messagesFetched && !force){return}

        onStart()
        fetch(
            BUNNID_API_URL + "service/conversation/getMessages", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: this.userSessionToken,
                    conversationId: this.conversationId
                })
            }
        ).then((response)=>{
            return response.json()
        }).then((data)=>{
            if (!data.STATUS){
                console.log("Wrong status in fetching messages")
                console.error(data.MSG)
                return

            }
            console.log(data.MSG)
            this.messages = data.MSG
            setTimeout(onFinished, 500)
         

    
        }).catch((reason)=>{
            console.log("ERROR IN FETCHING MESSAGES")
            console.error(reason)
       
        })
        this.messagesFetched = true

        
    }

    addMessage(msg: string){
        this.messages.push({conversationId: this.conversationId, userId: this.user.id, content: msg})
        this.notify()
    }

    sendMsg(msg: string) : void{
        if (!msg) return;

        fetch(
            BUNNID_API_URL + "service/conversation/send", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: this.userSessionToken,
                    conversationId: this.conversationId,
                    userId: this.user.id,
                    msgContent: msg
                })
            }
        ).then((response)=>{
            return response.json()
        }).then((data)=>{
            if (!data.STATUS){
                console.log("Wrong status in sendingMessage")
                console.error(data.MSG)
                return
            }
            console.log(data.MSG)
       

    
        }).catch((reason)=>{
            console.log("ERROR IN SENDINGMESSAGE")
            console.error(reason)
       
        })
     
    }
    

    makeContent() {
        return (
            <Conversation conversation={this}/>
        )
        
    }
}