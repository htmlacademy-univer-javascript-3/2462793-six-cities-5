import {internet, name} from 'faker';
import {Offer} from '../types/offer.ts';
import {AuthorizationStatus, CITIES, LoadingStatus, PARIS, PlaceType} from '../const.ts';
import {DetailOffer} from '../types/detail-offer.ts';
import {User} from '../types/user.ts';
import {Review} from '../types/review.ts';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {State} from '../types/state.ts';
import {createAPI} from '../serviсes/api.ts';
import {Action} from 'redux';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export function makeFakeUser(): User {
  return {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: Math.random() > 1
  };
}

export function makeFakeOffer(): Offer {
  const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
  return {
    id: name.title(),
    title: name.title(),
    type: PlaceType.Apartment,
    price: Math.floor(Math.random() * 1000),
    city: randomCity,
    location: {
      latitude: Math.random() * 90,
      longitude: Math.random() * 180,
      zoom: 10
    },
    isFavorite: Math.random() > 1,
    isPremium: Math.random() > 1,
    rating: Math.random() * 5,
    previewImage: internet.url()
  };
}

export function makeFakeDetailOffer(): DetailOffer {
  return {
    ...makeFakeOffer(),
    description: name.title(),
    bedrooms: Math.floor(Math.random() * 5),
    goods: ['WiFi', 'Kitchen'],
    host: makeFakeUser(),
    images: [internet.url(), internet.url()],
    maxAdults: Math.floor(Math.random() * 6)
  };
}

export function makeFakeReview(): Review {
  return {
    id: name.title(),
    date: new Date().toISOString(),
    user: makeFakeUser(),
    comment: name.title(),
    rating: Math.floor(Math.random() * 5)
  };
}

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  APP: {
    city: PARIS,
    loadingStatus: LoadingStatus.Succeed,
    ...initialState?.APP
  },
  DETAIL_OFFER: {
    detailOffer: null,
    nearOffers: [],
    reviews: [],
    ...initialState?.DETAIL_OFFER
  },
  OFFERS: {
    offers: [],
    favoritesOffers: [],
    favoritesCount: 0,
    ...initialState?.OFFERS
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Unauthorized,
    userEmail: null,
    ...initialState?.USER
  }
});

