// TermPage
import { useState } from 'react';
import Chooser from './Chooser'; // Import your TermSelector component
import CourseList from './CourseList'; // Assume you have a CourseList component

const TermPage = () => {
  const [selectedTerm, setSelectedTerm] = useState('Fall'); // Default to Fall

  const handleTermChange = (newTerm) => {
    setSelectedTerm(newTerm); // Update the selected term when user clicks a button
  };

  return (
    <div>
      <h1>Course Term Filter</h1>
      <TermSelector onTermChange={handleTermChange} /> {/* Pass down the handler */}
      <CourseList term={selectedTerm} /> {/* Filtered course list */}
    </div>
  );
};

export default TermPage;
