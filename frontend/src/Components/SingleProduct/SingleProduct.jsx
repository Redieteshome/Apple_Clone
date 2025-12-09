import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { images } from "../../assets/image";
import Error from "../Pages/Error";

function SingleProduct() {
  const { pid } = useParams(); // http://localhost:4000/iphones/1    reads the dynamic values from the URL.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/iphones")
      .then((res) => res.json())
      .then((data) => {
        const singleProduct = data.filter(
          (item) => item.product_id === Number(pid)
        //   (item) => item.product_name === productID
        );
        setProducts(singleProduct);
      });
  }, [pid]);

  if (products.length > 0) {
    return (
      <>
        <section className="internal-page-wrapper top-100">
          <div className="container">
            {products.map((product) => {
              // FIND THE MATCHING IMAGE BASED ON PRODUCT NAME
              const matchedImage = images.find(
                (img) => img.product_name === product.product_name
              );

              return (
                <div key={product.product_id} className="bottom-100">
                  <div className="row justify-content-center text-center bottom-50">
                    <div className="col-12">
                      <div className="title-wraper bold mt-5 pt-5">
                        {product.product_name}
                      </div>
                      <div className="brief-description">
                        {product.product_brief_description}
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-center text-center product-holder h-100">
                    <div className="col-sm-12 col-md-6 my-auto">
                      <div className="starting-price">
                        Starting at {product.starting_price}
                      </div>
                      <div className="monthly-price">{product.price_range}</div>
                      <div className="product-details">
                        {product.product_description}
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="prodict-image">
                        <img
                          src={matchedImage.Iphone}
                          alt={product.product_name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  } else {
    return <Error />;
  }
}

export default SingleProduct;
