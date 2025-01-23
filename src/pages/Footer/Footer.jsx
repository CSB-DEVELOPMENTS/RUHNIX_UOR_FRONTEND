import { useEffect } from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faXTwitter,
  faFacebookF, 
  faLinkedinIn, 
  faYoutube,
  faGithub,
  faTiktok,
  faDiscord
} from '@fortawesome/free-brands-svg-icons';
import { 
  faGlobe, 
  faDollarSign, 
  faUniversalAccess 
} from '@fortawesome/free-solid-svg-icons';

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
            <h2>RUHNIX</h2>
            <span>© CSB DEVELOPMENTS (PVT) LTD. {new Date().getFullYear()}</span>
            
            {/* CSB Developments Social Links */}
            <div className="csb-social">
              <h3>&nbsp;FOLLOW CSB DEVELOPMENTS (PVT) LTD.</h3>
              <div className="social-icons">
                <a href="https://csbodima.lk/csbd-projects/ruhnix_info/index.html" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGlobe} className="icon" />
                </a>
                <a href="https://x.com/CSB_DEV" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faXTwitter} className="icon" />
                </a>
                <a href="https://www.facebook.com/csb.developments" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebookF} className="icon" />
                </a>
                <a href="https://www.youtube.com/@CSB.DEVELOPMENTS" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faYoutube} className="icon" />
                </a>
                <a href="https://tiktok.com/@csb.developments" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTiktok} className="icon" />
                </a>
                <a href="https://github.com/CSB-DEVELOPMENTS" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} className="icon" />
                </a>
                <a href="https://linkedin.com/company/csb_developments" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedinIn} className="icon" />
                </a>
              </div>
            </div>
          </div>
          <div className="right">
            {/* RUHNIX Social Links */}
            <div className="social">
              <a href="https://facebook.com/ruhnix_uor" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} className="icon" />
              </a>
              <a href="https://youtube.com/ruhnix_uor" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} className="icon" />
              </a>
              <a href="https://linkedin.com/company/ruhnix_uor" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} className="icon" />
              </a>
              <a href="https://tiktok.com/@ruhnix_uor" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTiktok} className="icon" />
              </a>
              <a href="https://discord.gg/ruhnix_uor" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faDiscord} className="icon" />
              </a>
            </div>
            <div className="link">
              <FontAwesomeIcon icon={faGlobe} className="icon" />
              <span>English</span>
            </div>
            <div className="link">
              <FontAwesomeIcon icon={faDollarSign} className="icon" />
              <span>USD</span>
            </div>
            <div className="link">
              <FontAwesomeIcon icon={faUniversalAccess} className="icon" />
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer