//CourseForm.jsx

import { useFormData } from '../utilities/useFormData';
import { useNavigate, useParams } from 'react-router-dom';

import "./CourseForm.css"
// Custom validation for course form
const validateCourseData = (key, val) => {
  switch (key) {
    case 'title':
      return val.length >= 2 ? '' : 'Title must be at least two characters';
    case 'meets':
      return /^[\w\s]+$/.test(val) ? '' : 'Meeting time is invalid';
    default: 
      return '';
  }
};

const InputField = ({name, text, state, change}) => (
  <div className="mb-3 inputfield">
    <label htmlFor={name} className="form-label inputTitle">{text}</label>
    <input
      className="form-control inputType"
      id={name}
      name={name}
      defaultValue={state.values?.[name]}
      onChange={change}
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex cancel">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};


const CourseForm = ({ courses }) => {
  const { courseId } = useParams();  // Get courseId from the URL
  const navigate = useNavigate();
  
  // Convert `courses` to an array and find the course by its ID
  const courseArray = Object.values(courses);
  const course = courseArray.find(c => c.number === courseId) || { title: '', meets: '' };
  
  const [state, change] = useFormData(validateCourseData, course);

  const submit = (evt) => {
    evt.preventDefault();
  };

  return (
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name="title" text="Course Title" state={state} change={change} />
      <InputField name="meets" text="Meeting Time" state={state} change={change} />
      <ButtonBar />
    </form>
  );
};

export default CourseForm;
