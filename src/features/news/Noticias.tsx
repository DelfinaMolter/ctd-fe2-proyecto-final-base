import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import {
  ContenedorNoticias,
  TituloNoticias,
} from "./styled";
import { INoticiasNormalizadas } from "./types";
import normalizarNoticia from "./utils";
import { ListadoNoticias } from "./ListadoNoticias";
import useModal, { ModalContextProvider } from "./contextModal";
import { Modal } from "./Modal";

//  Implementacion del principio SOLID:  Principio de Responsabilidad Única
//  Separé todas las diferente acciones para que cada componente tenga su tarea y así sea mas sensillo visualizar y entender el codigo. Tambien facilita la localizacion de un error si lo hubiera.



const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((noticia) => {
        return normalizarNoticia(noticia)
      });
      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return (
    <ModalContextProvider>
      <ContenedorNoticias>
        <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
        <ListadoNoticias noticias={noticias} />
        <Child/>
      </ContenedorNoticias>
    </ModalContextProvider>
  );
};

const Child =()=>{
  const { modal } = useModal();
  return(
    <>
    {modal && <Modal/>}
    </>
  )
}

export default Noticias;
