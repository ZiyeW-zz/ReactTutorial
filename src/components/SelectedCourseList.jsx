import './components.css';


const SelectedCourseList = ({ selected }) => (
  <div className="selectedCourses">
    {selected.length === 0 ? (
      <h2>No courses selected. Click on a course card to add to your plan.</h2>
    ) : (
      selected.map((course, index) => (
        <p key={index}>
          {course.term} CS{course.courseNumber}: {course.title}, {course.meets}
        </p>
      ))
    )}
  </div>
);

export default SelectedCourseList;
