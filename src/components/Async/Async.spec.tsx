import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from '.';

test('it renders correctly', async () => {
    render(<Async />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    //expect(await screen.findByText('Button')).toBeInTheDocument(); // Espera algo aparecer em tela, como timeout maximo de 1 segundo

    // screen.logTestingPlaygroundURL // Cria uma url que leva a um playground onde podemos ver em detalhes o que esta sendo montado na tela

    //await waitForElementToBeRemoved(screen.queryByText('Button')); // Verifica se o elemento nao esta na tela

    await waitFor(() => {
        return expect(screen.getByText('Hello World')).toBeInTheDocument();
        // return expect(screen.queryByText('Hello World')).not.toBeInTheDocument(); // Verifica se um elemento nao esta na tela
    }, {
        timeout: 4000
    }) // Posso definir o timeout que eu achar necessario, se nao definir vai assumir 1 segundo tambem.
})