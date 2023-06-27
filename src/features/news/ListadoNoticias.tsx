import TarjetaNoticias from "./TarjetaNoticias";
import {ListaNoticias} from "./styled";
import { INoticiasNormalizadas } from "./types";

interface IProps{
    noticias:INoticiasNormalizadas[]
}


export const ListadoNoticias = ({noticias}:IProps) =>{

    return(
        <ListaNoticias>
        {noticias.map((noticia) => (
            <TarjetaNoticias noticia={noticia} key={noticia.id}/>
        ))}
        </ListaNoticias>
    )
}