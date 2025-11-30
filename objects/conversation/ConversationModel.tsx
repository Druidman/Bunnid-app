import BoxModel from "../BoxModel"
import Conversation from "../../components/windows/ConversationWindow"
import { BUNNID_API_URL } from "../../globals/api"
import { User } from "../../types/user";
import { ConversationMessage } from "../../types/message";
import { Position } from "../../types/position";
import WsMessage from "../wsMesage";
import { WsEvent } from "../wsEvent";
import { ApiRequestResult, ConversationGetMessagesResponse, ConversationSendMessageResoponse } from "../../types/ApiResponses";
import { WsMessageRTMessagesInConversation } from "../../types/WsMessagePayload";

export default class ConversationModel extends BoxModel{
    user: User;
    conversationId: number = -1;
    conversationTitle?: string = "";
    messages: ConversationMessage[] = []
    members: User[] = [];
    userSessionToken: string;
    messagesFetched: boolean = false;
    sendMsgOnWs: (msg: WsMessage<any>) => void
    
    constructor(
        position: Position, 
        conversationId: number, 
        user: User,
        userSessionToken: string,
        conversationTitle: string,
        sendMsgOnWs: (msg: WsMessage<any>) => void = ()=>{},
        
        
    ) {
        super(position)
        this.conversationId = conversationId
        this.user = user
        this.userSessionToken = userSessionToken
        this.conversationTitle = conversationTitle
        this.sendMsgOnWs = sendMsgOnWs
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
                    "Content-Type": "application/json",
                    "X-User-Session-Token": this.userSessionToken
                },
                body: JSON.stringify({
                    conversationId: this.conversationId
                })
            }
        ).then((response)=>{
            return response.json()
        }).then((data: ApiRequestResult<ConversationGetMessagesResponse>)=>{
            if (data.error){
                console.error("Error in conversation get messages: " + data.error)
                return

            }
            if (data.response?.messages != undefined){
                this.messages = data.response.messages
                this.sendMsgOnWs(new WsMessage<WsMessageRTMessagesInConversation>({
                    event: WsEvent.RT_MESSAGES_IN_CONVERSATION,
                    error: "",
                    data: {
                        conversationId: this.conversationId
                    },
                    requestId: 0
                }))
                // TODO SOME EVENT REGISTRY?
                setTimeout(onFinished, 500)
            }
            else {
                console.info("Didn't receive proper response body in conversation get messages request")
            }
    
        }).catch((reason)=>{
            console.error("Exception in conversation get messages response...")
            console.error(reason)
       
        })
        this.messagesFetched = true

        
    }

    addMessage(msg: ConversationMessage){
        this.messages.push(msg)
        this.notify()
    }

    sendMsg(msg: string) : void{
        if (!msg) return;

        fetch(
            BUNNID_API_URL + "service/conversation/send", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-User-Session-Token": this.userSessionToken
                },
                body: JSON.stringify({
                    conversationId: this.conversationId,
                    userId: Number(this.user.id),
                    msgContent: String(msg)
                })
            }
        ).then((response)=>{
            return response.json()
        }).then((data: ApiRequestResult<ConversationSendMessageResoponse>)=>{
            if (data.error){
                console.error("Error in conversation send msg: " + data.error)
                
                return
            }
            if (data.response?.message_id == undefined){
                console.info("Didn't receive proper response body for conversation send request")
            }
        }).catch((reason)=>{
            console.error("Exception in conversation send msg request...")
            console.error(reason)
       
        })
     
    }
    

    makeContent() {
        return (
            <Conversation conversation={this}/>
        )
        
    }
}