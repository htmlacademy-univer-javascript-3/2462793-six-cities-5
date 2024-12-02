import {State} from '../../types/state.ts';
import {LoadingStatus, Namespace} from '../../const.ts';
import {City} from '../../types/city.ts';

export const getActiveCity = (state: State): City => state[Namespace.App].city;

export const getLoadingStatus = (state: State): LoadingStatus | null => state[Namespace.App].loadingStatus;
