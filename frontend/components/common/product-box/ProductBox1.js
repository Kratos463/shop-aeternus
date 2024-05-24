import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Row, Col, Media, Modal, ModalBody, ModalHeader } from "reactstrap";
import CartContext from "../../../helpers/cart";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import MasterProductDetail from "./MasterProductDetail";
import axios from "axios";
import { convertPrice } from "../../../helpers/utils";
import { useAuth } from "../../../helpers/auth/AuthContext";

const ProductItem = ({ product, addCart, des, addWishlist, cartClass, productDetail, title }) => {
  // eslint-disable-next-line
  const router = useRouter();
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;

  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [frontImage, setFrontImage] = useState("")
  const [loading, setLoading] = useState(false)
  const toggle = () => setModal(!modal);
  const uniqueTags = [];
  const { state: selectedCurr } = useContext(CurrencyContext);


  useEffect(() => {
    const imageUrl = `https://thebrandtadka.com/images_inventory_products/front_images/${product.Product_image ? product.Product_image : product.Small_file}`;

    setFrontImage(imageUrl);
    setLoading(false);
  }, [product]);


  const clickProductDetail = () => {
    router.push(`/product-details/${product.Product_id}`);
  };

  const variantChangeByColor = (imgId, product_images) => {
    product_images?.map((data) => {
      if (data?.image_id == imgId) {
        setImage(data.src);
      }
    });
  };


  return (
    <div className="product-box product-wrap">
      <div className="img-wrapper">
        <div className="lable-block">
          {product.new === true ? <span className="lable3">new</span> : ""}
          {product.sale === true ? <span className="lable4">on sale</span> : ""}
        </div>
        <div className="front" onClick={clickProductDetail}>
          <Media src={frontImage} className="img-fluid" alt="" />
        </div>
        {product.images ? (
          <ul className="product-thumb-list">
            {product.images.map((img, i) => (
              <li className={`grid_thumb_img ${img.src === image ? "active" : ""}`} key={i}>
                <a href={null} title="Add to Wishlist">
                  {/* <Media src={`${img.src}`} alt="wishlist" onClick={() => onClickHandle(img.src)} /> */}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <MasterProductDetail product={product} productDetail={productDetail} currency={currency} uniqueTags={uniqueTags} title={title} des={des} variantChangeByColor={variantChangeByColor} />
    </div>
  );
};

export default ProductItem;