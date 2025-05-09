
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import BookDetailsPage from './page/BookDetailsPage';
import DeferredPage from './page/DeferredPage';
import GenrePage from './page/GenrePage';
import AddBookPage from './page/AddBookPage';
import EditBookPage from './page/EditBookPage';
import QuizPage from './quiz/QuizPage';
import { DeferredProvider } from './components/DeferredContext';
import { BooksProvider } from './components/BooksContext';
import { ReviewsProvider } from './review/ReviewsContext';

const App: React.FC = () => {
  return (
    <BooksProvider>
      <DeferredProvider>
        <ReviewsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book/:id" element={<BookDetailsPage />} />
              <Route path="/deferred" element={<DeferredPage />} />
              <Route path="/genre/:genre" element={<GenrePage />} />
              <Route path="/add-book" element={<AddBookPage />} />
              <Route path="/edit-book/:id" element={<EditBookPage />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
            </Routes>
          </Router>
        </ReviewsProvider>
      </DeferredProvider>
    </BooksProvider>
  );
};

export default App;
