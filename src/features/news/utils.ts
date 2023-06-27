import { INoticias } from "./fakeRest";

const nomralizarTitulo = (titulo: string)=>{
    return titulo
            .split(" ")
            .map((str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            })
            .join(" ");
}
const calcularMinutos = (noticia:INoticias)=>{
    const fechaActual = new Date();
    return Math.floor(
        (fechaActual.getTime() - noticia.fecha.getTime()) / 60000
    );
}

const normalizarNoticia =(noticia:INoticias)=>{
    const titulo = nomralizarTitulo(noticia.titulo);
    const minutosTranscurridos = calcularMinutos(noticia);
    const fecha= `Hace ${minutosTranscurridos} minutos`;
    const descripcionCorta= noticia.descripcion.substring(0, 100);
    return {
        id: noticia.id,
        titulo,
        descripcion: noticia.descripcion,
        fecha,
        esPremium: noticia.esPremium,
        imagen: noticia.imagen,
        descripcionCorta
    };

}

export default normalizarNoticia;