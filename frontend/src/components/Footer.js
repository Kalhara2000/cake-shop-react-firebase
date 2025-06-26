import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-branding">
          <h2>The House of Cake</h2>
          <p>Delivering sweetness to your doorstep!</p>
        </div>

        <div className="footer-contact">
          <p>
            📧 <a href="mailto:info@thehouseofcake.com">info@thehouseofcake.com</a> |
            📞 <a href="tel:+94704063548">+94 704 063 548</a>
          </p>
          <p>📍 75/1, Magalegoda, Veyangoda, Sri Lanka</p>
        </div>

        <div className="footer-social">
        <a href="https://www.facebook.com/profile.php?id=100075974004026" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
        {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a> */}
        </div>

        <p className="footer-copy">
          &copy; {new Date().getFullYear()} The House of Cake. All rights reserved.<br/>
          <a href="https://kalhara2000.github.io/my_Portfolio/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Dev.- Mr. Thamindu Kalhara</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
