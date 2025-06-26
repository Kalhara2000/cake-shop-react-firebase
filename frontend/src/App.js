import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import CakeDetail from './pages/CakeDetail';
import logo from './assets/logo.png';


//dummy data
// import cake1 from './assets/cake01.jpg';
// import cake2 from './assets/cake02.jpg';
// import cake3 from './assets/cake03.jpg';
// import cake4 from './assets/cake04.jpg';



const API_BASE_URL = 'http://localhost:5000/api/cakes'; // Update if needed

const App = () => {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {


    //Dummy cake data //////////////
    const dummyCakes = [
      { id: '1', name: 'Chocolate Cake', description: 'A rich, moist chocolate cake crafted with premium cocoa and layered with velvety chocolate ganache. Elegantly balanced in sweetness, this indulgent dessert delivers a deep, luxurious flavor in every bite — perfect for those who appreciate refined taste and timeless quality.', price: 6300.00, image: 'https://res.cloudinary.com/dievsyyik/image/upload/v1750776597/cakes/regopc6qb6rkvyjawpev.jpg' },
      { id: '2', name: 'Butter Cream Cake', description: 'A rich, tender butter cake made with premium creamery butter, delivering a moist crumb and a warm, comforting flavor. Baked to golden perfection, this timeless favorite offers understated elegance in every slice — a true celebration of quality and simplicity.', price: 3300.00, image: 'https://res.cloudinary.com/dievsyyik/image/upload/v1750924800/cake2_ndwzrr.png' },
      { id: '3', name: 'Vanilla Cake', description: 'A light and airy vanilla sponge, crafted from the finest Madagascar vanilla beans and enveloped in a smooth, velvety vanilla buttercream. This cake offers a delicate sweetness and a beautifully balanced flavor profile — refined, timeless, and perfect for elegant occasions.', price: 3000.00, image: 'https://res.cloudinary.com/dievsyyik/image/upload/v1750924800/cake3_gn6ad0.png' },
      { id: '4', name: 'Vanilla & Butter Cake', description: 'Experience the perfect harmony of rich creamery butter and fragrant Madagascar vanilla in this elegant cake set. The centerpiece is a moist, golden butter-vanilla cake — delicately sweet, beautifully balanced, and baked to perfection. Accompanied by five artisanal cupcakes, each echoing the same exquisite flavor in a charming individual portion. Ideal for sharing or gifting, this set blends timeless taste with refined presentation.', price: 5200.00, image: 'https://res.cloudinary.com/dievsyyik/image/upload/v1750775110/cakes/vvk8t7q3nuxahwcv8gon.jpg' },
    ];
    //////////////////////////////////



    const fetchCakes = async () => {
      try {
        const res = await axios.get(API_BASE_URL);
        setCakes(res.data);
      } catch (err) {
        console.error('Error fetching cakes:', err);
        setCakes(dummyCakes); //// Dummy cake date show
      }
    };

    fetchCakes();
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar logo={logo} />
      <main>
        <Routes>
          <Route path="/" element={<Home cakes={cakes} />} />
          <Route path="/shop" element={<Shop cakes={cakes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cake/:id" element={<CakeDetail cakes={cakes} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
