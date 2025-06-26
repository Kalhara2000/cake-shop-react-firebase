import { useEffect } from 'react';
import './About.css';
import founderImage from '../assets/founder.jpg'; // Import your image
import logoImage from '../assets/logoAbout.jpg';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
    document.title = 'The House of Cake | About Us';
  }, []);


  return (
    <div className="about-us-container">
      <h1 className="about-us-title">ABOUT US</h1>

      <div className="about-us-content">
        <div className="about-us-text">
          <p>
            I'm Sewwandi Wijenayaka, a passionate baker and the proud owner and founder of <i>The House of Cake</i>. I hold a degree in Business Studies and Finance from Wayamba University of Sri Lanka. Baking has always been more than just a hobby for me. it’s a true passion that brings me joy and creativity. With love and dedication, I turned that passion into a home-based business, where every cake is handcrafted with care and attention to detail. My goal is to bring happiness to every celebration through beautifully made and delicious treats.          </p>

        </div>
        <div className="about-us-image-container">
          <img
            src={founderImage}
            alt="The Cake Factory team baking"
            className="about-us-image"
          />
        </div>
      </div>

      <div className="about-us-content">
        <div className="about-us-image-container">
          <img
            src={logoImage}
            alt="The Cake Factory team baking"
            className="about-us-image"
          />
        </div>
        <div className="about-us-text">
          <p>
            Founded on September 29, 2021, <i>The House of Cake</i> is a home-based bakery located in Veyangoda, offering delivery services in the Gampaha and Veyangoda areas. We specialize in custom cakes and a variety of baked goods, all made with high-quality ingredients and a personal touch. Whether you're celebrating a birthday, anniversary, or any special moment, we are here to make your day extra sweet. At The House of Cake, every creation is a blend of passion, flavor, and artistic design. because your celebrations deserve the very best.          </p>


        </div>
      </div>



    </div>
  );
};

export default About;