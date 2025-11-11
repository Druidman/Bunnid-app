import {useEffect, useState} from "react"

import ConversationSelectModel from "../../objects/conversation/ConversationSelectModel"
import React from "react"
import { useForm } from '@mantine/form';
import {FormInput} from "../FormInputs"

import ConversationModel from "../../objects/conversation/ConversationModel";
import { Title } from "@mantine/core";

import { Popover } from "@mantine/core"


export default function ConversationSelect({ conversationSelectModel } : {conversationSelectModel: ConversationSelectModel}){
    const [popoverOpened, setPopoverOpened] = useState(false);

    const conversationSearchForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: ''
        },
    
        validate: {
            title: (value) => (value ? null : 'Invalid Title'),
        },
    });

    const conversationForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
          
          title: ''
        },
    
        validate: {
          title: (value) => (value ? null : 'Please insert title'),
        },
    });
    useEffect(()=>{
        console.log("FETCH??")
        conversationSelectModel.fetchConversations()
    }, [])  

    return (
        <div className="w-full h-full bg-inherit flex flex-col items-center">
            <form onSubmit={conversationSearchForm.onSubmit((values)=> conversationSelectModel.fetchConversations())} className="flex flex-row w-full gap-5">
                <FormInput keyVal="title" placeholder="Title" form={conversationSearchForm} ></FormInput>
                <button type="submit" className="button !h-full" >Search...</button>
            </form>
            <div>
               
                {
                    
                    conversationSelectModel.conversations.map((item: ConversationModel)=>{
                        console.log(item + " added")
                        return (
                            <div key={item.conversationId}className="w-full h-fit border-1 border-[var(--text-muted)] flex flex-row justify-space-between">
                                <Title order={3}>{item.conversationTitle}</Title>
                                <div className="flex flex-row gap-1 w-[20%]">
                                    Pf's here
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="absolute bottom-0 p-2">
                <Popover 
                    opened={popoverOpened} onChange={setPopoverOpened} width={300} position="top" withArrow trapFocus
                    classNames={{
                        dropdown: "!bg-[var(--bg-light)] !border-none !rounded-[20px]"
                    }}>
                    <Popover.Target>
                        <button className="button accentButton" onClick={()=>setPopoverOpened((c)=> !c)}>
                            {
                                !popoverOpened &&
                                <Title order={3}>New Conversation</Title>
                            }
                            
                        </button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <form 
                            onSubmit={conversationForm.onSubmit((values)=> conversationSelectModel.makeNewConversation(values.title))} 
                            className="flex flex-row w-full gap-5"
                        >
                            <FormInput keyVal="title" placeholder="Title..." form={conversationForm}/>
                            <button type="submit" className="button accentButton">
                                <Title order={1}>Create!</Title>
                            </button>
                        </form>
                        
                        
                    </Popover.Dropdown>
                </Popover>
            </div>
            
            
        </div>
    )
}