import {JSX, useEffect, useMemo} from 'react';
import {Helmet} from 'react-helmet-async';
import {Navigate, useParams} from 'react-router-dom';
import {AuthorizationStatus} from '../../const.ts';
import {Map} from '../../components/map/map.tsx';
import MemoizedReviewList from '../../components/review-list/review-list.tsx';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchDetailOffer, fetchNearOffers, fetchReviews} from '../../store/api-actions.ts';
import {Loading} from '../../components/loading/loading.tsx';
import MemoizedHeader from '../../components/header/header.tsx';
import {setDetailOffer} from '../../store/detail-offer-data/detail-offer-data.ts';
import {getDetailOffer, getNearOffers, getReviews} from '../../store/detail-offer-data/selectors.ts';
import {getAuthoriztionStatus} from '../../store/user-data/selectors.ts';
import MemoizedReviewForm from '../../components/review-form/review-form.tsx';

export function OfferScreen() : JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setDetailOffer(null));
    dispatch(fetchDetailOffer(id!));
    dispatch(fetchNearOffers(id!));
    dispatch(fetchReviews(id!));
  }, [id]);

  const offer = useAppSelector(getDetailOffer);
  const nearOffers = useAppSelector(getNearOffers);
  const memoizedNearOffers = useMemo(() => nearOffers.slice(0, 3), [nearOffers]);
  const reviews = useAppSelector(getReviews);
  const isAuth = useAppSelector(getAuthoriztionStatus) === AuthorizationStatus.Authorized;

  if (offer === null){
    return (<Loading />);
  }

  if (offer === undefined) {
    return <Navigate to='*' />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: {offer.title}</title>
      </Helmet>
      <MemoizedHeader />

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
                <MemoizedReviewList reviews={reviews} />
                {isAuth && <MemoizedReviewForm/>}
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
              <OffersList offers={memoizedNearOffers} onChange={() => {}} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
