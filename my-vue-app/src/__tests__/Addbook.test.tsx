import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AddBookForm from '../components/AddBookForm';
import { useBooks } from '../components/BooksContext';

// Mock BooksContext
vi.mock('../components/BooksContext', () => ({
  useBooks: vi.fn(),
}));

describe('Компонент AddBookForm', () => {
  const mockAddBook = vi.fn();
  const mockUpdateBook = vi.fn();

  beforeEach(() => {
    vi.mocked(useBooks).mockReturnValue({
      addBook: mockAddBook,
      updateBook: mockUpdateBook,
      books: [],
      deleteBook: vi.fn(),
    });
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  // Оборачиваем компонент в BrowserRouter для поддержки useNavigate
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('позволяет заполнить все поля формы', async () => {
    renderWithRouter(<AddBookForm />);
    const user = userEvent.setup();

    // Заполнение полей
    await user.type(screen.getByLabelText(/Название:/i), 'Тестовая книга');
    await user.type(screen.getByLabelText(/Автор:/i), 'Тестовый автор');
    await user.type(screen.getByLabelText(/Описание:/i), 'Тестовое описание');
    await user.type(screen.getByLabelText(/Ссылка на изображение:/i), 'https://example.com/image.jpg');
    await user.type(screen.getByLabelText(/Ссылка на книгу:/i), 'https://example.com/book');

    // Проверка значений полей
    expect(screen.getByLabelText(/Название:/i)).toHaveValue('Тестовая книга');
    expect(screen.getByLabelText(/Автор:/i)).toHaveValue('Тестовый автор');
    expect(screen.getByLabelText(/Описание:/i)).toHaveValue('Тестовое описание');
    expect(screen.getByLabelText(/Ссылка на изображение:/i)).toHaveValue('https://example.com/image.jpg');
    expect(screen.getByLabelText(/Ссылка на книгу:/i)).toHaveValue('https://example.com/book');
  });

  it('позволяет выбрать жанр из выпадающего списка', async () => {
    renderWithRouter(<AddBookForm />);
    const user = userEvent.setup();

    const select = screen.getByLabelText(/Жанр:/i);
    await user.selectOptions(select, 'Фантастика');

    expect(select).toHaveValue('Фантастика');
  });

  it('добавляет книгу с заполненными полями', async () => {
    renderWithRouter(<AddBookForm />);
    const user = userEvent.setup();

    // Заполнение полей
    await user.type(screen.getByLabelText(/Название:/i), 'Тестовая книга');
    await user.type(screen.getByLabelText(/Автор:/i), 'Тестовый автор');
    await user.selectOptions(screen.getByLabelText(/Жанр:/i), 'Детектив');
    await user.type(screen.getByLabelText(/Описание:/i), 'Тестовое описание');
    await user.type(screen.getByLabelText(/Ссылка на изображение:/i), 'https://example.com/image.jpg');
    await user.type(screen.getByLabelText(/Ссылка на книгу:/i), 'https://example.com/book');

    // Отправка формы
    await user.click(screen.getByRole('button', { name: /Сохранить книгу/i }));

    // Проверка вызова addBook
    expect(mockAddBook).toHaveBeenCalledWith({
      title: 'Тестовая книга',
      author: 'Тестовый автор',
      genre: 'Детектив',
      description: 'Тестовое описание',
      image: 'https://example.com/image.jpg',
      link: 'https://example.com/book',
      quiz: [],
    });

    // Проверка сброса формы
    expect(screen.getByLabelText(/Название:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Автор:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Жанр:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Описание:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Ссылка на изображение:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Ссылка на книгу:/i)).toHaveValue('');

    // Проверка вызова alert
    expect(window.alert).toHaveBeenCalledWith('Книга добавлена!');
  });
});