import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import {
  ContenedorNoticias,
  TituloNoticias,
} from "./styled";
import { INoticiasNormalizadas } from "./types";
import normalizarNoticia from "./utils";
import { ListadoNoticias } from "./ListadoNoticias";
import useModal from "./contextModal";
import { Modal } from "./Modal";



const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const { modal } = useModal();

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

    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListadoNoticias noticias={noticias} />
      {modal && <Modal/>}
    </ContenedorNoticias>
  );
};

export default Noticias;
