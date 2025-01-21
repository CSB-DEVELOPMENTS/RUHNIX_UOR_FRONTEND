import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Featured.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Featured = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = () => {
    if(search) {
      navigate(`/gigs?search=${search}`);
    }
  }

  return (
    <div className='featured'>
      <div className="container">
        <div className="left">
          <h1>Scale your professional workforce with <i>freelancers</i></h1>
          <div className="search">
            <div className="searchInput">
              <div className="search-icon">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="fa-icon"
                  size="lg"
                />
              </div>
              <input 
                type="search" 
                placeholder='Search for any service...' 
                onChange={(({ target: { value } }) => setSearch(value))} 
              />
            </div>
            <button onClick={handleSearch}>
              <span>Search</span>
              <FontAwesomeIcon 
                icon={faArrowRight} 
                className="arrow-icon fa-icon"
                size="sm"
              />
            </button>
          </div>
        </div>

        <div className="right">
          <img src="./media/hero.jpg" alt="hero" />
        </div>
      </div>
    </div>
  );
}

export default Featured;