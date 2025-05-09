
import { useParams } from 'react-router-dom';
import Quiz from './Quiz';
import Sidebar from '../components/Sidebar';
import './qiuz.css';
import { useBooks } from '../components/BooksContext';

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const { books } = useBooks();
  const book = books.find((b) => b.id === Number(id));

  if (!book || !book.quiz || book.quiz.length === 0) {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <h2 className="error-message">Тест для этой книги не найден.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="quiz-page">
          <Quiz book={book} />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;