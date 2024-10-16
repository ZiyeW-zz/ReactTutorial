import React from 'react';  
import { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import { useJsonQuery } from './utilities/fetch'; // custom hook
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//task 7
import Chooser from './components/Chooser';
import Modal from './components/Modal';
import SelectedCourseList from './components/SelectedCourseList';
// task 6
const queryClient = new QueryClient();



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


  // const toggleCourseSelection = (courseNumber, term) => {
  //   const courseKey = {courseNumber, term};
  //   setSelectedCourses(prevSelected => {
  //     const isSelected = prevSelected.some(selected => selected.courseNumber === courseNumber && selected.term == term);

  //     return isSelected
  //       ? prevSelected.filter(selected => !(selected.courseNumber === courseNumber && selected.term == term))
  //       : [...prevSelected, courseKey];
  //   });
  // };
  const toggleCourseSelection = (courseNumber, term, title, meets) => {
    const courseKey = { courseNumber, term, title, meets }; // Include title and meets
    setSelectedCourses((prevSelected) => {
      const isSelected = prevSelected.some(
        (selected) =>
          selected.courseNumber === courseNumber && selected.term === term && selected.title === title && selected.meets === meets
      );
  
      return isSelected
        ? prevSelected.filter(
            (selected) =>
              !(selected.courseNumber === courseNumber && selected.term === term && selected.title === title && selected.meets === meets)
          )
        : [...prevSelected, courseKey];
    });
  };
  
  

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
    setModalClosed(!isModalClosed);
  };

  return (
    <div>
      <div className="headerSection">
        <Chooser className="chooserSection" onTermChange={setSelectedTerm}/>

        <div className="selectedSection">
          {/* <button className="btn btn-outline-dark" onClick={openModal}>
              <i className="bi bi-cart4"></i> Course Plan
            </button> */}
        <button className="btn btn-outline-dark" onClick={openModal}>
            <i className="bi bi-cart4"></i> Course Plan
          </button>
          <Modal open={open} close={closeModal}>
            <SelectedCourseList selected={selectedCourses} />
          </Modal>
        </div>
        
        {/* <button onClick={handleModalToggle}> Open Modal Here </button> */}
      </div>

      <div className="">
       <ProductList 
          products={filteredCourses} 
          selectedCourses={selectedCourses} 
          onCourseClick={toggleCourseSelection} 
        />      
      </div>


    </div>
  );
};

const Root = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

export default Root;
