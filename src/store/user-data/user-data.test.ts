import {UserData} from '../../types/state.ts';
import {AuthorizationStatus} from '../../const.ts';
import {saveUserEmail, setAuthorizationStatus, userData} from './user-data.ts';
import {internet} from 'faker';

describe('UserData slice', () => {
  const initialState: UserData = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userEmail: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change authorization status with "setAuthorizationStatus" action', () => {
    const newAuthStatus = AuthorizationStatus.Authorized;
    const expectedState = { ...initialState, authorizationStatus: newAuthStatus };

    const result = userData.reducer(initialState, setAuthorizationStatus(newAuthStatus));

    expect(result).toEqual(expectedState);
  });

  it('should save email with "saveUserEmail" action', () => {
    const userEmail = internet.email();
    const expectedState = { ...initialState, userEmail: userEmail };

    const result = userData.reducer(initialState, saveUserEmail(userEmail));

    expect(result).toEqual(expectedState);
  });

  it('should clear email with "saveUserEmail" action with empty string', () => {
    const stateWithEmail = { ...initialState, userEmail: internet.email() };
    const expectedState = { ...initialState, userEmail: null };

    const result = userData.reducer(stateWithEmail, saveUserEmail(null));

    expect(result).toEqual(expectedState);
  });
});
