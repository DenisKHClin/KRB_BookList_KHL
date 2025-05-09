import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, beforeEach, vi} from 'vitest';
import BookCard from '../components/BookCard.tsx';
import type {Book} from "../quiz/types.ts";
import {ReviewsProvider} from "../review/ReviewsContext.tsx";
import {MemoryRouter} from "react-router-dom";

vi.mock('../review/ReviewsContext.tsx', () => ({
    ReviewsProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useReviews: () => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getBookRating: (_id: string) => ({ average: 4.2, count: 3 }),
    }),
}));

describe('Компонент BookCard', () => {
    let mockBook: Book;
    let mockOnToggleDeferred: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockBook = {
            id: 42,
            title: 'Тестовая книга',
            author: 'Автор Теста',
            genre: 'Жанр Теста',
            description: 'Описание',
            image: 'https://example.com/test.jpg',
            link: '/book/42',
            quiz: [],
        };
        mockOnToggleDeferred = vi.fn();
    });

    function renderCard(isDeferred = false) {
        return render(
            <MemoryRouter>
                <ReviewsProvider>
                    <BookCard
                        book={mockBook}
                        isDeferred={isDeferred}
                        onToggleDeferred={mockOnToggleDeferred}
                    />
                </ReviewsProvider>
            </MemoryRouter>
        );
    }

    it('рендерит ссылку на страницу книги с картинкой', () => {
        renderCard();

        const img = screen.getByRole('img', { name: /Тестовая книга/i });
        expect(img).toHaveAttribute('src', mockBook.image);

        const link = img.closest('a');
        expect(link).toHaveAttribute('href', `/book/${mockBook.id}`);
    });

    it('показывает заголовок, автора, жанр', () => {
        renderCard();

        expect(screen.getByText(mockBook.title)).toBeInTheDocument();
        expect(screen.getByText(mockBook.author)).toBeInTheDocument();
        expect(screen.getByText(mockBook.genre)).toHaveClass('genre');
    });

    it('отображает рейтинг и количество отзывов из контекста', () => {
        renderCard();

        // мокаем средний = 4.2, count = 3
        expect(screen.getByText(/4.2/)).toBeInTheDocument();
        expect(screen.getByText(/\(3 отзывов\)/i)).toBeInTheDocument();
    });

    it('показывает кнопку «Добавить в отложенные» и реагирует на клик', () => {
        renderCard(false);

        const btn = screen.getByRole('button', { name: /Добавить в отложенных/i });
        expect(btn).toBeInTheDocument();

        fireEvent.click(btn);
        expect(mockOnToggleDeferred).toHaveBeenCalledTimes(1);
        expect(mockOnToggleDeferred).toHaveBeenCalledWith(mockBook);
    });

    it('показывает кнопку «Убрать из отложенных», когда isDeferred=true', () => {
        renderCard(true);

        const btn = screen.getByRole('button', { name: /Убрать из отложенных/i });
        expect(btn).toBeInTheDocument();
    });
});
