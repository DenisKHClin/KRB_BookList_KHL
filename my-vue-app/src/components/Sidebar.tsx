import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../csspage/home.css';

const Sidebar: React.FC = () => {
  const [isGenreOpen, setIsGenreOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const genres: string[] = ['Антиутопия', 'Классика', 'Детектив', 'Фантастика', 'Романы'];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleGenreDropdown = () => {
    setIsGenreOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="sidebar">
      <div className="logo">ClinBooks</div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <span>👍</span>
              <span>Популярное</span>
            </Link>
          </li>
          <li>
            <Link to="/deferred">
              <span>🔖</span>
              <span>Отложенные</span>
            </Link>
          </li>
          <li>
            <Link to="/add-book">
              <span>➕</span>
              <span>Добавить книгу</span>
            </Link>
          </li>
          <li>
            <div className="genre-toggle" onClick={toggleGenreDropdown}>
              <span>📚</span>
              <span>Жанры</span>
              <span className="dropdown-arrow">{isGenreOpen ? '▲' : '▼'}</span>
            </div>
            {isGenreOpen && (
              <div className="genre-dropdown">
                <ul className="genre-list">
                  {genres.map((genre) => (
                    <li key={genre}>
                      <Link to={`/genre/${genre}`} onClick={() => setIsGenreOpen(false)}>
                        {genre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;