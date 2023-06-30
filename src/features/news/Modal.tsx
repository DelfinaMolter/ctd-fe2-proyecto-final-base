
import { ModalFree } from "./ModalFree";
import { ModalPremium } from "./ModalPremium";
import useModal from "./contextModal";
import { ContenedorModal } from "./styled";



export const Modal = () =>{
    const { modal } = useModal();
    return(
        <>
        { modal && 
            <ContenedorModal>
            {modal?.esPremium ? <ModalPremium/>: <ModalFree/>} 
            </ContenedorModal>
        }
        </>
    )
}