import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CakeItem from '../components/CakeItem';
import './Shop.css';

const Shop = ({ cakes }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'The House of Cake | Shop';
  }, []);

  return (
    <div className="shop-container">
      <h1 className="shop-title">SHOP</h1>
      <div className="cake-grid">
        {cakes.map((cake) => (
          <Link to={`/cake/${cake.id}`} key={cake.id} className="cake-link">
            <CakeItem
              id={cake.id}
              name={cake.name}
              imageUrl={cake.imageUrl}
              price={cake.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
