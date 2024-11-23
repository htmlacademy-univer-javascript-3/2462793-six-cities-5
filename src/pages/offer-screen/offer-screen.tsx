import {JSX, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link, Navigate, useParams} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import ReviewForm from '../../components/review-form/review-form.tsx';
import {Map} from '../../components/map/map.tsx';
import {ReviewList} from '../../components/review-list/review-list.tsx';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import {setDetailOffer} from '../../store/action.ts';
import {fetchDetailOffer, fetchNearOffers, fetchReviews} from '../../store/api-actions.ts';
import {Loading} from '../../components/loading/loading.tsx';

export function OfferScreen() : JSX.Element {
  const {id} = useParams();
  useEffect(() => {
    store.dispatch(setDetailOffer(null));
    store.dispatch(fetchDetailOffer(id!));
    store.dispatch(fetchNearOffers(id!));
    store.dispatch(fetchReviews(id!));
  }, [id]);

  const offer = useAppSelector((state) => state.detailOffer);
  const nearOffers = useAppSelector((state) => state.nearOffers).slice(
    0,
    3,
  );
  const reviews = useAppSelector((state) => state.reviews);
  const favoriteCount = useAppSelector((state) => state.offers).filter((offer) => offer.isFavorite).length;

  if (offer === null){
    return (<Loading />);
  }

  if (offer) {
    return (
      <div className="page">
        <Helmet>
          <title>6 sities: {offer.title}</title>
        </Helmet>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to={AppRoute.Main}>
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <Link to={AppRoute.Main}>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </Link>
                    <Link to={AppRoute.Favorites}>
                      <span className="header__favorite-count">{favoriteCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.map((image, index) => (
                  <div key={image} className="offer__image-wrapper">
                    <img className="offer__image" src={image} alt={`Photo ${index + 1}`}/>
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                <div className="offer__mark">
                  <span>{offer.isPremium}</span>
                </div>
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <button
                    className={`offer__bookmark-button ${offer.isFavorite && 'offer__bookmark-button--active'} button`}
                    type="button"
                  >
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `calc(100% / 5 * ${offer.rating})`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                      Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li key={good} className="offer__inside-item">
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">
                      {offer.host.name}
                    </span>
                    <span className="offer__user-status">
                      {offer.host.isPro && 'Pro'}
                    </span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  <ReviewList reviews={reviews} />
                  <ReviewForm />
                </section>
              </div>
            </div>
            <Map
              city={offer.city}
              offers={nearOffers}
              selectedOffer={undefined}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OffersList offers={nearOffers} onChange={() => {}} />
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  } else {
    return(
      <Navigate to='*' />
    );
  }
}
