import BoxModel from "../BoxModel"
import Conversation from "../../components/windows/ConversationWindow"
import { BUNNID_API_URL } from "../../globals/api"
import { User } from "../../types/user";
import { ConversationMessage } from "../../types/message";
import { Position } from "../../types/position";

export default class ConversationModel extends BoxModel{
    user: User;
    conversationId: number = -1;
    conversationName: string = "";
    messages: ConversationMessage[] = []
    members: User[] = [];
    userSessionToken: number;
    
    constructor(
        position: Position, 
        conversationId: number, 
        user: User,
        userSessionToken: number
        
    ) {
        super(position)
        this.conversationId = conversationId
        this.user = user
        this.userSessionToken = userSessionToken
    }

    fetchMessages() : void{
        if (!this.conversationId){
            return 
        }
        fetch(
            BUNNID_API_URL + "service/conversation/getMessages", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: this.userSessionToken
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

    
        }).catch((reason)=>{
            console.log("ERROR IN FETCHING MESSAGES")
            console.error(reason)
       
        })

        
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