import {JSX, memo, useCallback} from 'react';
import {Offer} from '../../types/offer.ts';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, FavoriteStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthoriztionStatus} from '../../store/user-data/selectors.ts';
import {updateOffers} from '../../store/offers-data/offers-data.ts';
import {changeFavoriteStatus} from '../../store/api-actions.ts';

type PlaceCardProps = {
  offer: Offer;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function PlaceCard({offer, onMouseLeave, onMouseEnter}: PlaceCardProps): JSX.Element {
  const {id, isPremium, previewImage, price, rating, title, type, isFavorite} = offer;
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getAuthoriztionStatus) === AuthorizationStatus.Authorized;
  const navigate = useNavigate();

  const bookmarkClickHandle = useCallback(() => {
    if (isAuth) {
      const newStatus = isFavorite ? FavoriteStatus.Remove : FavoriteStatus.Add;
      const updatedOffer = { ...offer, isFavorite: !isFavorite };
      dispatch(updateOffers(updatedOffer));
      dispatch(changeFavoriteStatus({ offerId: id, status: newStatus }));
    } else {
      navigate(AppRoute.Login);
    }
  }, [isAuth, isFavorite, offer, dispatch, id]);

  return (
    <article className="cities__card place-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Offer.replace(':id', offer.id)}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              isAuth && isFavorite
                ? 'place-card__bookmark-button--active'
                : ''
            }`}
            type="button"
            onClick={bookmarkClickHandle}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(rating / 5) * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', offer.id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

const MemoizedPlaceCard = memo(PlaceCard, (prevProps, nextProps) => {
  return prevProps.offer.id === nextProps.offer.id && prevProps.offer.isFavorite === nextProps.offer.isFavorite;
});
export default MemoizedPlaceCard;
