//Product.jsx
import './Product.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';



const Product = ({ product, isSelected, onCourseClick, isSelectable }) => (
  <div
    className={`card ${isSelected ? 'selected' : ''} ${!isSelectable ? 'unselectable' : ''}`} 
    onClick={isSelectable ? onCourseClick : null} //Prevent clicking
  >
    <div className="card-body">
      <h2 className="header card-title">{product.term} CS {product.number}</h2>
      <p className="title card-text">{product.title}</p>
      <div className="separator"></div>
      <p className="meeting card-text">{product.meets}</p>
      {isSelected && <span className="checkmark">✓</span>}

      <Link to={`/edit-course/${product.number}`} className="btn btn-outline-primary">
        Edit
      </Link>


    </div>
  </div>
);

export default Product;
