import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Cita from "./Cita";
import userEvent from '@testing-library/user-event';
import { render } from "../../test-utils";
import { API_URL } from "../../app/constants";
import { mockedCitas } from "./mockedCitas";

// const dataAleatorea = [{
//     quote: "Well, I'm better than dirt. Well, most kinds of dirt. I mean not that fancy store bought dirt. That stuffs loaded with nutrients. I.. I can't compete with that stuff.",
//     character: "Moe Szyslak",
//     image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMoeSzyslak.png?1497567512411",
//     characterDirection: "Right"
// }];

// const dataPersonalizada= [
//     {
//     quote: "Oh, so they have Internet on computers now!",
//     character: "Homer Simpson",
//     image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
//     characterDirection: "Right"
//     }
//     ]

// const dataVacia: string[] = [];

// export const handlers = [
//     rest.get(API_URL, (req, res, ctx) => {
//         return res(ctx.json(dataAleatorea), ctx.status(200));
//     }),
// ];


const randomQuote = mockedCitas[0].data;
const validQueries = mockedCitas.map((q)=> q.query);

const handlers = [
    rest.get(`${API_URL}`, (req, res, ctx) => {
        const character = req.url.searchParams.get('character');

        if (character === null) {
            return res(ctx.json([randomQuote]), ctx.delay(150));
        }

        if (validQueries.includes(character)) {
            const quote = mockedCitas.find((q) => q.query === character);
            return res(ctx.json([quote?.data]));
        }

        return res(ctx.json([]), ctx.delay(150));
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
        it('Debe mostrar el boton de borrado',()=>{
            renderComponentDefault();
            expect(screen.getByRole('button',{name: /Borrar/i})).toBeInTheDocument();
        });
        it('Se debe mostrar un boto que diga "Obtener cita aleatoria"',()=>{
            renderComponentDefault();
            expect(screen.getByRole('button',{name: /Obtener cita aleatoria/i })).toBeInTheDocument();
        });
        it('Cuando se ingresa algo en el input el boton de "obtener cita ateatoria" debe cambiar a "Obtener Cita"', async()=>{
            renderComponentDefault();
            const input = screen.getByRole('textbox', {name:'Author Cita'});
            userEvent.click(input);
            await userEvent.type(input,"moe")
            const buttonSearch = await screen.findByRole('button', {name:/Obtener Cita/i});
            expect(buttonSearch).toBeInTheDocument();
        });
    });
    describe('Cuando se carga una cita satisfactoriamente',() => {
        
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
            userEvent.click(input);
            await userEvent.type(input,"Homer")
            const buttonSearch = await screen.findByText(/Obtener Cita/i);
            userEvent.click(buttonSearch);
            await waitFor(()=>{
                expect(screen.getByText(mockedCitas[1].data.quote)).toBeInTheDocument()
            })
        })
        
    });

    describe("Cuando la info brindada es erronea", ()=>{
        it('Cuando se tipea numeros en el input', async() =>{
            renderComponentDefault();
            const input = screen.getByPlaceholderText('Ingresa el nombre del autor');
            userEvent.click(input);
            await userEvent.type(input,"1")
            const buttonSearch = screen.getByRole('button', {name: /Obtener Cita/i});
            userEvent.click(buttonSearch);
            await waitFor(()=>{
                expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument()
            })
        })
        it('Cuando se tipea un personaje que no existe en el input', async() =>{
            renderComponentDefault();
            const input = screen.getByRole('textbox', {name:'Author Cita'});
            userEvent.click(input);
            await userEvent.type(input,"homero")
            const buttonSearch = await screen.findByText(/Obtener Cita/i);
            userEvent.click(buttonSearch);
            await waitFor(()=>{
                expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument()
            })
        })
    })
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