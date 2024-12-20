import {AppData} from '../../types/state.ts';
import {AMSTERDAM, LoadingStatus, PARIS} from '../../const.ts';
import {appData, changeActiveCity, setLoadingStatus} from './app-data.ts';

describe('AppData slice', () => {
  const initialState: AppData = {
    city: PARIS,
    loadingStatus: null
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change city with "changeActiveCity" action', () => {
    const newCity = AMSTERDAM;
    const expectedState = { ...initialState, city: newCity };

    const result = appData.reducer(initialState, changeActiveCity(newCity));

    expect(result).toEqual(expectedState);
  });

  it('should handle setLoadingStatus action', () => {
    const newLoadingStatus = LoadingStatus.Loading;

    const result = appData.reducer(initialState, setLoadingStatus(newLoadingStatus));

    expect(result.loadingStatus).toBe(newLoadingStatus);
  });
});
