import {State} from '../../types/state.ts';
import {LoadingStatus, Namespace} from '../../const.ts';
import {City} from '../../types/city.ts';

export const getActiveCity = (state: Pick<State, Namespace.App>): City => state[Namespace.App].city;

export const getLoadingStatus = (state: Pick<State, Namespace.App>): LoadingStatus | null => state[Namespace.App].loadingStatus;
