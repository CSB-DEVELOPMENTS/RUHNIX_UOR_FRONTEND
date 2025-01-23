import Slider from "react-slick";
import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faChevronLeft,
  faGlobe,
  faCaretDown,
  faMessage,
  faGear,
  faCreditCard,
  faQuestionCircle,
  faUsers,
  faClock,
  faCoins,
  faRightFromBracket,
  faCircleChevronLeft,
  faCircleChevronRight,
  faAngleLeft,
  faAngleRight,
  faUser,
  faListCheck,
  faUserPlus,
  faBriefcase,
  faPlus,
  faStore,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons';
import { axiosFetch } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms";
import { Loader } from "..";
import "./Navbar.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef(null); // Create a ref for the panel

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosFetch.get('/auth/me');
        console.log(data);
        setUser(data.user);       
      }
      catch({ response }) {
        console.log(response.data.message);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Function to detect clicks outside the panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowPanel(false); // Close the panel if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keep the scroll detection for menu, but remove color change
  const isActive = () => {
    window.scrollY > 0 ? setShowMenu(true) : setShowMenu(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const menuLinks = [
    { path: "/gigs?category=design", name: "Graphics & Design" },
    { path: "/gigs?category=video", name: "Video & Animation" },
    { path: "/gigs?category=books", name: "Writing & Translation" },
    { path: "/gigs?category=ai", name: "AI Services" },
    { path: "/gigs?category=social", name: "Digital Marketing" },
    { path: "/gigs?category=voice", name: "Music & Audio" },
    { path: "/gigs?category=wordpress", name: "Programming & Tech" },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    prevArrow: (
      <button className="slick-prev">
        <div className="custom-arrow">
          <FontAwesomeIcon icon={faAngleLeft} className="fa-icon" />
        </div>
      </button>
    ),
    nextArrow: (
      <button className="slick-next">
        <div className="custom-arrow">
          <FontAwesomeIcon icon={faAngleRight} className="fa-icon" />
        </div>
      </button>
    ),
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const handleLogout = async () => {
    try {
      await axiosFetch.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch ({ response }) {
      console.log(response.data);
    }
  };

  return (
    <nav className="navbar active">
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <img src="./media/Horizontal_Logo_Dark.png" alt="logo" className="logoImage"/>
          </Link>
        </div>

        <div className="links">
          <div className="menu-links">
            <span>Ruhnix Pro</span>
            <span>Explore</span>
            <span>
              English
              <FontAwesomeIcon icon={faGlobe} className="fa-icon globe-icon" size="sm" />
            </span>
            {!user?.isSeller && (
              <Link to="/StartSelling" className="link">
                <span>Become a Seller</span>
              </Link>
            )}
          </div>
          {isLoading ? (
            <Loader size={35} />
          ) : (
            <>
              {!user && (
                <span>
                  <Link to="/login" className="link">
                    Sign in
                  </Link>
                </span>
              )}
              {!user && (
                <button
                  className={showMenu || pathname !== "/" ? "join-active" : ""}
                >
                  <Link to="/register" className="link">
                    Join
                  </Link>
                </button>
              )}
              {user && (
                <div
                  className="user"
                  onClick={() => setShowPanel(!showPanel)}
                  ref={panelRef} // Attach the ref to the panel container
                >
                  <img src={user.image || "/media/noavatar.png"} />
                  <span>{user?.username}</span>
                  {showPanel && (
                    <div className="options">
                      {/* User Section */}
                      <div className="menu-section">
                        <Link className="link" to="/profile">
                          <FontAwesomeIcon icon={faUser} className="fa-icon menu-icon" />
                          Profile
                        </Link>
                        <Link className="link" to="/messages">
                          <FontAwesomeIcon icon={faMessage} className="fa-icon menu-icon" />
                          Messages
                        </Link>
                        <Link className="link" to="/orders">
                          <FontAwesomeIcon icon={faListCheck} className="fa-icon menu-icon" />
                          Orders
                        </Link>
                      </div>

                      <hr />

                      {/* Business Section */}
                      <div className="menu-section">
                        <Link className="link" to="/refer-a-friend">
                          <FontAwesomeIcon icon={faUserPlus} className="fa-icon menu-icon" />
                          Refer a Friend
                        </Link>
                        {user?.isSeller ? (
                          <>
                            <Link className="link" to="/my-gigs">
                              <FontAwesomeIcon icon={faBriefcase} className="fa-icon menu-icon" />
                              My Gigs
                            </Link>
                            <Link className="link" to="/organize">
                              <FontAwesomeIcon icon={faPlus} className="fa-icon menu-icon" />
                              Add New Gig
                            </Link>
                          </>
                        ) : (
                          <Link className="link" to="/become-a-seller">
                            <FontAwesomeIcon icon={faStore} className="fa-icon menu-icon" />
                            Become a Seller
                          </Link>
                        )}
                      </div>

                      <hr />

                      {/* Settings Section */}
                      <div className="menu-section">
                        <Link className="link" to="/settings">
                          <FontAwesomeIcon icon={faGear} className="fa-icon menu-icon" />
                          Settings
                        </Link>
                        <Link className="link" to="/billing">
                          <FontAwesomeIcon icon={faCreditCard} className="fa-icon menu-icon" />
                          Billing and Payments
                        </Link>
                        <Link className="link" to="/help">
                          <FontAwesomeIcon icon={faQuestionCircle} className="fa-icon menu-icon" />
                          Help & Support
                        </Link>
                      </div>

                      <hr />

                      {/* Premium Features Section */}
                      <div className="menu-section premium-features">
                        <h4 className="section-title">Premium Features</h4>
                        <Link className="link" to="/invite-team">
                          <FontAwesomeIcon icon={faUsers} className="fa-icon menu-icon" />
                          Invite your team
                        </Link>
                        <Link className="link" to="/hire-hourly">
                          <FontAwesomeIcon icon={faClock} className="fa-icon menu-icon" />
                          Hire on an hourly basis
                        </Link>
                        <Link className="link" to="/fiverr-credits">
                          <FontAwesomeIcon icon={faCoins} className="fa-icon menu-icon" />
                          Earn Ruhnix credits
                        </Link>
                      </div>

                      <hr />

                      {/* Logout Section */}
                      <div className="menu-section">
                        <Link className="link logout" to="/" onClick={handleLogout}>
                          <FontAwesomeIcon icon={faRightFromBracket} className="fa-icon menu-icon" />
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <hr className={showMenu || pathname !== "/" ? "show" : ""} />
      <div className={`menu ${showMenu || pathname !== "/" ? "show" : ""}`}>
        <Slider {...settings}>
          {menuLinks.map(({ path, name }) => (
            <div key={name} className="menu-item">
              <Link className="link" to={path}>
                {name}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </nav>
  );
};

export default Navbar;
