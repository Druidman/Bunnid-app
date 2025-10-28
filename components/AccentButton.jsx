import {Title} from "@mantine/core"

const AccentButton = ({onClick, children}) => {


    return (
        <button 
            className="
                button !text-[var(--text-dark)] !bg-[var(--accent)] 
                duration-300 hover:rounded-[30px] hover:!bg-[var(--info)]
            " 
            onClick={(e)=>{onClick(e)}}
        >
            <Title order={1} className="text-[var(--text-dark)]">{children}</Title>
        </button>
    )
}
export default AccentButton;