/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Book, Quiz, BooksContextType } from '../quiz/types';

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (book: Omit<Book, 'id'> & { quiz?: Quiz }) => {
    const newBook: Book = {
      ...book,
      id: books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1,
      quiz: book.quiz || [],
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = (id: number, updatedBook: Partial<Book>) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
    );
  };

  const deleteBook = (id: number) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <BooksContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};