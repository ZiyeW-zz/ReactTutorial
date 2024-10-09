import { useState } from 'react';
import './components.css';

const choices = ['Fall', 'Winter', 'Spring'];

const Chooser = ({ onTermChange }) => {
  const [choice, setChoice] = useState(choices[0]);

  const handleTermClick = (term) => {
    setChoice(term);
    onTermChange(term); // Trigger a callback to inform the parent component
  };

  return (
    <div className="chooserComponent">
        <h1>Select a term:</h1>
      {choices.map((term) => (
        <button className="chooserButtons"
          key={term}
          onClick={() => handleTermClick(term)}
          style={{
            backgroundColor: choice === term ? 'lightblue' : 'white',
          }}
        >
          {term}
        </button>
      ))}
    </div>
  );
};

export default Chooser;
