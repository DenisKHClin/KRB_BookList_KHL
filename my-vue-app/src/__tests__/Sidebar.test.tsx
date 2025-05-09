import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

describe('Компонент Sidebar', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    });

    beforeEach(() => {
        // Сбросим localStorage и data-theme
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
        vi.clearAllMocks();
    });

    function renderSidebar() {
        return render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        );
    }

    it('инициализирует тему из localStorage или prefers-color-scheme, выставляет data-theme и записывает в localStorage', () => {
        renderSidebar();

        expect(screen.getByRole('button', { name: /Dark Mode/i })).toBeInTheDocument();

        expect(document.documentElement.getAttribute('data-theme')).toBe('light');

        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('переключает тему при клике на кнопку', () => {
        renderSidebar();

        const btn = screen.getByRole('button');
        expect(btn.textContent).toMatch(/Dark Mode/);

        fireEvent.click(btn);

        expect(btn.textContent).toMatch(/Light Mode/);
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');

        fireEvent.click(btn);
        expect(btn.textContent).toMatch(/Dark Mode/);
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('рендерит основные ссылки', () => {
        renderSidebar();

        const popular = screen.getByRole('link', { name: /Популярное/i });
        expect(popular).toHaveAttribute('href', '/');

        const deferred = screen.getByRole('link', { name: /Отложенные/i });
        expect(deferred).toHaveAttribute('href', '/deferred');

        const addBook = screen.getByRole('link', { name: /Добавить книгу/i });
        expect(addBook).toHaveAttribute('href', '/add-book');
    });

    it('dropdown жанров изначально закрыт и открывается/закрывается по клику', () => {
        renderSidebar();

        const toggle = screen.getByText('Жанры');
        const arrow = screen.getByText('▼');
        expect(arrow).toBeInTheDocument();

        expect(screen.queryByText('Антиутопия')).toBeNull();

        fireEvent.click(toggle);
        expect(screen.getByText('▲')).toBeInTheDocument();

        const genres = ['Антиутопия', 'Классика', 'Детектив', 'Фантастика', 'Романы'];
        for (const genre of genres) {
            const link = screen.getByRole('link', { name: genre });
            expect(link).toHaveAttribute('href', `/genre/${genre}`);
        }

        fireEvent.click(screen.getByRole('link', { name: 'Антиутопия' }));

        expect(screen.queryByText('Антиутопия')).toBeNull();
        expect(screen.getByText('▼')).toBeInTheDocument();
    });
});
