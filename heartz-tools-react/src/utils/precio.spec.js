import { formatearPrecio } from './precio';

describe('formatearPrecio', () => {
  it('debería mostrar el precio cero como Gratis', () => {
    expect(formatearPrecio(0)).toBe('Gratis');
  });

  it('debería formatear un precio positivo con separador de miles', () => {
    expect(formatearPrecio(15000)).toBe('$15.000');
  });
});
