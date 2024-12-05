import {AppData} from '../../types/state.ts';
import {LoadingStatus, Namespace, PARIS} from '../../const.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../../types/city.ts';

const initialState: AppData = {
  city: PARIS,
  loadingStatus: null
};

export const appData = createSlice({
  name: Namespace.App,
  initialState,
  reducers: {
    changeActiveCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.loadingStatus = action.payload;
    }
  }
});

export const {changeActiveCity, setLoadingStatus} = appData.actions;
