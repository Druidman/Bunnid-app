import BoxModel from "./BoxModel"
import Conversation from "../components/windows/ConversationWindow"
import { BUNNID_API_URL } from "../globals/api"

export default class ConversationModel extends BoxModel{
    user = null
    conversationId = null
    userSessionToken = null
    messages = []
    constructor(zIndex, visible, position, conversationId, user, userSessionToken) {
        super(zIndex, visible, position)
        this.conversationId = conversationId
        this.userSessionToken = userSessionToken
        this.user = user
    }

    fetchMessages(){
        if (!this.conversationId){
            return null
        }
        fetch(
            BUNNID_API_URL + "service/conversation/getMessages", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: userSessionToken
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

    sendMsg(msg){
        if (!msg) return;

        conversationId = request.json.get("conversationId")
        msgContent = request.json.get("msgContent")
        userId = request.json.get("userId")

        fetch(
            BUNNID_API_URL + "service/conversation/send", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: userSessionToken,
                    conversationId: this.conversationId,
                    userId: this.userId,
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
        return <Conversation conversation={this}/>
    }
}