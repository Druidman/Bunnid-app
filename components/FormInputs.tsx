import { PasswordInput, TextInput } from "@mantine/core"
import React from "react";

export type InputForm = {
    keyVal: any;
    placeholder: string; 
    form: any;
    className?: string;
}

export function PasswordFormInput({keyVal, placeholder, form, className} : InputForm){
    return <PasswordInput 
        classNames={{
            input: `\
            !bg-[var(--bg)] !text-[var(--text)] !w-full \
            !border-none \
            !outline-1 hover:!outline-[var(--accent)] !outline-[var(--text-muted)] ${className}`,
            root: "!w-full"
        }}
        radius="xl" 
        placeholder={placeholder}
        key={form.key(keyVal)}
        {...form.getInputProps(keyVal)}
    />
}

export function FormInput({keyVal, placeholder, form, className} : InputForm){
    return <TextInput 
        classNames={{
            input: `\
            mt-1\
            !bg-[var(--bg)] !text-[var(--text)] !w-full \
            !border-none \
            !outline-1 hover:!outline-[var(--accent)] !outline-[var(--text-muted)] ${className}`,
            root: "!w-full"
        }}
        radius="xl" 
        placeholder={placeholder}
        key={form.key(keyVal)}
        {...form.getInputProps(keyVal)}
    />
}