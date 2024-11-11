import {Offer} from '../types/offer';
import {Cities, PlaceType} from '../const.ts';

export const offers: Offer[] = [
  {
    'id': 'aaeb9d82-459d-48ca-8f44-518912791ff0',
    'title': 'Beautiful & luxurious apartment at great location',
    'type': PlaceType.Apartment,
    'price': 241,
    'imageSrc': 'apartment-01.jpg',
    'city': {
      'name': Cities.Amsterdam,
      'location': {
        'latitude': 52.3835,
        'longitude': 4.8999,
        'zoom': 12
      }
    },
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 1.7
  },
  {
    'id': 'e50c65bc-1822-4ae8-9807-bb050b84e4fb',
    'title': 'Wood and stone place',
    'type': PlaceType.Room,
    'price': 286,
    'imageSrc': 'room.jpg',
    'city': {
      'name': Cities.Amsterdam,
      'location': {
        'latitude': 52.3835,
        'longitude': 4.8999,
        'zoom': 12
      }
    },
    'location': {
      'latitude': 52.3609553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 5
  },
  {
    'id': '8ac1d09e-81da-444c-b8c4-04b2a4c3219a',
    'title': 'Canal View Prinsengracht',
    'type': PlaceType.Apartment,
    'price': 169,
    'imageSrc': 'apartment-02.jpg',
    'city': {
      'name': Cities.Amsterdam,
      'location': {
        'latitude': 52.3835,
        'longitude': 4.8999,
        'zoom': 12
      }
    },
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.929309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.3
  },
  {
    'id': '5589a300-6208-4f52-908b-b8d348b0844e',
    'title': 'Nice, cozy, warm big bed apartment',
    'type': PlaceType.Apartment,
    'price': 469,
    'imageSrc': 'apartment-03.jpg',
    'city': {
      'name': Cities.Amsterdam,
      'location': {
        'latitude': 52.3835,
        'longitude': 4.8999,
        'zoom': 12
      }
    },
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 3.8
  }
];
