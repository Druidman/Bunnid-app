import { PasswordInput, TextInput } from "@mantine/core"
import { InputForm } from "../types/inputForm"
import React from "react";

export function PasswordFormInput({keyVal, placeholder, form} : InputForm){
    return <PasswordInput 
        classNames={{
            input: "!bg-[var(--bg)] !text-[var(--text)] !w-full"
        }}
        radius="xl" 
        placeholder={placeholder}
        key={form.key(keyVal)}
        {...form.getInputProps(keyVal)}
    />
}

export function FormInput({keyVal, placeholder, form} : InputForm){
    return <TextInput 
        classNames={{
            input: "!bg-[var(--bg)] !text-[var(--text)] !w-full"
        }}
        radius="xl" 
        placeholder={placeholder}
        key={form.key(keyVal)}
        {...form.getInputProps(keyVal)}
    />
}