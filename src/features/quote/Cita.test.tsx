
import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
// import { Provider } from "react-redux";
// import { store } from "../../app/store";
import Cita from "./Cita";
import userEvent from '@testing-library/user-event';
import { render } from "../../test-utils";
// import { act } from "react-dom/test-utils";


const url = "https://thesimpsonsquoteapi.glitch.me/quotes";

const data = [{
    quote: "Well, I'm better than dirt. Well, most kinds of dirt. I mean not that fancy store bought dirt. That stuffs loaded with nutrients. I.. I can't compete with that stuff.",
    character: "Moe Szyslak",
    image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMoeSzyslak.png?1497567512411",
    characterDirection: "Right"
}];


export const handlers = [
    rest.get(url, (req, res, ctx) => {
        return res(ctx.json(data), ctx.status(200));
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const renderComponentDefault=()=>{
    render(
        <Cita />
    );
}

describe('Citas', () => {
    describe('Cuando renderizamos la pagina de inicio', () => {
        it('No deberia mostrar ninguna cita', async () => {
            renderComponentDefault();
            expect(screen.queryByText(/Moe Szyslak/i)).not.toBeInTheDocument();
        });
    });
    describe('Cuando se carga una cita',() => {
        
        it('Cuando se esta esperando la cita y se renderiza el mensaje CARGANDO', async() =>{
            renderComponentDefault();
            const buttonSearch = screen.getByRole('button',{name: /Obtener cita aleatoria/i } );
            userEvent.click(buttonSearch);
            await waitFor(()=>{
                expect(screen.getByText(/CARGANDO/i)).toBeInTheDocument()
            })
        })
        it('Cuando se renderiza una cita de un personaje aleatorio', async() =>{
            renderComponentDefault();
            const buttonSearch = screen.getByRole('button',{name: /Obtener cita aleatoria/i } );
            userEvent.click(buttonSearch);
            await waitFor(()=>{
                expect(screen.getByText(/Moe Szyslak/i)).toBeInTheDocument()
            })
        })
        it('Cuando se rederiza una cita del personaje tipeado', async() =>{
            renderComponentDefault();
            const input = screen.getByRole('textbox', {name:'Author Cita'});
            userEvent.type(input, 'Moe')
            const buttonSearch = await screen.findByText(/Obtener Cita/i);
            userEvent.click(buttonSearch);
            await waitFor(()=>{
                expect(screen.getByText(/Moe Szyslak/i)).toBeInTheDocument()
            })
        })
        it('Cuando se tipea numeros en el input', async() =>{
            renderComponentDefault();
            const input = screen.getByRole('textbox', {name:'Author Cita'});
            await userEvent.clear(input)
            await userEvent.type(input, '123')
            const buttonSearch = await screen.findByText(/Obtener Cita/i);
            userEvent.click(buttonSearch);
            await waitFor(()=>{
                screen.debug();
                expect(screen.getByText(/El nombre debe ser un texto/i)).toBeInTheDocument()
            })
        })
        it.skip('Cuando se tipea un personaje que no existe en el input', async() =>{
            renderComponentDefault();
            const input = screen.getByRole('textbox', {name:'Author Cita'});
            await userEvent.clear(input)
            await userEvent.type(input, 'homero')
            const buttonSearch = await screen.findByText(/Obtener Cita/i);
            userEvent.click(buttonSearch);
            await waitFor(()=>{
                screen.debug();
                expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument()
            })
        })
    });

    describe("Boton de borrado", ()=>{
        it("Cuando se apreta el boton de borrar, se elimina el mensaje existente", async()=>{
            renderComponentDefault();
            const buttonSearch = await screen.findByText(/Obtener cita aleatoria/i);
            userEvent.click(buttonSearch);
            const buttonClear = await screen.findByLabelText(/Borrar/i)
            userEvent.click(buttonClear);
            await waitFor(()=>{
                expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument()
            })
            

        })
    })
});