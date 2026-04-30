import { NavLink } from 'react-router-dom';
import { Vote, Share2, Code2, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-icon"><Vote size={18} /></div>
            <span className="footer__logo-text">Elect<span className="gradient-text">ED</span></span>
          </div>
          <p className="footer__tagline">Empowering citizens with knowledge about the democratic process, one step at a time.</p>
          <div className="footer__social">
            <a href="#" aria-label="Share" className="footer__social-link"><Share2 size={16} /></a>
            <a href="#" aria-label="Source Code" className="footer__social-link"><Code2 size={16} /></a>
          </div>
        </div>

        <div className="footer__links-group">
          <h3 className="footer__group-title">Explore</h3>
          <NavLink to="/" className="footer__link">Home</NavLink>
          <NavLink to="/timeline" className="footer__link">Election Timeline</NavLink>
          <NavLink to="/eligibility" className="footer__link">Eligibility Checker</NavLink>
          <NavLink to="/learn" className="footer__link">Learn & Quiz</NavLink>
        </div>

        <div className="footer__links-group">
          <h3 className="footer__group-title">Resources</h3>
          <a href="#" className="footer__link">Voter Guide</a>
          <a href="#" className="footer__link">FAQs</a>
          <a href="#" className="footer__link">Glossary</a>
          <a href="#" className="footer__link">Accessibility</a>
        </div>

        <div className="footer__links-group">
          <h3 className="footer__group-title">About</h3>
          <a href="#" className="footer__link">Our Mission</a>
          <a href="#" className="footer__link">Privacy Policy</a>
          <a href="#" className="footer__link">Terms of Use</a>
          <a href="#" className="footer__link">Contact</a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">© {year} ElectED. Built with <Heart size={12} className="footer__heart" /> for democracy.</p>
          <p className="footer__disclaimer">For educational purposes only. Not affiliated with any government body.</p>
        </div>
      </div>
    </footer>
  );
}
