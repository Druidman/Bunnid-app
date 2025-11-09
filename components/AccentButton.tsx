import {Title} from "@mantine/core"
import React from "react";

interface AccentButtonParams{
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
}
const AccentButton = ({type = "button", onClick=()=>{}, children, disabled=false} : AccentButtonParams) => {


    return (
        <button 
            className="
                button !text-[var(--text-dark)] !bg-[var(--accent)] 
                duration-300 hover:rounded-[30px] hover:!bg-[var(--info)]
            " 
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            <Title order={1} className="text-[var(--text-dark)]">{children}</Title>
        </button>
    )
}
export default AccentButton;