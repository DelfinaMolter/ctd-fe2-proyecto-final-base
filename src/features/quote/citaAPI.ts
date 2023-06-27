import { API_URL } from "../../app/constants";
import { ICita } from "./types";

export const obtenerCita: (personaje?: string) => Promise<ICita> = async (
  personaje
) => {
  if (personaje && parseInt(personaje)) {
    console.log(personaje)
    throw new Error("El nombre debe ser un texto");
  }

  const url = personaje ? `${API_URL}?character=${personaje}` : API_URL;
  const respuesta = await fetch(url);
  const [data] = await respuesta.json();

  const dataNormalizada = {
    cita: data.quote,
    personaje: data.character,
    imagen: data.image,
    direccionPersonaje: data.characterDirection,
  };

  return dataNormalizada;
};
