import { useState, useRef, useEffect } from "react";
import { GigCard, Loader } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { axiosFetch } from "../../utils";
import "./Gigs.scss";

const Gigs = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [sortBy, setSortBy] = useState("sales");
  const [category, setCategory] = useState(".");
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCategory(params.get("category") || "All");
  }, [search]);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", sortBy, search],
    queryFn: async () => {
      const { data } = await axiosFetch.get(
        `/gigs${search}&min=${minRef.current?.value || 0}&max=${
          maxRef.current?.value || 10000
        }&sort=${sortBy}`
      );
      return data;
    },
  });

  const handleSortBy = (type) => {
    setSortBy(type);
    setOpenMenu(false);
    refetch();
  };

  const handlePriceFilter = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          Ruhnix &gt; {category[0]?.toUpperCase() + category.slice(1)}
        </span>
        <h1>{category[0]?.toUpperCase() + category.slice(1)}</h1>
        <p>
          Explore the boundaries of art and technology with Ruhnix's {category}{" "}
          artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="Min" />
            <input ref={maxRef} type="number" placeholder="Max" />
            <button onClick={handlePriceFilter}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort By</span>
            <span className="sortType">
              {sortBy === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src="./media/down.png"
              alt="Toggle Menu"
              onClick={() => setOpenMenu(!openMenu)}
            />
            {openMenu && (
              <div className="rightMenu">
                {sortBy === "sales" ? (
                  <span onClick={() => handleSortBy("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => handleSortBy("sales")}>
                    Best Selling
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading ? (
            <div className="loader">
              <Loader size={45} />
            </div>
          ) : error ? (
            <div className="error">Something went wrong!</div>
          ) : (
            data?.map((gig) => <GigCard key={gig._id} data={gig} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
