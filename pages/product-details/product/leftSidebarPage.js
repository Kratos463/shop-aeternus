import React, { useState, useEffect, useRef } from "react";
import ProductTab from "../common/product-tab";
import Service from "../common/service";
import NewProduct from "../../shop/common/newProduct";
import Slider from "react-slick";
import DetailsWithPrice from "../common/detail-price";
import { Container, Row, Col, Media } from "reactstrap";
import axios from "axios";



const LeftSidebarPage = ({ pathId }) => {


  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);


  const [loading, setLoading] = useState(false)
  const [productDetails, setProductDetails] = useState([])
  const [image, setImage] = useState("")
  const [state, setState] = useState({ nav1: null, nav2: null });
  const [productColors, setProductColors] = useState([])
  const [productSizes, setProductSizes] = useState([])



  useEffect(() => {
    const fetchProductDetails = async () => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/api/getProductDetails?productId=${pathId}`);
          if (response.data.Records) {
            if (Array.isArray(response.data.Records)) {
              setProductDetails(response.data.Records);
            } else {
              setProductDetails([response.data.Records]);
            }
          } else {
            setProductDetails([]);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };

      fetchData();
    };

    fetchProductDetails();
  }, [pathId]);



  const productDetail = productDetails.length > 0 ? productDetails[0] : null;

  // for fetching the product image
  useEffect(() => {
    if (productDetail) {
      const imageUrl = `https://thebrandtadka.com/images_inventory_products/front_images/${productDetail.Medium_file}`;
      setImage(imageUrl);
    }
  }, [productDetail]);


  // for fetching the product colors
  useEffect(() => {
    const fetchProductColors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`../api/getproductColors?skuId=${productDetail.Sku_id}`);
        if (response.data.Records) {
          if (Array.isArray(response.data.Records)) {
            setProductColors(response.data.Records);
          } else {
            setProductColors([response.data.Records]);
          }
        } else {
          setProductColors([]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProductColors();

  }, [productDetail])

  // for fetching the product sizes
  useEffect(() => {
    const fetchProductSizes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`../api/getProductSizes?skuId=${productDetail.Sku_id}`);
        if (response.data.Records) {
          if (Array.isArray(response.data.Records)) {
            setProductSizes(response.data.Records);
          } else {
            setProductSizes([response.data.Records]);
          }
        } else {
          setProductSizes([]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProductSizes();

  }, [productDetail])

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  const changeColorVar = (img_id) => {
    slider2.current?.slickGoTo(img_id);
  };


  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="3" className="collection-filter" id="filter">
              <Service />
              <NewProduct />

            </Col>
            <Col lg="9" sm="12" xs="12">
              <Container fluid={true}>
                <Row>
                  <Col xl="12" className="filter-col">
                    <div className="filter-main-btn mb-2">
                      <span onClick={filterClick} className="filter-btn">
                        <i className="fa fa-filter" aria-hidden="true"></i> filter
                      </span>
                    </div>
                  </Col>
                </Row>
                {!productDetail ? (
                  "loading"
                ) : (
                  <Row>
                    <Col lg="6" className="product-thumbnail">
                      {/* <Slider {...products} asNavFor={nav2} ref={(slider) => setSlider1(slider)} className="product-slick">
                        {data.product.images.map((vari, index) => (
                          <div key={index}>
                            <ImageZoom image={vari} />
                          </div>
                        ))}
                      </Slider>
                      {data.product.variants.length > 1 && (
                        <Slider className="slider-nav" {...sliderNav} asNavFor={nav1} ref={(slider) => setSlider2(slider)}>
                          {data.product.images.map((item, i) => ( */}
                      <div>
                        <Media src={image} alt="" className="img-fluid" />
                      </div>
                      {/* ))}
                        </Slider>
                      )} */}
                    </Col>
                    <Col lg="6" className="rtl-text product-ps">
                      <DetailsWithPrice item={productDetail} colors={productColors} sizes={productSizes} changeColorVar={changeColorVar} />
                    </Col>
                  </Row>
                )}
              </Container>
              <ProductTab product={productDetail} />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default LeftSidebarPage;



