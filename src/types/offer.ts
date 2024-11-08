import {City} from './city.ts';
import {Location} from './location.ts';
import {PlaceType} from '../const.ts';

export type Offer = {
  id: string;
  title: string;
  cardType: PlaceType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  imageSrc: string;
};
