import {JSX, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {Map} from '../../components/map/map.tsx';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {useAppSelector} from '../../hooks';
import {Sorting} from '../../components/sorting/sorting.tsx';
import {SortOption} from '../../types/sort-option.ts';
import {store} from '../../store';
import {logout} from '../../store/api-actions.ts';


export function MainScreen(): JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
  const offers = useAppSelector((state) => state.offers).filter(
    (offer) => offer.city.name === activeCity.name,
  );
  const favoritesCount = offers.filter((offer) => offer.isFavorite).length;
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const selectedOffer = offers.find((offer) => offer.id === activeOfferId);
  const placesFoundCaption = offers.length === 0
    ? 'No places to stay available'
    : `${offers.length} places to stay in ${activeCity.name}`;
  const [sortingOption, setSortingOption] = useState<SortOption>('Popular');
  const sortedOffers = [...offers].sort((a, b) => {
    switch (sortingOption) {
      case 'Price: low to high':
        return a.price - b.price;
      case 'Price: high to low':
        return b.price - a.price;
      case 'Top rated first':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  const handleSortChange = (option: SortOption) => {
    setSortingOption(option);
  };

  const isAuth = useAppSelector((state) => state.authorizationStatus) === AuthorizationStatus.Authorized;

  const logoutHandle = () => {
    store.dispatch(logout());
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 sities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            {isAuth ? (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" onClick={logoutHandle}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            ) : (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Login}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList activeCity={activeCity.name}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesFoundCaption}</b>
              <Sorting onSortChange={handleSortChange}/>
              <OffersList offers={sortedOffers} onChange={setActiveOfferId}/>
            </section>
            <div className="cities__right-section">
              <Map
                city={activeCity}
                offers={offers}
                selectedOffer={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
