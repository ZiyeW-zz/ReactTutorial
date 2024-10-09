import Product from './Product';
import './Products.css';

const ProductList = ({ products, selectedCourses, onCourseClick }) => (
  <div className="row-container">
    {
      products.map(product => {
        const isSelected = selectedCourses.some(selected => selected.courseNumber === product.number && selected.term === product.term);
        
        return (
          <Product
            className="row-item"
            key={`${product.number}-${product.term}`} // use both number and term as key
            product={product}
            isSelected={isSelected}//pass if the course is selected
            onCourseClick={onCourseClick} //pass the click handler
          />
        );
      })
    }
  </div>
);

export default ProductList;
