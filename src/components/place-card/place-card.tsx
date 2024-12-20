import {JSX, memo} from 'react';
import {Offer} from '../../types/offer.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {BookmarkButton} from '../bookmark-button/bookmark-button.tsx';

type PlaceCardProps = {
  offer: Offer;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function PlaceCard({offer, onMouseLeave, onMouseEnter}: PlaceCardProps): JSX.Element {
  const {id, isPremium, previewImage, price, rating, title, type, isFavorite} = offer;

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
          <div>
            <BookmarkButton size='small' isFavorite={isFavorite} usagePlace='place-card' offerId={id} />
          </div>
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

const MemoizedPlaceCard = memo(PlaceCard, (prevProps, nextProps) => prevProps.offer.id === nextProps.offer.id && prevProps.offer.isFavorite === nextProps.offer.isFavorite);
export default MemoizedPlaceCard;
