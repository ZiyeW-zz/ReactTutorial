import './Product.css';


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
      {/* {!isSelectable && <span className="conflict-icon">×</span>} Show a conflict icon */}
    </div>
  </div>
);

export default Product;
