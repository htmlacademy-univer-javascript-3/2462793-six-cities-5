import {UserData} from '../../types/state.ts';
import {AuthorizationStatus, Namespace} from '../../const.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null
};

export const userData = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    saveUserEmail: (state, action: PayloadAction<string | null>) => {
      state.userEmail = action.payload;
    }
  }
});

export const {setAuthorizationStatus, saveUserEmail} = userData.actions;
