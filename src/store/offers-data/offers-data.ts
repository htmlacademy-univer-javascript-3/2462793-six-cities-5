import {OffersData} from '../../types/state.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Namespace} from '../../const.ts';
import {Offer} from '../../types/offer.ts';

const initialState: OffersData = {
  offers: [],
  favoritesOffers: [],
  favoritesCount: 0
};

export const offersData = createSlice({
  name: Namespace.Offers,
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    updateOffers: (state, action: PayloadAction<Offer>) => {
      state.offers = state.offers.map((offer) =>
        offer.id === action.payload.id ? action.payload : offer
      );
    },
    setFavoritesOffers: (state, action: PayloadAction<Offer[]>) => {
      state.favoritesOffers = action.payload;
    },
    setFavoritesCount: (state, action: PayloadAction<number>) => {
      state.favoritesCount = action.payload;
    }
  }
});

export const {setOffers, updateOffers, setFavoritesOffers, setFavoritesCount} = offersData.actions;
