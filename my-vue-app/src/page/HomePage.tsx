import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BookCard from '../components/BookCard';
import Carousel from '../components/Carousel';
import '../csspage/home.css';
import { useDeferred } from '../components/DeferredContext';
import { useBooks } from '../components/BooksContext';

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const { deferredBooks, toggleDeferred } = useDeferred();
  const { books } = useBooks(); 

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase())
  );

  const popularBooks = books.slice(0, 4);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск по названию, автору или жанру"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>🔍</button>
        </div>
        <h2 className="section-title">ЧТО ПОЧИТАТЬ?</h2>
        <h3 className="subsection-title">НОВИНКИ</h3>
        <div className="books-container">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onToggleDeferred={toggleDeferred}
              isDeferred={deferredBooks.some((b) => b.id === book.id)}
            />
          ))}
        </div>
        <div className="view-all"></div>
        <h3 className="subsection-title">ПОПУЛЯРНОЕ</h3>
        <Carousel books={popularBooks} />
      </div>
    </div>
  );
};

export default HomePage;