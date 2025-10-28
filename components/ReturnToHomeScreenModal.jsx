import { useDisclosure } from "@mantine/hooks"
import { Text, Modal } from "@mantine/core"
import { useNavigate } from "react-router-dom"

import AccentButton from "./AccentButton"

const ReturnToHomeScreenModal = ({returnReason}) => {
    const [opened, { open, close }] = useDisclosure(true)
    const navigate = useNavigate();


    return (
        <Modal 
            opened={opened} 
            onClose={()=>{}} 
            title={
                <Text size="xl" fw={700} className="text-[var(--text)]">Error</Text>
            }
            centered
        >
            <div className="bg-[var(--bg)] w-full h-[fitcontent]  flex  gap-5 flex-col justify-start items-center">
                <Text order={1} className="!text-[var(--text-muted)]">{returnReason}</Text>
                <div className="w-full h-[fitcontent]">
                    <AccentButton onClick={()=>navigate("/")}>Home screen</AccentButton>
                </div>

               
                
            </div>
        </Modal>
    )
}

export default ReturnToHomeScreenModal;