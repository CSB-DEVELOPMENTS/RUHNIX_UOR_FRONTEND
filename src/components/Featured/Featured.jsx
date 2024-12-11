import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Featured.scss';

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
          <h1>Scale your proffessional workforce with <i>freelancers</i> </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./media/search.png" alt="search" />
              <input type="search" placeholder='Search for any service...' onChange={(({ target: { value } }) => setSearch(value))} />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
         
        </div>

        <div className="right">
          <img src="./media/hero.jpg" alt="hero" />
        </div>
        
      </div>
    </div>
  )
}

export default Featured