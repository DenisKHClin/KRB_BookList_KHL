
import BookCard from '../components/BookCard';
import Sidebar from '../components/Sidebar';
import '../csspage/home.css';
import { useDeferred } from '../components/DeferredContext';

const DeferredPage: React.FC = () => {
  const { deferredBooks, toggleDeferred } = useDeferred();

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="deferred-page">
          <h2>Отложенные книги</h2>
          {deferredBooks.length === 0 ? (
            <p>Нет отложенных книг</p>
          ) : (
            <div className="books-container">
              {deferredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onToggleDeferred={toggleDeferred}
                  isDeferred={deferredBooks.some((b) => b.id === book.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeferredPage;