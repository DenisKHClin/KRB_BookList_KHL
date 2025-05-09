import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from './Question';
import Result from './Result';
import type { QuizProps } from './types';
import './qiuz.css';


const Quiz: React.FC<QuizProps> = ({ book }) => {
  const [answers, setAnswers] = useState<string[]>(Array(book.quiz.length).fill(''));
  const [result, setResult] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    const correct = book.quiz.filter((q, i) => q.answer === answers[i]).length;
    const percent = Math.round((correct / book.quiz.length) * 100);
    setResult(percent);
  };

  const resetTest = () => {
    setAnswers(Array(book.quiz.length).fill(''));
    setResult(null);
  };

  return (
    <div className="quiz-container">
      <h1 className="book-title">Тест по книге: {book.title}</h1>

      <div className="questions-container">
        {book.quiz.map((q, index) => (
          <Question
            key={index}
            index={index}
            question={q.question}
            options={q.options}
            selected={answers[index]}
            onChange={(answer) => handleAnswerChange(index, answer)}
          />
        ))}
      </div>

      <div className="button-group">
        <button onClick={calculateResult} className="button primary-button">
          Завершить тест
        </button>

        {result !== null && <Result score={result} />}

        <button onClick={resetTest} className="button secondary-button">
          Пройти тест снова
        </button>

        <div className="button-group">
          <button onClick={() => navigate(-1)} className="button back-button">
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;