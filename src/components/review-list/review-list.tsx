import {JSX} from 'react';
import {Review} from '../../types/review.ts';
import {ReviewItem} from '../review-item/review-item.tsx';

type ReviewListProps = {
  reviews: Review[];
}

export function ReviewList({reviews} : ReviewListProps) : JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
        />))}
    </ul>
  );
}
