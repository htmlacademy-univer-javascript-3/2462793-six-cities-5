import {State} from '../../types/state.ts';
import {AuthorizationStatus, Namespace} from '../../const.ts';

export const getAuthorizationStatus = (state: Pick<State, Namespace.User>): AuthorizationStatus => state[Namespace.User].authorizationStatus;

export const getUserEmail = (state: Pick<State, Namespace.User>): string | null => state[Namespace.User].userEmail;
