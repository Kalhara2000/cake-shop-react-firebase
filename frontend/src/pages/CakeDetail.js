import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CakeDetail.css';

const CakeDetail = ({ cakes }) => {
  const { id } = useParams();
  const cake = cakes.find((c) => c.id === id);

  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cake) {
      document.title = `The House of Cake | ${cake.name}`;
    } else {
      document.title = 'The House of Cake | Cake Not Found';
    }
  }, [cake]);

  if (!cake) {
    return <div className="cakedetail-container"><p>Cake not found</p></div>;
  }

  const totalPrice = quantity * cake.price;

  const whatsappMessage = `Hello The House of Cake! I would like to order:

Order Details:
🍰 Cake: ${cake.name}
💵 Price per Cake: Rs. ${cake.price}
🔢 Quantity: ${quantity}
🧾 Total: Rs. ${totalPrice}

Customer Details:
👤 Name: ${customerName}
📞 Contact: ${contactNumber}
📍 Address: ${address}
📅 Delivery Date: ${deliveryDate}

📝 Special Instructions: ${specialInstructions || 'None'}`.trim();

  const whatsappLink = `https://wa.me/94704063548?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="cakedetail-container bg-beige min-h-screen">
      <div className="bg-white max-w-2xl mx-auto rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <div className="cake-flex">
          <div className="cake-image">
            {/* <img src={cake.imageUrl} alt={cake.name} className="object-cover rounded-lg" /> */}
            <img src={cake.image} alt={cake.name} className="object-cover rounded-lg" /> {/*✅ this must match prop name in CakeItem for dummy data*/}
          </div>

          <div className="cake-info">
            <h1 className="text-2xl font-bold text-brown mb-2">{cake.name}</h1>
            <p className="cake-description">{cake.description}</p>
            <p className="cake-price">Rs. {cake.price}/=</p>

            <ul className="cake-features">
              <li>🍰 Freshly baked</li>
              <li>🚚 Fast delivery</li>
              <li>⏰ Order 4 days in advance</li>
              <li>🧼 100% hygienic</li>
              <li>❤️ Healthy & safe</li>
            </ul>

            {/* Quantity */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-brown font-medium mb-2">Quantity </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 p-2 border border-brown rounded"
              />
            </div>

            {/* Special Instructions */}
            <div className="special-instructions-section mt-6">
              <label htmlFor="specialInstructions" className="block mb-2 text-brown font-medium">
                Special Instructions (optional)
              </label>
              <textarea
                id="specialInstructions"
                placeholder="Add any special requests or instructions..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full p-2 border border-brown rounded"
              />
            </div>

            {/* Customer Info */}
            <div className="customer-details-section">
              <label className="block mb-2 text-brown font-medium">Your Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="p-2 border border-brown rounded"
              />

              <label className="block mb-2 text-brown font-medium">Contact Number</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="p-2 border border-brown rounded"
              />

              <label className="block mb-2 text-brown font-medium">Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 border border-brown rounded"
              />

              <label className="block mb-2 text-brown font-medium">Delivery Date</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="p-2 border border-brown rounded"
                
              />
            </div>

            {/* Order Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="order-button bg-brown"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeDetail;
