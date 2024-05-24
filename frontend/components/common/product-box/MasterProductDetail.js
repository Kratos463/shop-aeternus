import React, { useContext } from "react";
import { convertPrice } from "../../../helpers/utils";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";

const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  uniqueTags,
  detailClass,
  title,
  des,
  variantChangeByColor,
}) => {
  let RatingStars = [];
  let rating = 5;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }

  const { state: selectedCurr } = useContext(CurrencyContext);


  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div>
        {title !== "Product style 4" ? (
          <div className="rating">{RatingStars}</div>
        ) : (
          ""
        )}
        <h6>{product?.Title}</h6>
        {des ? <p>{product?.description}</p> : ""}
        <h4>
          {selectedCurr.symbol}
          {convertPrice(product.Price, selectedCurr)}.00

          {/* for discount price */}
          {/* {(
            (product.price - (product.price * product.discount) / 100) *
            currency.value
          ).toFixed(2)} */}

          {/* For discount price */}
          {/* <del>
            <span className="money">
              {currency.symbol}
              {(product.price * currency.value).toFixed(2)}
            </span>
          </del> */}
        </h4>

        {/* {product?.variants.map((vari) => {
          var findItem = uniqueTags.find((x) => x.color === vari.color);
          if (!findItem) uniqueTags.push(vari);
        })} */}

        {/* {product.type === "jewellery" ||
        product.type === "nursery" ||
        product.type === "beauty" ||
        product.type === "electronics" ||
        product.type === "goggles" ||
        product.type === "watch" ||
        product.type === "pets" ? (
          ""
        ) : (
          <>
            {title !== "Product style 4" && uniqueTags[0].color ? (
              <ul className="color-variant">
                {uniqueTags.map((vari, i) => {
                  return (
                    <li
                      className={vari.color}
                      key={i}
                      title={vari.color}
                      onClick={() =>
                        variantChangeByColor(vari.image_id, product.images)
                      }
                    ></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        )} */}
      </div>
    </div>
  );
};

export default MasterProductDetail;
