import { Link } from 'react-router-dom';
import './CakeItem.css';

const CakeItem = ({ id, name, imageUrl, price }) => {
  return (
    <div className="cake-item">
      <img src={imageUrl} alt={name} className="w-40 h-20 object-cover rounded-t-lg" />
      <div className="p-2 text-center">
        <h3 className="text-lg font-bold text-brown">{name}</h3>
        <p className="text-brown font-semibold mb-2">Rs. {price}/=</p>
        <Link to={`/cake/${id}`} className="shop-button">
          Visit
        </Link>
      </div>
    </div>
  );
};

export default CakeItem;