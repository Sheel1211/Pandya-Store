import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { TypeAnimation } from "react-type-animation";

const ExampleComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        "Shop the World, Delivered to Your Doorstep",
        1000,
        "Where Style Meets Convenience, Every Time",
        1000,
        "Discover, Shop, and Inspire",
        1000,
        "Discover the Art of Smart Shopping",
        1000,
        "Find Your Perfect Match, Shop Exclusively",
        1000,
        "Your One-Stop Shopping Destination",
        1000,
        "Shop with Confidence, Always",
        1000,
      ]}
      wrapper="h1"
      speed={50}
      style={{ fontSize: "2.5vmax", display: "inline-block" }}
      repeat={Infinity}
    />
  );
};

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Pandya Store" />

          <div className="banner">
            <p>Welcome to Pandya Store</p>
            {/* <h1>Seamless Shopping at Your Fingertips</h1> */}
            <ExampleComponent />

            <a href="#container">
              <button>
                Featured <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
