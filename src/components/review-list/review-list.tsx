import {JSX, memo} from 'react';
import {Review} from '../../types/review.ts';
import MemoizedReviewItem from '../review-item/review-item.tsx';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewList({reviews} : ReviewListProps) : JSX.Element {
  const sortedReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <MemoizedReviewItem
          key={review.id}
          review={review}
        />))}
    </ul>
  );
}

const MemoizedReviewList = memo(ReviewList, (prevProps, nextProps) => prevProps.reviews === nextProps.reviews);
export default MemoizedReviewList;
