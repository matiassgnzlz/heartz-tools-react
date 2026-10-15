// Utilidades para montar componentes React en el DOM real del navegador.
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const montados = [];

export function render(ui, { ruta = '/' } = {}) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(<MemoryRouter initialEntries={[ruta]}>{ui}</MemoryRouter>);
  });
  montados.push({ root, container });
  return container;
}

export function click(elemento) {
  act(() => {
    elemento.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
}

// Se llama en afterEach para dejar el DOM limpio entre pruebas
export function limpiar() {
  while (montados.length) {
    const { root, container } = montados.pop();
    act(() => root.unmount());
    container.remove();
  }
}
