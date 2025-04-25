
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-agri-primary text-white py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BHUMIPUTRA</h3>
            <p className="text-sm">
              Empowering farmers with technology to improve post-harvest management and connect directly with processors.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-agri-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/forecasting" className="text-sm hover:text-agri-accent transition-colors">
                  Forecasting
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm hover:text-agri-accent transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-sm hover:text-agri-accent transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-agri-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-agri-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <address className="not-italic text-sm space-y-2">
              <p>Agricultural Innovation Center</p>
              <p>Kolkata, West Bengal, India</p>
              <p>Email: info@bhumiputra.in</p>
              <p>Phone: +91 90511 36355</p>
            </address>
          </div>
        </div>
        <div className="border-t border-agri-dark mt-8 pt-4">
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} BHUMIPUTRA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
