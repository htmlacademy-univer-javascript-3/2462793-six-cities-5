import {JSX, memo, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logout} from '../../store/api-actions.ts';
import {getFavoritesCount} from '../../store/offers-data/selectors.ts';
import {getAuthorizationStatus, getUserEmail} from '../../store/user-data/selectors.ts';
import {saveUserEmail} from '../../store/user-data/user-data.ts';
function Header() : JSX.Element {
  const isAuth = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Authorized;
  const dispatch = useAppDispatch();
  const logoutHandle = () => {
    dispatch(logout());
  };
  const favoritesCount = useAppSelector(getFavoritesCount);
  const userEmail = useAppSelector(getUserEmail);
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail && !userEmail) {
      dispatch(saveUserEmail(savedEmail));
    }
  }, [dispatch, userEmail]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    }
  }, [userEmail]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {isAuth ? (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{userEmail}</span>
                    <span className="header__favorite-count">{favoritesCount}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <div className="header__nav-link" onClick={logoutHandle}>
                    <span className="header__signout">Sign out</span>
                  </div>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <Link to={AppRoute.Login} className="header__login">Sign in</Link>
                  </div>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

const MemoizedHeader = memo(Header);

export default MemoizedHeader;
