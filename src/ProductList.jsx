import Product from './Product';
import './Products.css'

const ProductList = ({products}) => (
  <div className="row-container">
    {
      products.map(product => <Product className="row-item" key={product.title} product={product} />)
    }
  </div>
);

export default ProductList;