import {DetailOfferData} from '../../types/state.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Namespace} from '../../const.ts';
import {DetailOffer} from '../../types/detail-offer.ts';
import {Offer} from '../../types/offer.ts';
import {Review} from '../../types/review.ts';

const initialState: DetailOfferData = {
  detailOffer: null,
  nearOffers: [],
  reviews: []
};

export const detailOfferData = createSlice({
  name: Namespace.DetailOffer,
  initialState,
  reducers:{
    setDetailOffer: (state, action: PayloadAction<DetailOffer | null>) => {
      state.detailOffer = action.payload;
    },
    setNearOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearOffers = action.payload;
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    sendReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    }
  }
});

export const {setDetailOffer, setNearOffers, setReviews, sendReview} = detailOfferData.actions;
