import React from "react";

const ErrorMsg = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <h1 className="text-[var(--text)] text-[48px]">Error!</h1>
            <h1 className="text-[var(--text-muted)] text-base">{children}</h1>
        </div>
        
    )
}
export default ErrorMsg;