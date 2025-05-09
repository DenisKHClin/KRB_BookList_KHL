import React from 'react';
import type { ResultProps } from './types';


const Result: React.FC<ResultProps> = ({ score }) => {
  const message = score >= 80 ? 'Отлично!' : score >= 50 ? 'Хороший результат!' : 'Попробуйте ещё раз!';
  return (
    <div className="result">
      <h2>Ваш результат: {score}%</h2>
      <p>{message}</p>
    </div>
  );
};

export default Result;