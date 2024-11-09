import {User} from './user';
import {City} from './city';
import {Location} from './location';
import {PlaceType} from '../const.ts';

export type DetailOffer = {
  id: string;
  title: string;
  type: PlaceType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}
