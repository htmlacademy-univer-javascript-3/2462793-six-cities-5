import {JSX} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

export function PrivateRouteAuthorized(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const isAuthorized = useAppSelector((state) => state.authorizationStatus) === AuthorizationStatus.Authorized;
  return (
    isAuthorized
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export function PrivateRouteUnauthorized(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const isAuthorized = useAppSelector((state) => state.authorizationStatus) === AuthorizationStatus.Unauthorized;
  return (
    isAuthorized
      ? children
      : <Navigate to={AppRoute.Main} />
  );
}
