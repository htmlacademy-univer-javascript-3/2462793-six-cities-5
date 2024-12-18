import {JSX} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import MemoizedHeader from '../../components/header/header.tsx';
import {getFavoritesOffers} from '../../store/offers-data/selectors.ts';
import {BookmarkButton} from '../../components/bookmark-button/bookmark-button.tsx';


export function FavoriteScreen() : JSX.Element {
  const favorites = useAppSelector(getFavoritesOffers);
  const cities = Array.from(new Set(favorites.map((offer) => offer.city.name))).sort();

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <MemoizedHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.length > 0 ? (
                cities.map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="#">
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favorites
                        .filter((favorite) => favorite.city.name === city)
                        .map((favorite) => (
                          <article key={favorite.id} className="favorites__card place-card">
                            {favorite.isPremium &&
                              <div className="place-card__mark">
                                <span>Premium</span>
                              </div>}
                            <div className="favorites__image-wrapper place-card__image-wrapper">
                              <Link to={AppRoute.Offer.replace(':id', favorite.id)}>
                                <img className="place-card__image" src={favorite.previewImage} width="150" height="110" alt="Place image"/>
                              </Link>
                            </div>
                            <div className="favorites__card-info place-card__info">
                              <div className="place-card__price-wrapper">
                                <div className="place-card__price">
                                  <b className="place-card__price-value">&euro;{favorite.price}</b>
                                  <span className="place-card__price-text">&#47;&nbsp;night</span>
                                </div>
                                <BookmarkButton size='small' isFavorite={favorite.isFavorite} usagePlace='place-card' offerId={favorite.id} />
                              </div>
                              <div className="place-card__rating rating">
                                <div className="place-card__stars rating__stars">
                                  <span style={{width: `${(favorite.rating / 5) * 100}%`}}></span>
                                  <span className="visually-hidden">Rating</span>
                                </div>
                              </div>
                              <h2 className="place-card__name">
                                <Link to={AppRoute.Offer.replace(':id', favorite.id)}>{favorite.title}</Link>
                              </h2>
                              <p className="place-card__type">
                                {favorite.type}
                              </p>
                            </div>
                          </article>
                        ))}
                    </div>
                  </li>
                ))
              ) : (
                <li style={{textAlign: 'center', marginTop: '15%', fontSize: '32px'}}>Nothing yet saved</li>
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}
