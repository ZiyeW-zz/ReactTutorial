import './Product.css';

const Product = ({product}) => (
  <div className="card">
    <div className="card-body">
      <h2 className="header card-title">{product.term} CS {product.number}</h2>
      {/* <p className="card-text">CS {product.number}</p> */}
      <p className="title card-text">{product.title}</p>
      {/* <div className="spacer"></div> */}
      <div className="separator"></div>
      <p className="meeting card-text">{product.meets}</p>
    </div>
  </div>
);

export default Product;
