import { useParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import '../csspage/home.css';
import Sidebar from '../components/Sidebar';
import { useDeferred } from '../components/DeferredContext';
import { useBooks } from '../components/BooksContext';

const GenrePage: React.FC = () => {
  const { genre } = useParams<{ genre: string }>();
  const { deferredBooks, toggleDeferred } = useDeferred();
  const { books } = useBooks();
  const genreBooks = books.filter((book) => book.genre === genre);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="genre-page">
          <h2>{genre}</h2>
          <div className="books-container">
            {genreBooks.length > 0 ? (
              genreBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onToggleDeferred={toggleDeferred}
                  isDeferred={deferredBooks.some((b) => b.id === book.id)}
                />
              ))
            ) : (
              <p className="no-books-message">Книги в жанре "{genre}" не найдены</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;