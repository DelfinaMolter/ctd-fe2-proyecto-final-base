import {
    CloseButton,
    TarjetaModal,
    DescripcionModal,
    ImagenModal,
    TituloModal,
    CotenedorTexto,
} from "./styled";
import { CloseButton as Close } from "../../assets";
import useModal from "./contextModal";



export const ModalFree = () =>{
    const { modal , setModal} = useModal();
    return(
        <TarjetaModal>
            <CloseButton onClick={() => {
                setModal(null)
            }}>
                <img src={Close} alt="close-button" />
            </CloseButton>
            <ImagenModal src={modal?.imagen} alt="news-image" />
            <CotenedorTexto>
                <TituloModal>{modal?.titulo}</TituloModal>
                <DescripcionModal>{modal?.descripcion}</DescripcionModal>
            </CotenedorTexto>
        </TarjetaModal>
    )
}