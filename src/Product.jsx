import './Product.css';

const Product = ({ product, isSelected, onCourseClick }) => (
  <div
    className={`card ${isSelected ? 'selected' : ''}`} 
    onClick={() => onCourseClick(product.number, product.term)}
  >
    <div className="card-body">
      <h2 className="header card-title">{product.term} CS {product.number}</h2>
      <p className="title card-text">{product.title}</p>
      <div className="separator"></div>
      <p className="meeting card-text">{product.meets}</p>
      {isSelected && <span className="checkmark">✓</span>}  {/* Show checkmark if selected */}
    </div>
  </div>
);

export default Product;
