import {AuthorizationStatus, Namespace} from '../../const.ts';
import {getAuthorizationStatus, getUserEmail} from './selectors.ts';

describe('UserData selectors', () => {
  const state = {
    [Namespace.User]: {
      authorizationStatus: AuthorizationStatus.Authorized,
      userEmail: 'example@example.com',
    }
  };

  it('should return authorization status from state', () => {
    const { authorizationStatus } = state[Namespace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return user email from state', () => {
    const { userEmail } = state[Namespace.User];
    const result = getUserEmail(state);
    expect(result).toBe(userEmail);
  });

  it('should return null for email when state has no email', () => {
    const stateWithoutEmail = {
      [Namespace.User]: {
        ...state[Namespace.User],
        userEmail: null,
      }
    };
    const result = getUserEmail(stateWithoutEmail);
    expect(result).toBeNull();
  });
});
