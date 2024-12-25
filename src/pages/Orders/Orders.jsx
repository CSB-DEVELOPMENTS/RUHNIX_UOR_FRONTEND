import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosFetch } from "../../utils";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms";
import { Loader } from "../../components";
import "./Orders.scss";

const Orders = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      axiosFetch
        .get(`/orders`)
        .then(({ data }) => {
          return data;
        })
        .catch(({ response }) => {
          console.log(response.data);
        }),
  });

  const handleContact = async (order) => {
    const sellerID = order.sellerID.hasOwnProperty("_id")
      ? order.sellerID._id
      : order.sellerID;
    const buyerID = order.buyerID.hasOwnProperty("_id")
      ? order.buyerID._id
      : order.buyerID;

    axiosFetch
      .get(`/conversations/single/${sellerID}/${buyerID}`)
      .then(({ data }) => {
        navigate(`/message/${data.conversationID}`);
      })
      .catch(async ({ response }) => {
        if (response.status === 404) {
          const { data } = await axiosFetch.post("/conversations", {
            to: user.isSeller ? buyerID : sellerID,
            from: user.isSeller ? sellerID : buyerID,
          });
          navigate(`/message/${data.conversationID}`);
        }
      });
  };

  return (
    <div className="orders">
      {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <div className="cards">
            {data.map((order) => (
              <div className="card" key={order._id}>
                <div className="card-header">
                  <img
                    className="card-image"
                    src={order.image}
                    alt={order.title}
                  />
                </div>
                <div className="card-body">
                  <h2 className="card-title">{order.title}</h2>
                  <p className="card-price">
                    {order.price.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                  <p className="card-user">
                    {user.isSeller ? "Buyer: " : "Seller: "}
                    {user.isSeller
                      ? order.buyerID.username
                      : order.sellerID.username}
                  </p>
                </div>
                <div className="card-footer">
                  <button
                    className="contact-button"
                    onClick={() => handleContact(order)}
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
