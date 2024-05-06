import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Media, Modal, ModalBody } from "reactstrap";
import { useQuery } from "@apollo/client";
import { gql } from '@apollo/client';
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { useRouter } from "next/router";
import axios from "axios";
import { ProductsContext } from "../../../helpers/product/ProductContext";
import { convertPrice, truncateTitle } from "../../../helpers/utils";


const ProductSection = ({ pathId }) => {
  const router = useRouter();
  const wishlistContext = useContext(WishlistContext);
  const { state: selectedCurr } = useContext(CurrencyContext);
  const cartCtx = useContext(CartContext);
  const addToCart = cartCtx.addToCart;
  const quantity = cartCtx.quantity;

  const { products, loading } = useContext(ProductsContext)

  const clickProductDetail = (product) => {
    router.push(`/product-details/${product.Product_id}`, undefined, { shallow: true });
  };


  return (
    <section className="section-b-space ratio_asos">
      <Container>
        <Row>
          <Col className="product-related">
            <h2>Related Products</h2>
          </Col>
        </Row>
        <Row className="search-product">
          {!products ||
            products.length === 0 ||
            loading ? (
            "loading"
          ) : (
            <>
              {products &&
                products.slice(0, 6).map((product, index) => (
                  <Col xl="2" md="4" sm="6" key={index}>
                    <div className="product-box">
                      <div className="img-wrapper">
                        <div className="front">
                          <a href={null}>
                            <Media
                              onClick={() => clickProductDetail(product)}
                              src={`https://thebrandtadka.com/images_inventory_products/front_images/${product.Product_image}`}
                              className="img-fluid blur-up lazyload bg-img"
                              alt={product.Title}
                            />
                          </a>
                        </div>
                        <div className="cart-info cart-wrap">

                          {/* for adding to cart */}
                          <button
                            data-toggle="modal"
                            data-target="#addtocart"
                            title="Add to cart"
                            onClick={() => addToCart(product, quantity)}
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </button>

                          {/* for adding in wishlist */}
                          <a
                            href="#"
                            onClick={() => wishlistContext.addToWish(product)}
                            title="Add to Wishlist"
                          >
                            <i className="fa fa-heart" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                      <div className="product-detail">
                        <div className="rating">
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <a onClick={() => clickProductDetail(product)}>
                          <h6>{truncateTitle(product.Title, 20)}</h6>
                        </a>
                        <h4>
                          {selectedCurr.symbol}
                          {convertPrice(parseInt(product.Price), selectedCurr)}.00
                        </h4>
                        <ul className="color-variant">
                          <li className="bg-light0"></li>
                          <li className="bg-light1"></li>
                          <li className="bg-light2"></li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                ))}
            </>
          )}
        </Row>
      </Container>

    </section>
  );
};

export default ProductSection;
