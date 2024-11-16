import {Location} from './location.ts';

export type City = {
  name: 'Paris'
    | 'Cologne'
    | 'Brussels'
    | 'Amsterdam'
    | 'Hamburg'
    | 'Dusseldorf';
  location: Location;
};
