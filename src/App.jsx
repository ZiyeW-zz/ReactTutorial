import React from 'react';  
import { useState } from 'react';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import ProductList from './ProductList';
import { useJsonQuery } from './utilities/fetch'; // custom hook
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  const [coursesData, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses: {error.message}</div>;

  const courses = coursesData.courses;

  return (
    <div>

      <div className="">
        <ProductList products={Object.values(courses)} />
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
