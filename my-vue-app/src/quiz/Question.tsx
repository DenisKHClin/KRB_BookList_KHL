import React from 'react';
import type { QuestionProps } from '../quiz/types';



const Question: React.FC<QuestionProps> = ({ index, question, options, selected, onChange }) => (
  <div className="question-card">
    <p className="question-text">
      <strong>{question}</strong>
    </p>
    <div className="options-container">
      {options.map((option) => (
        <label key={option} className="option-label">
          <input
            type="radio"
            name={`question-${index}`}
            value={option}
            checked={selected === option}
            onChange={() => onChange(option)}
            className="quiz-option"
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

export default Question;