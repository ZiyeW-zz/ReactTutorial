//Product.jsx
import './Product.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useProfile } from './utilities/profile';


const Product = ({ product, isSelected, onCourseClick, isSelectable }) => {
  const [{ isAdmin }, isLoading, error] = useProfile();  // Properly destructuring useProfile result

  if (isLoading) return null;  // Or some loading indicator
  if (error) return <div>Error loading user information: {error.message}</div>;

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''} ${!isSelectable ? 'unselectable' : ''}`} 
      onClick={isSelectable ? onCourseClick : null} // Prevent clicking if not selectable
    >
      <div className="card-body">
        <h2 className="header card-title">{product.term} CS {product.number}</h2>
        <p className="title card-text">{product.title}</p>
        <div className="separator"></div>
        <p className="meeting card-text">{product.meets}</p>
        {isSelected && <span className="checkmark">✓</span>}

        {isAdmin && (
          <Link to={`/edit-course/${product.term[0]}${product.number}`} className="btn btn-outline-primary">
            Edit
          </Link>
        )}
      </div>
    </div>
  );
};

export default Product;
