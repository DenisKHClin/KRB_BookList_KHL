/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface Review {
  id: string; // Уникальный идентификатор отзыва
  bookId: string; // ID книги
  rating: number; // Оценка (1-5)
  name: string; // Имя автора отзыва
  review: string; // Текст отзыва
  createdAt: string; // Дата создания
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  deleteReview: (reviewId: string) => void;
  getBookRating: (bookId: string) => { average: number; count: number };
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: crypto.randomUUID(), // Генерируем уникальный ID
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [...prev, newReview]);
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  const getBookRating = (bookId: string) => {
    const bookReviews = reviews.filter((r) => r.bookId === bookId);
    const count = bookReviews.length;
    const average =
      count > 0
        ? Number(
            (bookReviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1)
          )
        : 0;
    return { average, count };
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, deleteReview, getBookRating }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};