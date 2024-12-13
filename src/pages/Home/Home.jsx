import { useEffect } from "react";
import { Featured, Slide, TrustedBy } from "../../components";
import { CategoryCard, ProjectCard } from "../../components";
import { cards, projects } from "../../data";

import "./Home.scss";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home">
      <Featured />
      <br />
      <br />
      <br />
      <h1>
        <b>Popular Services</b>
      </h1>
      <Slide slidesToShow={5}>
        {cards.map((card) => (
          <CategoryCard key={card.id} data={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h2>
              <b>RUHNIX </b>pro
            </h2>
            <h1>
              The premium <span>freelance</span> <br />
              solution for businesses
            </h1>
            <table className="features-table">
              <tr>
                <td>
                  <div className="title">
                    <img src="./media/check 2.png" alt="check" />
                    <h6>Dedicated hiring experts</h6>
                  </div>
                  <p>
                    Count on an account manager to find you the right talent and
                    see to your project's every need.
                  </p>
                </td>
                <td>
                  <div className="title">
                    <img src="./media/check 2.png" alt="check" />
                    <h6>Satisfaction guarantee</h6>
                  </div>
                  <p>
                    Order confidently with guaranteed refunds for less than
                    satisfactory deliveries.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="title">
                    <img src="./media/check 2.png" alt="check" />
                    <h6>Advanced management tools</h6>
                  </div>
                  <p>
                    Seamlessly integrate freelancers into your team and
                    projects.
                  </p>
                </td>
                <td>
                  <div className="title">
                    <img src="./media/check 2.png" alt="check" />
                    <h6>Flexible payment models</h6>
                  </div>
                  <p>
                    Pay per project or opl for hourly rates to facilitate longer
                    term collaboration.
                  </p>
                </td>
              </tr>
            </table>
            <button>Try Now</button>
          </div>
          <div className="item">
            <video
              poster="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png"
              src="./media/video.mp4"
              controls
            ></video>
          </div>
        </div>
      </div>

      <div className="Success">
        <h1>What success on RUHNIX looks like</h1>
        <h4>
          Vontelle Eyewear turns to RUHNIX freelancers to bring their version to
          life.
        </h4>
        <div className="video">
          <video
            poster="https://img.freepik.com/free-photo/businesspeople-celebrating-success_1098-1996.jpg?semt=ais_hybrid"
            src="./media/Success.mp4"
            controls
          ></video>
        </div>
      </div>

      {/* Fiverr Business Component */}
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h2>fiverr business</h2>
            <h1>
              A business solution designed for <span>teams</span>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>Connect to freelancers with proven business experience</h6>
            </div>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>
                Get matched with the perfect talent by a customer success
                manager
              </h6>
            </div>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>
                Manage teamwork and boost productivity with one powerful
                workspace
              </h6>
            </div>
            <button>Explore Fiverr Business</button>
          </div>
          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <Slide slidesToShow={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} data={card} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
