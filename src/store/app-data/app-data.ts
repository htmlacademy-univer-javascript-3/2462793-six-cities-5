import {AppData} from '../../types/state.ts';
import {Namespace, Paris} from '../../const.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../../types/city.ts';

const initialState: AppData = {
  city: Paris
};

export const appData = createSlice({
  name: Namespace.App,
  initialState,
  reducers: {
    changeActiveCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    }
  }
});

export const {changeActiveCity} = appData.actions;
