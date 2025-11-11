import {Title} from "@mantine/core"
import React from "react";


interface AccentButtonParams{
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}
const AccentButton = ({type = "button", onClick=()=>{}, children, disabled=false, className} : AccentButtonParams) => {

    return (
        <button 

            className={`
                button !text-[var(--text-dark)] !bg-[var(--accent)] 
                duration-300 hover:rounded-[30px] hover:!bg-[var(--info)]
                ${className}
            `}
            onClick={onClick}
            type={type}
            disabled={disabled}
            
        >
            {children}
        </button>
    )
}
export default AccentButton;