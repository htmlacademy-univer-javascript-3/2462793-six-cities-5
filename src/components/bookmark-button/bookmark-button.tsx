import {Offer} from '../../types/offer.ts';
import {JSX, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFavoriteStatus} from '../../store/api-actions.ts';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {getAuthorizationStatus} from '../../store/user-data/selectors.ts';

type BookmarkButtonProps = {
  size: 'big' | 'small';
  isFavorite?: boolean;
  usagePlace: 'offer' | 'place-card';
  offerId: Offer['id'];
}

export function BookmarkButton({
  size,
  offerId,
  isFavorite,
  usagePlace,
}: BookmarkButtonProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isFavoriteReactive, setIsFavoriteReactive] = useState<boolean>(
    isFavorite ?? false,
  );
  const isAuth = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Authorized;
  const sizes = {
    small: {
      width: 18,
      height: 19,
    },
    big: {
      width: 31,
      height: 33,
    },
  };
  return (
    <button
      className={`${usagePlace}__bookmark-button ${isFavoriteReactive && isAuth ? `${usagePlace}__bookmark-button--active` : ''} button`}
      type="button"
      onClick={() => {
        if (isAuth) {
          dispatch(changeFavoriteStatus({ offerId: offerId, status: !isFavoriteReactive }));
          setIsFavoriteReactive(!isFavoriteReactive);
        } else {
          navigate(AppRoute.Login);
        }
      }}
    >
      <svg
        className={`${usagePlace}__bookmark-icon`}
        width={sizes[size].width}
        height={sizes[size].height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavoriteReactive && isAuth ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}
