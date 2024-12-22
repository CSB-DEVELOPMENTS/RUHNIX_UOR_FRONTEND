import { useEffect } from 'react';
import './Footer.scss';

const Footer = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='footer'>
      <div className="container">
        <div className="top">
          <div className="item">
            <h1>Categories</h1>
            <a href="#"><span>Graphic & Design</span></a>
            <a href=""><span>Digital Marketing</span></a>
            <a href=""><span>Writing & Translation</span></a>
            <a href=""><span>Video & Animation</span></a>
            <a href=""><span>Music & Audio</span></a>
            <a href=""><span>Programming & Tech</span></a>
            <a href=""><span>Data</span></a>
            <a href=""><span>Business</span></a>
            <a href=""><span>Lifestyle</span></a>
            <a href=""><span>Photography</span></a>
            <a href=""><span>Sitemap</span></a>
          </div>
          <div className="item">
            <h1>About</h1>
            <a href=""><span>Careers</span></a>
            <a href=""><span>Press & News</span></a>
            <a href=""><span>Partnership</span></a>
            <a href=""><span>Privacy Policy</span></a>
            <a href=""><span>Terms of Service</span></a>
            <a href=""><span>Intellectual Property Claims</span></a>
            <a href=""><span>Investor Relations</span></a>
          </div>
          <div className="item">
            <h1>Support</h1>
            <a href=""><span>Help & Support</span></a>
            <a href=""><span>Trust & Safety</span></a>
            <a href=""><span>Selling on Ruhnix</span></a>
            <a href=""><span>Buying on Ruhnix</span></a>
          </div>
          <div className="item">
            <h1>Community</h1>
            <a href=""><span>Events</span></a>
            <a href=""><span>Blog</span></a>
            <a href=""><span>Forum</span></a>
            <a href=""><span>Community Standards</span></a>
            <a href=""><span>Podcast</span></a>
            <a href=""><span>Affiliats</span></a>
            <a href=""><span>Invite a Friend</span></a>
          </div>
          <div className="item">
            <h1>More From Ruhnix</h1>
            <a href=""><span>Ruhnix Business</span></a>
            <a href=""><span>Ruhnix Pro</span></a>
            <a href=""><span>Ruhnix Studios</span></a>
            <a href=""><span>Ruhnix Logo Maker</span></a>
            <a href=""><span>Ruhnix Guild</span></a>
            <a href=""><span>Get Inspired</span></a>
            <a href=""><span>Ruhnix Select</span></a>
            <a href=""><span>Clear Voice</span></a>
            <a href=""><span>Workspace</span></a>
            <a href=""><span>Learn</span></a>
            <a href=""><span>Working Not Working</span></a>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Ruhnix</h2>
            <span>© Ruhnix International Ltd. {new Date().getFullYear()}</span>
          </div>
          <div className="right">
            <div className="social">
              <a href=""><img src="./media/twitter.png" alt="" /></a>
              <img src="./media/facebook.png" alt="" />
              <img src="./media/linkedin.png" alt="" />
              <img src="./media/pinterest.png" alt="" />
              <img src="./media/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="./media/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="./media/coin.png" alt="" />
              <span>USD</span>
            </div>
            <div className="link">
              <img src="./media/accessibility.png" alt="" />
              <span>USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer