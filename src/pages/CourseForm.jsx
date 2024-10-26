//CourseForm.jsx

import { useNavigate, useParams } from 'react-router-dom';
import { useDbUpdate } from '../utilities/firebase';
import { useFormData } from '../utilities/useFormData';
import "./CourseForm.css"


// Custom validation for course form
const validateCourseData = (key, val) => {
  switch (key) {
    case 'title':
      return val.length >= 2 ? '' : 'Title must be at least two characters';
    case 'meets':
      // Allow empty string or format like "MWF 12:00-13:20"
      return val === '' || /^[MTWRF]+ \d{1,2}:\d{2}-\d{1,2}:\d{2}$/.test(val)
        ? ''
        : 'Must contain days and start-end time, e.g., MWF 12:00-13:20';
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
    
  {state.errors?.[name] && <div className="invalid-feedback">{state.errors[name]}</div>}

    {/* <div className="invalid-feedback">{state.errors?.[name]}</div> */}
  </div>
);

const ButtonBar = ({ onSubmit }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex cancel">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="button" className="btn btn-primary" onClick={onSubmit}>Submit</button>

    </div>
  );
};


const CourseForm = ({ courses }) => {

  const { courseId } = useParams();  // Get courseId from the URL
  const navigate = useNavigate();
  const [updateData] = useDbUpdate(`/courses/${courseId}`);

  

  
  // Convert `courses` to an array and find the course by its ID
  const courseArray = Object.values(courses || {});
  const course = courseArray.find(c => `${c.term[0]}${c.number}` === courseId) || { title: '', meets: '' };
  

  const [state, change] = useFormData(validateCourseData, course);

  const hasChanges = () => {
    return Object.keys(state.values).some(key => state.values[key] !== course[key]);
  };

  const submit = async (evt) => {
    evt.preventDefault();
    // Ensure no errors and check for changes
    const hasErrors = Object.values(state.errors).some(error => error);
    if (!hasErrors && hasChanges()) {
      try {
        await updateData(state.values);
        navigate(-1); // Redirect back after successful update
      } catch (error) {
        console.error("Error updating course data:", error);
      }
    } else {
      console.log("No changes or there are form errors");
    }
  };
  

  return (
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name="title" text="Course Title" state={state} change={change} />
      <InputField name="meets" text="Meeting Time" state={state} change={change} />
      <ButtonBar onSubmit={submit} />
    </form>
  );
};

export default CourseForm;
