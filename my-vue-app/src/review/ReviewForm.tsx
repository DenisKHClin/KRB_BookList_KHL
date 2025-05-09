import { useState } from 'react';
import { useReviews } from './ReviewsContext';
import '../csspage/detail.css';

interface ReviewFormProps {
  bookId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId }) => {
  const { addReview, reviews, deleteReview } = useReviews();
  const [rating, setRating] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [review, setReview] = useState<string>('');

  const bookReviews = reviews.filter((r) => r.bookId === bookId);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addReview({
      bookId,
      rating,
      name,
      review,
    });
    setRating(0);
    setName('');
    setReview('');
    alert('Отзыв отправлен!');
  };

  const handleDelete = (reviewId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
      deleteReview(reviewId);
    }
  };

  return (
    <div className="review-form">
      <h3>Оставить отзыв</h3>
      <div className="form-group">
        <label>Оценка:</label>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'filled' : ''}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Ваше имя:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите ваше имя"
        />
      </div>
      <div className="form-group">
        <label>Отзыв:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Напишите ваш отзыв"
        />
      </div>
      <button onClick={handleSubmit} disabled={!rating || !name || !review}>
        Отправить отзыв
      </button>

      {bookReviews.length > 0 && (
        <div className="reviews-list">
          <h3>Отзывы</h3>
          {bookReviews.map((r) => (
            <div key={r.id} className="review-item">
              <p>
                <strong>{r.name}</strong> ({r.rating} ★)
              </p>
              <p>{r.review}</p>
              <p className="review-date">{new Date(r.createdAt).toLocaleDateString()}</p>
              <button
                className="delete-review-button"
                onClick={() => handleDelete(r.id)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewForm;