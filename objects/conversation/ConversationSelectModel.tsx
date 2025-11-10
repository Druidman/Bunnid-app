import { Position } from "../../types/position";
import BoxModel from "../BoxModel"
import ConversationModel from "./ConversationModel"
import { BUNNID_API_URL } from "../../globals/api"
import { User } from "../../types/user"
import { BunnidApiResponse } from "../../types/BunnidApiResponse"
import React from "react";
import ConversationSelect from "../../components/windows/ConversationSelect.tsx"

export default class ConversationSelectModel extends BoxModel{
    user: User;
    conversations: ConversationModel[] | [] = [];
    selectedConversationIndex: number = 0;
    userSessionToken: string;
    constructor(position: Position, user: User | null, userSessionToken: string){
        super(position)
        if (user){
            this.user = user
        }
        else{
            throw new Error("Added null user to conversationSelectModel")
        }
        
        this.userSessionToken = userSessionToken
    }

    private makeConversationModelsOfData(data: any) : ConversationModel[] | [] {
        let conversations: ConversationModel[] = []
        for (let conversation of data){
           
        }
        return conversations;
    }

    fetchConversations(){
        if (!this.user){
            return 
        }
        fetch(
            BUNNID_API_URL + "service/conversation/list", 
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
        }).then((data: BunnidApiResponse)=>{
            if (!data.STATUS){
                console.log("Wrong status in fetching conversations")
                console.error(data.MSG)
                return

            }
            console.log(data.MSG)
            this.conversations = this.makeConversationModelsOfData(data.MSG)

    
        }).catch((reason)=>{
            console.log("ERROR IN FETCHING CONVERSATIONS")
            console.error(reason)
        
        })
    }

    makeContent() : React.ReactNode {
        return <ConversationSelect conversationSelectModel={this}/>
    }

    makeConversationWindow(convIndex: number) : ConversationModel{
        return this.conversations[convIndex]
    }

}