import React, { useContext } from "react";
import { Media } from "reactstrap";
import Slider from "react-slick";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import { ProductsContext } from "../../../helpers/product/ProductContext";
import { convertPrice, truncateTitle } from "../../../helpers/utils";

const NewProduct = () => {
  const { state: selectedCurr } = useContext(CurrencyContext);

  const { products, loading } = useContext(ProductsContext);

  return (
    // <!-- side-bar single product slider start -->
    <div className="theme-card">
      <h5 className="title-border">new product</h5>
      <Slider className="offer-slider slide-1">
        <div>
          {!products ||
            products.length === 0 ||
            loading ? (
            "loading"
          ) : (
            <>
              {products &&
                products.slice(0, 3).map((product, index) => (
                  <div className="media" key={index}>
                    <a href="">
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={`https://thebrandtadka.com/images_inventory_products/front_images/${product.Product_image}`}
                        alt=""
                      />
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div>
                      <a href={null}>
                        <h6>{truncateTitle(product.Title, 15)}</h6>
                      </a>
                      <h4>
                        {selectedCurr.symbol}
                        {convertPrice(product.Price, selectedCurr)}.00
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div>
          {!products ||
            products.length === 0 ||
            loading ? (
            "loading"
          ) : (
            <>
              {products &&
                products.slice(4, 7).map((product, index) => (
                  <div className="media" key={index}>
                    <a href="">
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={`https://thebrandtadka.com/images_inventory_products/front_images/${product.Product_image}`}
                        alt=""
                      />
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div>
                      <a href={null}>
                        <h6>{truncateTitle(product.Title, 15)}</h6>
                      </a>
                      <h4>
                        {selectedCurr.symbol}
                        {convertPrice(product.Price, selectedCurr)}.00
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </Slider>
    </div>
    //  <!-- side-bar single product slider end -->
  );
};

export default NewProduct;
