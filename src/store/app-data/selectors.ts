import {State} from '../../types/state.ts';
import {Namespace} from '../../const.ts';
import {City} from '../../types/city.ts';

export const getActiveCity = (state: State): City => state[Namespace.App].city;
