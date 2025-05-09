import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Carousel from '../components/Carousel';
import type { Book } from '../quiz/types';

// Mocking contexts
vi.mock('../components/DeferredContext', () => ({
  useDeferred: vi.fn().mockReturnValue({ deferredBooks: [], toggleDeferred: vi.fn() }),
}));
vi.mock('../review/ReviewsContext', () => ({
  useReviews: vi.fn().mockReturnValue({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getBookRating: (_id: string) => ({ average: 4.2, count: 3 }),
  }),
}));

describe('Компонент Carousel', () => {
  const createMockBook = (id: number, title: string): Book => ({
    id,
    title,
    author: 'Author',
    genre: 'Genre',
    description: '',
    image: 'image.jpg',
    link: `/book/${id}`,
    quiz: [],
  });

  it('рендерит все книги в карусели', () => {
    const mockBooks = [
      createMockBook(1, 'Book 1'),
      createMockBook(2, 'Book 2'),
      createMockBook(3, 'Book 3'),
    ];
    render(
      <MemoryRouter>
        <Carousel books={mockBooks} />
      </MemoryRouter>
    );

    mockBooks.forEach(book => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  it('изначально показывает первую книгу', () => {
    const mockBooks = [
      createMockBook(1, 'Book 1'),
      createMockBook(2, 'Book 2'),
    ];
    const { container } = render(
      <MemoryRouter>
        <Carousel books={mockBooks} />
      </MemoryRouter>
    );
    const track = container.querySelector('.carousel-track');
    expect(track).toHaveStyle('transform: translateX(0%)');
  });

  it('переходит к следующему слайду', () => {
    const mockBooks = [
      createMockBook(1, 'Book 1'),
      createMockBook(2, 'Book 2'),
    ];
    const { container } = render(
      <MemoryRouter>
        <Carousel books={mockBooks} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('→'));
    const track = container.querySelector('.carousel-track');
    expect(track).toHaveStyle('transform: translateX(-100%)');
  });

  it('переходит к предыдущему слайду', () => {
    const mockBooks = [
      createMockBook(1, 'Book 1'),
      createMockBook(2, 'Book 2'),
    ];
    const { container } = render(
      <MemoryRouter>
        <Carousel books={mockBooks} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('→'));
    fireEvent.click(screen.getByText('←'));
    const track = container.querySelector('.carousel-track');
    expect(track).toHaveStyle('transform: translateX(0%)');
  });
});