
import { useParams } from 'react-router-dom';
import AddBookForm from '../components/AddBookForm';
import Sidebar from '../components/Sidebar';
import { useBooks } from '../components/BooksContext';

const EditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = id ? parseInt(id, 10) : undefined;
  const { books } = useBooks();
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

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <AddBookForm book={book} isEditMode={true} />
      </div>
    </div>
  );
};

export default EditBookPage;
