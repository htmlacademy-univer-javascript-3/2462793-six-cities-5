import {Icon} from 'leaflet';
import {City} from './types/city.ts';
import {SortOption} from './types/sort-option.ts';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Authorized ,
  Unauthorized ,
  Unknown
}

export enum PlaceType {
  Apartment = 'Apartment',
  Room = 'Room'
}

export const DEFAULT_CUSTOM_ICON = new Icon({
  iconUrl: 'public/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const CURRENT_CUSTOM_ICON = new Icon({
  iconUrl: 'public/img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const MIN_COMMENT_LENGTH = 50;

export const MAX_COMMENT_LENGTH = 300;

export const PARIS: City = {
  name: 'Paris',
  location: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 13,
  },
};

export const COLOGNE: City = {
  name: 'Cologne',
  location: {
    latitude: 50.935173,
    longitude: 6.953101,
    zoom: 13,
  },
};

export const BRUSSELS: City = {
  name: 'Brussels',
  location: {
    latitude: 50.85045,
    longitude: 4.34878,
    zoom: 13,
  },
};

export const AMSTERDAM: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 12
  }
};

export const HAMBURG: City = {
  name: 'Hamburg',
  location: {
    latitude: 53.551086,
    longitude: 9.993682,
    zoom: 13,
  },
};

export const DUSSELDORF: City = {
  name: 'Dusseldorf',
  location: {
    latitude: 51.233334,
    longitude: 6.783333,
    zoom: 12,
  },
};

export const CITIES : City[] = [
  PARIS,
  COLOGNE,
  BRUSSELS,
  AMSTERDAM,
  HAMBURG,
  DUSSELDORF
];

export const SORT_OPTIONS : SortOption[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export enum ApiRoute {
  offers = '/offers',
  favorite = '/favorite',
  login = '/login',
  logout = '/logout',
  reviews = '/comments'
}

export enum Namespace {
  App = 'APP',
  Offers = 'OFFERS',
  DetailOffer = 'DETAIL_OFFER',
  User = 'USER'
}

export enum FavoriteStatus {
  Remove,
  Add
}

export enum LoadingStatus {
  Loading = 'loading' ,
  Succeed = 'succeed',
  Failed = 'failed'
}

