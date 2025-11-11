import { Position } from "../../types/position";
import BoxModel from "../BoxModel"
import ConversationModel from "./ConversationModel"
import { BUNNID_API_URL } from "../../globals/api"
import { User } from "../../types/user"
import { BunnidApiResponse } from "../../types/BunnidApiResponse"
import React from "react";
import ConversationSelect from "../../components/windows/ConversationSelect"

export default class ConversationSelectModel extends BoxModel {
    user: User;
    conversations: ConversationModel[] | [] = [];
    selectedConversationIndex: number = 0;
    userSessionToken: string;
    constructor(position: Position, user: User | null, userSessionToken: string) {
        super(position)
        if (user) {
            this.user = user
        }
        else {
            throw new Error("Added null user to conversationSelectModel")
        }

        this.userSessionToken = userSessionToken
    }

    private makeConversationModelsOfData(data: any): ConversationModel[] | [] {
        let conversations: ConversationModel[] = []
        for (let conversation of data) {
            conversations.push(new ConversationModel({x: 0, y: 0}, conversation.id, {id:0}, this.userSessionToken, conversation.title))
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: this.userSessionToken,
                    conversationTitle: title
                })
            }
        ).then((response) => {
            return response.json()
        }).then((data: BunnidApiResponse) => {
            if (!data.STATUS) {
                console.log("Wrong status in adding conversation")
                console.error(data.MSG)
                return

            }
            console.log(data.MSG)
         


        }).catch((reason) => {
            console.log("ERROR IN ADDING CONVERSATION")
            console.error(reason)

        })
    }

    fetchConversations() {
        if (!this.user) {
            return
        }
        console.log("Fetching list of conversations")
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
        ).then((response) => {
            return response.json()
        }).then((data: BunnidApiResponse) => {
            console.log("?")
            console.log(data)
            if (!data.STATUS) {
                console.log("Wrong status in fetching conversations")
                console.error(data.MSG)
                return

            }
            console.log(data.MSG)
            this.conversations = this.makeConversationModelsOfData(data.MSG)
            console.log(this.conversations)
            this.notify()


        }).catch((reason) => {
            console.log("ERROR IN FETCHING CONVERSATIONS")
            console.error(reason)

        })
    }

    makeContent(): React.ReactNode {
        
        return <ConversationSelect conversationSelectModel={this} />
    }

    makeConversationWindow(convIndex: number): ConversationModel {
        return this.conversations[convIndex]
    }

}