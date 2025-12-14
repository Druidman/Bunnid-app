import BoxModel from "../BoxModel"
import Conversation from "../../components/windows/ConversationWindow"
import { BUNNID_API_URL } from "../../globals/api"
import { User } from "../../types/user";
import { ConversationMessage } from "../../types/message";
import { Position } from "../../types/position";
import WsMessage from "../wsMesage";
import { WsEvent } from "../wsEvent";
import { ApiRequestResult, ConversationGetMessagesResponse, ConversationSendMessageResponse } from "../../types/ApiResponses";
import { WsMessageRTMessagesInConversation } from "../../types/WsMessagePayload";
import { EventPool } from "../eventPool/EventPool";
import { RefObject } from "react";
import { ConversationMsgEventListener } from "../eventPool/events/conversationMsg/Listener";
import { EventType } from "../eventPool/EventType";
import { ConversationMsgEventData } from "../eventPool/events/conversationMsg/Data";

export default class ConversationModel extends BoxModel{
    user: User;
    conversationId: number = -1;
    conversationTitle?: string = "";
    messages: ConversationMessage[] = []
    members: User[] = [];
    userSessionToken: string;
    sendMsgOnWs: (msg: WsMessage<any>) => void


    private messagesFetched: boolean = false;
    private listenerAssigned: boolean = false;
    
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
    registerMsgListenerToEventPool(eventPool: RefObject<EventPool | null>){
        if (this.listenerAssigned){
            return
        }
        eventPool.current?.events[EventType.NEW_CONVERSATION_MSG]?.add_listener(new ConversationMsgEventListener(
            (data: ConversationMsgEventData)=>{
                console.log("Event worked")
                if (data.conversation_id != this.conversationId){
                    console.info("Idk not my problem")
                }
                if (data.user_id == this.user.id){
                    return
                }
                this.addMessage({user_id: data.user_id, content: data.content})
                console.log("Adding msg: " , data.content)
            },
            this.conversationId
        ))
        this.listenerAssigned = true
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
                    "Authorization": `Bearer ${this.userSessionToken}`
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

    sendMsg(msg: string, onSuccess?: ()=>void) : void{
        if (!msg) return;
        if ( msg.length > 300 ){
            return
        }

        fetch(
            BUNNID_API_URL + "service/conversation/send", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.userSessionToken}`
                },
                body: JSON.stringify({
                    conversationId: this.conversationId,
                    userId: Number(this.user.id),
                    msgContent: String(msg)
                })
            }
        ).then((response)=>{
            return response.json()
        }).then((data: ApiRequestResult<ConversationSendMessageResponse>)=>{
            if (data.error){
                console.error("Error in conversation send msg: " + data.error)
                
                return
            }
            if (data.response?.message_id == undefined){
                console.info("Didn't receive proper response body for conversation send request")
            }
            onSuccess?.()
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