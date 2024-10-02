// CourseList.jsx
import React from 'react';

const CourseList = ({ courses }) => {
  return (
    <div>
      {Object.keys(courses).map((courseKey) => {
        // const course = courses[courseKey];  // Get each course object from the key
        // return (
        //   <li key={courseKey}>
        //     <p>{course.title} ({course.term} {course.number})</p>
        //     <p>{course.meets}</p>
        //   </li>
        // );
        const course = courses[courseKey];
        return (
          <p> 
            {course.term} {course.number}: {course.title}, {course.meets} 
          </p>
        )
      })}
    </div>
  );
};

export default CourseList;

{/* <div>
{Object.keys(courses).map((courseKey) => {
  const course = courses[courseKey];  // Get each course object from the key
  return (
    <li key={courseKey}>
      <p>{course.title} ({course.term} {course.number})</p>
      <p>{course.meets}</p>
    </li>
  );
})}
</div> */}
