
export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface QuestionProps {
  index: number;
  question: string;
  options: string[];
  selected: string;
  onChange: (answer: string) => void;
}

export interface QuizProps {
  book: Book;
}

export interface ResultProps {
  score: number;
}

export type Quiz = QuizQuestion[];

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  image: string;
  link: string;
  quiz: Quiz;
}

export interface AddBookFormProps {
  book?: Book;
  isEditMode?: boolean;
}

export interface BookCardProps {
  book: Book;
  onToggleDeferred: (book: Book) => void;
  isDeferred: boolean;
}

export interface BooksContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id'> & { quiz?: Quiz }) => void;
  updateBook: (id: number, book: Partial<Book>) => void;
  deleteBook: (id: number) => void;
}

export interface CarouselProps {
  books: Book[];
}

export interface DeferredContextType {
  deferredBooks: Book[];
  toggleDeferred: (book: Book) => void;
}