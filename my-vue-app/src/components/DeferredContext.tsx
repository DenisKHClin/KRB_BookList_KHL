
import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type { Book, DeferredContextType } from '../quiz/types';


const DeferredContext = createContext<DeferredContextType | undefined>(undefined);

export const DeferredProvider = ({ children }: { children: ReactNode }) => {
  // Загружаем отложенные книги из localStorage при инициализации
  const [deferredBooks, setDeferredBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('deferredBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  // Сохраняем отложенные книги в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem('deferredBooks', JSON.stringify(deferredBooks));
  }, [deferredBooks]);

  const toggleDeferred = (book: Book) => {
    setDeferredBooks((prev) => {
      if (prev.some((b) => b.id === book.id)) {
        return prev.filter((b) => b.id !== book.id);
      } else {
        return [...prev, book];
      }
    });
  };

  return (
    <DeferredContext.Provider value={{ deferredBooks, toggleDeferred }}>
      {children}
    </DeferredContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDeferred = () => {
  const context = useContext(DeferredContext);
  if (!context) {
    throw new Error('useDeferred must be used within a DeferredProvider');
  }
  return context;
};