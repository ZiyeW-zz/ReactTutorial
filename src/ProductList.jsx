import Product from './Product';
import './Products.css';

const ProductList = ({ products, selectedCourses, onCourseClick }) => (
  <div className="row-container">
    {
      products.map((product, index) => {
        const isSelected = selectedCourses.some(
          selected => selected.courseNumber === product.number && selected.term === product.term
        );

        return (
          <Product
            className="row-item"
            key={`${product.term}-${product.number}-${index}`} // Make the key more unique by including index
            product={product}
            isSelected={isSelected} // Pass if the course is selected
            onCourseClick={() => onCourseClick(product.number, product.term, product.title, product.meets)} // Pass all details
          />
        );
      })
    }
  </div>
);

export default ProductList;

