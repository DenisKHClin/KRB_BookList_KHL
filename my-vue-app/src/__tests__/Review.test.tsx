import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ReviewForm from '../review/ReviewForm';
import { useReviews } from '../review/ReviewsContext';

// Mock ReviewsContext
vi.mock('../review/ReviewsContext', () => ({
  useReviews: vi.fn(),
}));

describe('Компонент ReviewForm', () => {
  it('отправляет отзыв при заполнении формы', async () => {
    const mockAddReview = vi.fn();
    vi.mocked(useReviews).mockReturnValue({
      reviews: [],
      addReview: mockAddReview,
      deleteReview: vi.fn(),
      getBookRating: vi.fn(),
    });
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<ReviewForm bookId="123" />);

    const user = userEvent.setup();

    // Выбор рейтинга (4 звезды)
    const stars = screen.getAllByText('★');
    await user.click(stars[3]); // 0-based index для 4-й звезды

    // Ввод имени
    const nameInput = screen.getByPlaceholderText('Введите ваше имя');
    await user.type(nameInput, 'Test User');

    // Ввод текста отзыва
    const reviewTextarea = screen.getByPlaceholderText('Напишите ваш отзыв');
    await user.type(reviewTextarea, 'This is a test review.');

    // Отправка формы
    const submitButton = screen.getByRole('button', { name: /Отправить отзыв/i });
    await user.click(submitButton);

    // Проверка вызова addReview с правильными данными
    expect(mockAddReview).toHaveBeenCalledWith({
      bookId: '123',
      rating: 4,
      name: 'Test User',
      review: 'This is a test review.',
    });

    // Проверка сброса формы
    expect(nameInput).toHaveValue('');
    expect(reviewTextarea).toHaveValue('');
    stars.forEach(star => expect(star).not.toHaveClass('filled'));

    // Проверка вызова alert
    expect(window.alert).toHaveBeenCalledWith('Отзыв отправлен!');
  });
});