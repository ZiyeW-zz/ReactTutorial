import React from 'react';  
import { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import { useJsonQuery } from './utilities/fetch'; // custom hook
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//task 7
import Chooser from './components/Chooser';
import Modal from './components/Modal';
import SelectedCourseList from './components/SelectedCourseList';
// task 6
const queryClient = new QueryClient();

//task10
import { hasTimeConflict } from './utilities/Time';

//task 11
import CourseForm from './pages/CourseForm';



const App = () => {
  const [coursesData, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  const [selectedTerm, setSelectedTerm] = useState('Fall'); // Default to 'Fall'

  //task 8
  const [selectedCourses, setSelectedCourses] = useState([]);
  //task 9
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses: {error.message}</div>;

  // task 7
  const filteredCourses = Object.values(coursesData.courses).filter(course => course.term === selectedTerm);


  const toggleCourseSelection = (courseNumber, term, title, meets) => {
    const courseKey = { courseNumber, term, title, meets };
    
    setSelectedCourses((prevSelected) => {
      const isSelected = prevSelected.some(
        (selected) =>
          selected.courseNumber === courseNumber && selected.term === term && selected.title === title && selected.meets === meets
      );

      //if course already selected, allow unselecting it
      if (isSelected) {
        return prevSelected.filter(
          (selected) =>
            !(selected.courseNumber === courseNumber && selected.term === term && selected.title === title && selected.meets === meets)
        );
      }

      //If the course is not selected, check if it can be selected (no conflicts)
      const canSelect = !prevSelected.some(selected =>
        selected.term === term && hasTimeConflict(selected.meets, meets)
      );

      // If there's a conflict, do not add the course
      if (!canSelect) {
        // Optionally show an alert or notification about the conflict
        return prevSelected;
      }

      // Add the course if it does not have a conflict
      return [...prevSelected, courseKey];
    });
};

  
  



return (
  <div>
    <div className="headerSection">
      <Chooser className="chooserSection" onTermChange={setSelectedTerm} />
      <div className="selectedSection">
        <button className="btn btn-outline-dark" onClick={openModal}>
          <i className="bi bi-cart4"></i> Course Plan
        </button>
        <Modal open={open} close={closeModal}>
          <SelectedCourseList selected={selectedCourses} />
        </Modal>
      </div>
    </div>

    <Routes>
      <Route path="/" element={
        <ProductList 
          products={filteredCourses} 
          selectedCourses={selectedCourses} 
          onCourseClick={toggleCourseSelection} 
        />
      } />
      <Route path="/edit-course/:courseId" element={<CourseForm courses={coursesData.courses} />} />
    </Routes>
  </div>
);
};

const Root = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default Root;
