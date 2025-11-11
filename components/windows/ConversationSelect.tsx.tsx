import {useEffect, useState} from "react"
import { ConversationMessage } from "../../types/message"
import ConversationSelectModel from "../../objects/conversation/ConversationSelectModel"
import React from "react"
import { useForm } from '@mantine/form';
import {FormInput} from "../FormInputs"
import AccentButton from "../AccentButton";

export default function ConversationSelect({ conversationSelectModel } : {conversationSelectModel: ConversationSelectModel}){

    const conversationForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            conversationTitle: ''
        },
    
        validate: {
            conversationTitle: (value) => (value ? null : 'Invalid Title'),
        },
    });

    return (
        <div className="w-full h-full bg-inherit flex flex-col">
            <form onSubmit={conversationForm.onSubmit((values)=> console.log(values))} className="flex flex-row">
                <FormInput keyVal="" placeholder="Title" form={conversationForm}></FormInput>
                <button className="button !w-fit !p-[10px]">Search...</button>
                
            </form>
            <div>
                sdfsdf
            </div>
        </div>
    )
}