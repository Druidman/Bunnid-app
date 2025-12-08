import { Position } from "../../types/position";
import BoxModel from "../BoxModel"
import ConversationModel from "./ConversationModel"
import { BUNNID_API_URL } from "../../globals/api"
import { User } from "../../types/user"
import React from "react";
import ConversationSelect from "../../components/windows/ConversationSelect"
import WsMessage from "../wsMesage";
import { ApiRequestResult, ConversationCreateResponse, ConversationGetResponse, ConversationListResponse, ConversationRequestModel } from "../../types/ApiResponses";

export default class ConversationSelectModel extends BoxModel {
    user: User;
    conversations: ConversationModel[] | [] = [];
    selectedConversationIndex: number = 0;
    userSessionToken: string;
    fetchedConversations: boolean=false;
    spawnWindow: (box: BoxModel | null) => void = ()=>{}
    sendMsgOnWs: (msg: WsMessage<any>) => void
    constructor(position: Position, user: User | null, userSessionToken: string, spawnWindow: (box: BoxModel | null)=>void, sendMsgOnWs: (msg: WsMessage<any>) => void) {
        super(position)
        if (user == null){
           throw Error("Trying to create new conversationSelectModel object with user=null. This action is forbidden") 
        }
        else {
            this.user = user
        }
        
        this.userSessionToken = userSessionToken
        this.spawnWindow = spawnWindow
        this.sendMsgOnWs = sendMsgOnWs
    }

    private makeConversationModelsOfData(data: ConversationRequestModel[]): ConversationModel[] | [] {
        let conversations: ConversationModel[] = []
        for (let conversation of data) {
            conversations.push(new ConversationModel(
                {x: 0, y: 0}, 
                conversation.id, 
                this.user,
                this.userSessionToken, 
                conversation.title,
                this.sendMsgOnWs
            ))
        }
        return conversations;
    }

    makeNewConversation(title: string) {
        if (!title) {
            return
        }
        fetch(
            BUNNID_API_URL + "service/conversation/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.userSessionToken}`
                },
                body: JSON.stringify({
                    conversationTitle: title
                })
            }
        ).then((response) => {
            return response.json()
        }).then(async (data: ApiRequestResult<ConversationCreateResponse>) => {
            if (data.error) {
                console.error("Error in conversation create request: " + data.error)
                return

            }
            if (!data.response.result){
                console.info("Conversation not created. Smth went wrong")
            }
            await this.fetchConversations({force: true})
         


        }).catch((reason) => {
            console.error("Exception in conversation create request...")
            console.error(reason)

        })
    }

    openConversation(conversationId: number) {
       
        if (!conversationId){
            return
        }
        

    
        fetch(
            BUNNID_API_URL + "service/conversation/get",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.userSessionToken}`
                },
                body: JSON.stringify({
                    conversationId: conversationId
                })
            }
        ).then((response) => {
            return response.json()
        }).then((data: ApiRequestResult<ConversationGetResponse>) => {
            if (data.error) {
                console.error("Error in conversation get request: " + data.error)
                return

            }
            if (data.response?.conversation == undefined){ 
                console.info("Smth went wrong with conversation get request")
            }
            else{
                this.spawnWindow(new ConversationModel(
                    {x: 0, y: 0}, 
                    data.response.conversation.id, 
                    this.user, 
                    this.userSessionToken, 
                    data.response.conversation.title,
                    this.sendMsgOnWs, 
                ))
            }

        }).catch((reason) => {
            console.error("Exception in conversation get request...")
            console.error(reason)

        })

    }


    fetchConversations({force=false, onFinished=()=>{}} : {force?: boolean, onFinished?: ()=>void}) {
        if (!this.user) {
            return
        }
        if (this.fetchedConversations && !force){
            return
        }

        fetch(
            BUNNID_API_URL + "service/conversation/list",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.userSessionToken}`
                }
               
            }
        ).then((response) => {
            return response.json()
        }).then((data: ApiRequestResult<ConversationListResponse>) => {
        
            if (data.error) {
                console.error("Error in conversation list request: " + data.error)
                return

            }
            if (data.response?.conversations != undefined){
                this.conversations = this.makeConversationModelsOfData(data.response.conversations)
                this.notify()
            }
            else {
                console.info("Didn't receive proper response body in conversation list")
            }
            


        }).catch((reason) => {
            console.error("Exception in conversation list request...")
            console.error(reason)

        })

        this.fetchedConversations = true // Yes, I know fetch isn't sync this is intentional
    }

    makeContent(): React.ReactNode {
        
        return <ConversationSelect conversationSelectModel={this} />
    }

    makeConversationWindow(convIndex: number): ConversationModel {
        return this.conversations[convIndex]
    }

}