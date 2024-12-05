import {State} from '../../types/state.ts';
import {AuthorizationStatus, Namespace} from '../../const.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[Namespace.User].authorizationStatus;

export const getUserEmail = (state: State): string | null => state[Namespace.User].userEmail;
