import useModal from "./contextModal";
import {
    FechaTarjetaNoticia,
    DescripcionTarjetaNoticia,
    ImagenTarjetaNoticia,
    TituloTarjetaNoticia,
    TarjetaNoticia,
    BotonLectura
} from "./styled";
import { INoticiasNormalizadas } from "./types";

interface IProps{
    noticia:INoticiasNormalizadas

}

const TarjetaNoticias =({noticia}:IProps)=>{
    const { setModal} = useModal();
    return(
        <TarjetaNoticia>
            <ImagenTarjetaNoticia src={noticia.imagen} />
            <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
                {noticia.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => setModal(noticia)}>Ver más</BotonLectura>
        </TarjetaNoticia>
    )
}

export default TarjetaNoticias;