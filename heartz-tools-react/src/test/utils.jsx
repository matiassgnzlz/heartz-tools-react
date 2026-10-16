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

// Escribe en un input/textarea controlado por React (dispara el evento 'input')
export function escribir(elemento, valor) {
  const proto = elemento instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
  act(() => {
    setter.call(elemento, valor);
    elemento.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

// Envía un formulario
export function enviar(form) {
  act(() => {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
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
