import {Icon} from 'leaflet';
import {City} from './types/city.ts';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum PlaceType {
  Apartment = 'Apartment',
  Room = 'Room'
}

export const defaultCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const currentCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const minCommentLength = 50;

export const maxCommentLength = 300;

export enum sortOptions {
  Popular = 'Popular',
  Increasing = 'Price: low to high',
  Decreasing = 'Price: high to low',
  Rating = 'Top rated first',
}

export const Paris: City = {
  name: 'Paris',
  location: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 13,
  },
};

export const Cologne: City = {
  name: 'Cologne',
  location: {
    latitude: 50.935173,
    longitude: 6.953101,
    zoom: 13,
  },
};

export const Brussels: City = {
  name: 'Brussels',
  location: {
    latitude: 50.85045,
    longitude: 4.34878,
    zoom: 13,
  },
};

export const Amsterdam: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 12
  }
};

export const Hamburg: City = {
  name: 'Hamburg',
  location: {
    latitude: 53.551086,
    longitude: 9.993682,
    zoom: 13,
  },
};

export const Dusseldorf: City = {
  name: 'Dusseldorf',
  location: {
    latitude: 51.233334,
    longitude: 6.783333,
    zoom: 12,
  },
};

export const Cities : City[] = [
  Paris,
  Cologne,
  Brussels,
  Amsterdam,
  Hamburg,
  Dusseldorf
];
