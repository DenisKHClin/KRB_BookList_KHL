import { Link } from 'react-router-dom';
import '../csspage/home.css';
import type { BookCardProps } from '../quiz/types';
import { useReviews } from '../review/ReviewsContext';

const BookCard: React.FC<BookCardProps> = ({ book, onToggleDeferred, isDeferred }) => {
  const { getBookRating } = useReviews();
  const { average, count } = getBookRating(book.id.toString());

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`}>
        <img src={book.image} alt={book.title} />
      </Link>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p className="genre">{book.genre}</p>
      <div className="rating">
        <span className="star">★</span>
        <span>
          {average} ({count} {count === 1 ? 'отзыв' : 'отзывов'})
        </span>
      </div>
      <button
        className="deferred-button"
        onClick={() => onToggleDeferred(book)}
      >
        {isDeferred ? 'Убрать из отложенных' : 'Добавить в отложенных'}
      </button>
    </div>
  );
};

export default BookCard;