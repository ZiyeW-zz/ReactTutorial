import Product from './Product';
import './Products.css'

const ProductList = ({products}) => (
  <div className="product-list">
    {
      products.map(product => <Product className="cards" key={product.title} product={product} />)
    }
  </div>
);

export default ProductList;