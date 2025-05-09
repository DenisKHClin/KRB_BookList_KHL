
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ReviewForm from '../review/ReviewForm';
import '../csspage/detail.css';
import { useDeferred } from '../components/DeferredContext';
import { useBooks } from '../components/BooksContext';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = id ? parseInt(id, 10) : undefined;
  const { books, deleteBook } = useBooks();
  const { deferredBooks, toggleDeferred } = useDeferred();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <h2>Книга не найдена</h2>
        </div>
      </div>
    );
  }

  const isDeferred = deferredBooks.some((b) => b.id === book.id);

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
      deleteBook(book.id);
      if (isDeferred) {
        toggleDeferred(book); // Удаляем из отложенных, если книга там была
      }
      navigate('/'); // Перенаправляем на главную страницу
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="book-details">
          <div className="book-details-header">
            <img src={book.image} alt={book.title} className="book-details-image" />
            <div className="book-details-info">
              <h2>{book.title}</h2>
              <p>Автор: {book.author}</p>
              <p>Жанр: {book.genre}</p>
              <a href={book.link} target="_blank" rel="noopener noreferrer" className="read-button">
                Читать книгу
              </a>
              <button
                className="deferred-button-det"
                onClick={() => toggleDeferred(book)}
              >
                {isDeferred ? 'Убрать из отложенных' : 'Добавить в отложенные'}
              </button>
              {book.quiz && book.quiz.length > 0 && (
                <Link to={`/quiz/${book.id}`} className="quiz-button">
                  Пройти тест
                </Link>
              )}
              <button
                className="delete-button"
                onClick={handleDelete}
              >
                Удалить книгу
              </button>
              <Link to={`/edit-book/${book.id}`} className="edit-button">
                Редактировать книгу
              </Link>
            </div>
          </div>
          <div className="book-description">
            <h3>Описание</h3>
            <p>{book.description || 'Описание отсутствует.'}</p>
          </div>
          <ReviewForm bookId={book.id.toString()} />
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
