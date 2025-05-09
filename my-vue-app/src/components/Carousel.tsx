import { useState } from 'react';
import type { CarouselProps } from '../quiz/types';
import BookCard from './BookCard';
import '../csspage/home.css';
import { useDeferred } from './DeferredContext';

const Carousel: React.FC<CarouselProps> = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { deferredBooks, toggleDeferred } = useDeferred();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  const transformValue = currentIndex === 0 ? 'translateX(0%)' : `translateX(-${currentIndex * 100}%)`;

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevSlide}>
        ←
      </button>
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{
            transform: transformValue,
          }}
        >
          {books.map((book) => (
            <div className="carousel-item" key={book.id}>
              <BookCard
                book={book}
                onToggleDeferred={toggleDeferred}
                isDeferred={deferredBooks.some((b) => b.id === book.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button next" onClick={nextSlide}>
        →
      </button>
    </div>
  );
};

export default Carousel;