import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Featured.scss";
import { TrustedBy } from "../../components";

const Featured = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search) {
      navigate(`/gigs?search=${search}`);
    }
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="Boy1">
          <img src="./media/Boy1.png" alt="boy1" />
        </div>
        <div className="Girl1">
          <img src="./media/Girl1.png" alt="girl1" />
        </div>
        <div className="center">
          <h1>
            Scale your professional workforce with <span>freelance</span>
          </h1>
          <div className="search">
            <div className="searchInput">
              <input
                type="search"
                placeholder="    Search for any service..."
                onChange={({ target: { value } }) => setSearch(value)}
              />

              <button onClick={handleSearch}>
                <img src="./media/search.png" alt="search" />
              </button>
            </div>
          </div>
          <TrustedBy />
        </div>

        <div className="Girl2">
          <img src="./media/Girl2.png" alt="girl2" />
        </div>
        <div className="Boy2">
          <img src="./media/Boy2.png" alt="boy2" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
