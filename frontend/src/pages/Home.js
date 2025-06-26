import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CakeItem from '../components/CakeItem';
import './Home.css';

const Home = ({ cakes }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'The House of Cake';
  }, []);

  return (
    <>
      <div className="banner">
        <div className="banner-text">
          {/* Banner text here if needed */}
        </div>
      </div>

      <div className="home_container">
        <h1>Welcome to The House of Cake</h1>
        <p>Discover the finest cakes and desserts crafted with love.</p>
      </div>

      <div className="cake-grid">
        {cakes.slice(0, 8).map((cake) => (
          <Link to={`/cake/${cake.id}`} key={cake.id} className="cake-link">
             <CakeItem
              id={cake.id}
              name={cake.name}
              // imageUrl={cake.imageUrl}
              imageUrl={cake.image} // ✅ this must match prop name in CakeItem for dummy data
              price={cake.price}
            />
          </Link>
        ))}
      </div>

      <div className="shop-button-container">
        <NavLink to="/shop" className="shop-button">
          Shop Now <span className="cart-icon">🛒</span>
        </NavLink>
      </div>

      <div className="powerful-sentence">
        <p><strong>Indulge in every bite — where passion meets perfection in every cake.</strong></p>
      </div>
    </>
  );
};

export default Home;
