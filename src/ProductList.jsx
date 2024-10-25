//ProductList.jsx
import Product from './Product';
import './Products.css';

import { hasTimeConflict } from './utilities/Time';

const ProductList = ({ products, selectedCourses, onCourseClick }) => (
  <div className="row-container">
    {
      products.map((product, index) => {
        //check if this course has a time conflict with selected courses
        const hasConflict = selectedCourses.some(
          selected => selected.term === product.term && hasTimeConflict(selected.meets, product.meets)
        );

        const isSelected = selectedCourses.some(
          selected => selected.courseNumber === product.number && selected.term === product.term
        );

        const isSelectable = !hasConflict || isSelected;

        return (
          <Product
            className={`row-item ${hasConflict ? 'conflict' : ''}`} // Add a class for conflicting items
            key={`${product.term}-${product.number}-${index}`}
            product={product}
            isSelected={isSelected}
            onCourseClick={() => onCourseClick(product.number, product.term, product.title, product.meets)}
            isSelectable={isSelectable} // Pass if it can be selected
          />
        );
      })
    }
  </div>
);

export default ProductList;


