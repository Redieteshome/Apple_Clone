import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../assets/image";
import { iphones } from "../../db";

function Iphone() {
  // State to store products coming from the backend
  const [products, setProducts] = useState([]);

  // useEffect runs only once when the component loads (because of empty [])
  useEffect(() => {
    // fetch("../Db.js") // Fetching all iPhone products from backend API
    //   .then((res) => res.json()) // convert the response to JSON
    //   .then((products) => {
    setProducts(iphones); // store them in state
    // });
  }, []);

  return (
    <>
      <section className="internal-page-wrapper top-100">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <div className="title-wraper m-2 pt-5 bold">Iphones</div>
              <div className="brief-description mb-3">
                The best for the brightest.
              </div>
            </div>
          </div>

          {/* Loop through all products and display them */}
          {products.map((product, index) => {
            // Get the image for the current product using index
            const imgSrc = images[index].Iphone;

            let productDiv = (
              <div
                key={product.product_id} // unique key for React
                className="row justify-content-center text-center product-holder h-100 top-100 bottom-100"
              >
                {/* Left side: Product text details */}
                <div
                  className={`col-sm-12 col-md-6 my-auto order-${
                    index % 2 === 0 ? "1" : "2"
                  }`}
                >
                  <div className="product-title">{product.product_name}</div>
                  <div className="product-brief">
                    {product.product_brief_description}
                  </div>
                  <div className="starting-price">
                    {`Starting at ${product.starting_price}`}
                  </div>
                  <div className="monthly-price">{product.price_range}</div>
                  <div className="links-wrapper">
                    <ul>
                      <li>
                        <Link to={`/iphone/${product.product_id}`}>
                          Learn more
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right side: Product Image */}
                <div
                  className={`col-sm-12 col-md-6 order-${
                    index % 2 === 0 ? "2" : "1"
                  }`}
                >
                  <div className="prodict-image">
                    <img src={imgSrc} alt="" />
                  </div>
                </div>
              </div>
            );
            return productDiv;
          })}
        </div>
      </section>
    </>
  );
}

export default Iphone;
