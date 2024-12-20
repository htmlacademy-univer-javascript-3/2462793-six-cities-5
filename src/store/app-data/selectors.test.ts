import {Namespace, PARIS} from '../../const.ts';
import {getActiveCity, getLoadingStatus} from './selectors.ts';

describe('AppData selectors', () => {
  const state = {
    [Namespace.App]: {
      city: PARIS,
      loadingStatus: null,
    },
  };

  it('should return city from state', () => {
    const { city } = state[Namespace.App];
    const result = getActiveCity(state);
    expect(result).toBe(city);
  });

  it('should return the loading status from state', () => {
    const result = getLoadingStatus(state);
    expect(result).toBe(null);
  });
});
