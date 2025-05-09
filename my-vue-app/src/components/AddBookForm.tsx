import { useState, useEffect } from 'react';
import { useBooks } from './BooksContext';
import { useNavigate } from 'react-router-dom';
import '../csspage/addbook.css';
import type { Book, QuizQuestion, AddBookFormProps} from '../quiz/types';



const genres = ['Классика', 'Антиутопия', 'Детектив', 'Фантастика', 'Романы'];

const AddBookForm: React.FC<AddBookFormProps> = ({ book, isEditMode = false }) => {
  const { addBook, updateBook } = useBooks();
  const navigate = useNavigate();
  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [genre, setGenre] = useState(book?.genre || '');
  const [description, setDescription] = useState(book?.description || '');
  const [image, setImage] = useState(book?.image || '');
  const [link, setLink] = useState(book?.link || '');
  const [quiz, setQuiz] = useState<QuizQuestion[]>(book?.quiz || []);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({
    question: '',
    options: ['', '', '', ''],
    answer: '',
  });

  useEffect(() => {
    if (isEditMode && book) {
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setDescription(book.description);
      setImage(book.image);
      setLink(book.link);
      setQuiz(book.quiz);
    }
  }, [isEditMode, book]);

  const handleAddQuestion = () => {
    setQuiz((prev) => [...prev, currentQuestion]);
    setCurrentQuestion({ question: '', options: ['', '', '', ''], answer: '' });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuiz((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookData: Omit<Book, 'id'> = {
      title,
      author,
      genre,
      description: description || '',
      image: image || '',
      link: link || '',
      quiz,
    };

    if (isEditMode && book) {
      updateBook(book.id, bookData);
      alert('Книга обновлена!');
      navigate(`/book/${book.id}`);
    } else {
      addBook(bookData);
      alert('Книга добавлена!');
      setTitle('');
      setAuthor('');
      setGenre('');
      setDescription('');
      setImage('');
      setLink('');
      setQuiz([]);
      navigate('/');
    }
  };

  return (
    <div className="add-book-form">
      <h2>{isEditMode ? 'Редактировать книгу' : 'Добавить книгу'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Название:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Автор:</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Жанр:</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="" disabled>
              Выберите жанр
            </option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Ссылка на изображение:</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Ссылка на книгу:</label>
          <input
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <h3>Добавить тест (опционально)</h3>
        <div className="form-group">
          <label htmlFor="question">Вопрос:</label>
          <input
            id="question"
            type="text"
            value={currentQuestion.question}
            onChange={(e) =>
              setCurrentQuestion({ ...currentQuestion, question: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Варианты ответа:</label>
          {currentQuestion.options.map((option, index) => (
            <input
              key={index}
              id={`option-${index + 1}`}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...currentQuestion.options];
                newOptions[index] = e.target.value;
                setCurrentQuestion({ ...currentQuestion, options: newOptions });
              }}
              placeholder={`Вариант ${index + 1}`}
            />
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="answer">Правильный ответ:</label>
          <input
            id="answer"
            type="text"
            value={currentQuestion.answer}
            onChange={(e) =>
              setCurrentQuestion({ ...currentQuestion, answer: e.target.value })
            }
          />
        </div>
        <div className="form-buttons">
          <button
            type="button"
            onClick={handleAddQuestion}
            disabled={!currentQuestion.question || !currentQuestion.answer}
          >
            Добавить вопрос
          </button>
          <button type="submit" className="submit-button">
            {isEditMode ? 'Сохранить изменения' : 'Сохранить книгу'}
          </button>
        </div>
      </form>
      {quiz.length > 0 && (
        <div className="quiz-preview">
          <h3>Добавленные вопросы:</h3>
          {quiz.map((q, index) => (
            <div key={index} className="quiz-question">
              <p>Вопрос {index + 1}: {q.question}</p>
              <p>Варианты: {q.options.join(', ')}</p>
              <p>Правильный ответ: {q.answer}</p>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="remove-question-button"
              >
                Удалить вопрос
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddBookForm;