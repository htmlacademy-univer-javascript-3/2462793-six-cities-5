import {JSX} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {getAuthoriztionStatus} from '../../store/user-data/selectors.ts';

type PrivateRouteProps = {
  children: JSX.Element;
}

export function PrivateRouteAuthorized(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const isAuthorized = useAppSelector(getAuthoriztionStatus) === AuthorizationStatus.Authorized;
  return (
    isAuthorized
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export function PrivateRouteUnauthorized(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const isAuthorized = useAppSelector(getAuthoriztionStatus) === AuthorizationStatus.Unauthorized;
  return (
    isAuthorized
      ? children
      : <Navigate to={AppRoute.Main} />
  );
}
