import React, { useContext, useState } from "react";
import { Media, Container, Form, Row, Col, Button } from "reactstrap";
import CartContext from "../../../../helpers/cart";
import paypal from "../../../../public/assets/images/paypal.png";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import { convertPrice } from "../../../../helpers/utils";
import { useUser } from "../../../../helpers/user/USerContext";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const cartContext = useContext(CartContext);
  const { addAddress, userProfile } = useUser();
  const cartItems = cartContext.state;
  const cart = cartContext.cart;
  const { state: selectedCurr } = useContext(CurrencyContext);
  const [obj, setObj] = useState({});         
  const [payment, setPayment] = useState("cod");
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddressFormVisible, setNewAddressFormVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const checkhandle = (value) => {
    setPayment(value);
  };

  // const onSubmit = async (data) => {
  //   console.log("..button clicked....")
  //   try {
  //     setLoading(true);
  //     // console.log("selected address is...."+selectedAddress)

  //     if (selectedAddress) {
  //       // console.log("selected address :",JSON.stringify(selectedAddress,null,2))
  //       data.selectedAddress = selectedAddress._id; // Include selected address ID in form data
  //       console.log("/.............."+data.selectedAddress)
  //     }
  //     await addAddress(data); // Call the addAddress function with form data
  //     setLoading(false);
  //     setObj({});
  //     // router.push({
  //     //   pathname: "/page/order-success",
  //     //   state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
  //     // });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error(error.response?.data?.error || "Error adding address");
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await addAddress(data); // Call the addAddress function with form data
      setLoading(false);
      setObj({})
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.error || "Error adding address");
      setLoading(false);
    }
  };
  

  const setStateFromInput = (event) => {
    obj[event.target.name] = event.target.value;
    setObj(obj);
  };


  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg="6" sm="12" xs="12" style={{paddingLeft:'40px'}}>
                  <div className="checkout-title" >
                    <h3>Billing & Shipping Details</h3>
                  </div>
                  {userProfile && userProfile.address && userProfile.address.length > 0 ? (
                    <div>
                      <h4>Select Address:</h4>
                      {userProfile.address.map((address, index) => (
                        <div key={index} style={{paddingTop:'20px'}}>
                          <input
                            type="radio"
                            id={`address-${index}`}
                            name="selectedAddress"
                            value={address._id}
                            onChange={() => setSelectedAddress(address)}
                          />
                          <label style={{ paddingLeft: '30px' }} htmlFor={`address-${index}`}>
                            <div>{address.firstName} {address.lastName}</div>
                            <div>{address.houseNo}, {address.street}, {address.landmark}</div>
                            <div>{address.city}, {address.state}, {address.postalcode}</div>
                            <div>{address.country}</div>
                          </label>
                        </div>
                      ))}
                      <div style={{ paddingTop: '40px' }}>
                        <Button className="btn-solid btn" onClick={() => setNewAddressFormVisible(true)}>Add New Address</Button>
                      </div>
                    </div>
                  ) : (
                    <Button className="btn-solid btn" onClick={() => setNewAddressFormVisible(true)}>Add Address</Button>
                  )}
                  {newAddressFormVisible && (
                    <div>
                      <div className="row check-out" style={{ paddingTop: '30px' }}>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">First Name</div>
                          <input type="text"
                            className={`${errors.firstName ? "error_border" : ""}`}
                            name="firstName"
                            {...register("firstName", { required: true })}
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">{errors.firstName && "First name is required"}</span>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Last Name</div>
                          <input type="text"
                            className={`${errors.lastName ? "error_border" : ""}`}
                            name="lastName"
                            {...register("lastName",)}
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">{errors.lastName && "Last name is required"}</span>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Phone</div>
                          <input type="text" onChange={setStateFromInput}
                            name="phone" className={`${errors.phone ? "error_border" : ""}`} {...register("phone", { pattern: /\d+/ })} />
                          <span className="error-message">{errors.phone && "Please enter number for phone."}</span>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Alternative Phone</div>
                          <input type="text" name="phone"
                            className={`${errors.alternativePhone ? "error_border" : ""}`}
                            {...register("alternativePhone", { pattern: /\d+/ })}
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">{errors.alternativePhone && "Please enter number for phone."}</span>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Email Address</div>
                          <input
                            //className="form-control"
                            className={`${errors.email ? "error_border" : ""}`}
                            type="text"
                            name="email"
                            {...register("email", {
                              pattern: /^\S+@\S+$/i,
                            })}
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">{errors.email && "Please enter proper email address ."}</span>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">House/Flat No</div>
                          <input type="text" className={`${errors.houseNo ? "error_border" : ""}`}
                            name="houseNo"
                            {...register("houseNo",)}
                            onChange={setStateFromInput}
                          />
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Street</div>
                          <input
                            //className="form-control"
                            className={`${errors.street ? "error_border" : ""}`}
                            type="text"
                            name="street"
                            {...register("street", { required: true, min: 5, max: 120 })}
                            placeholder="Street address"
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">{errors.address && "Please right your address ."}</span>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Landmark</div>
                          <input
                            //className="form-control"
                            className={`${errors.landmark ? "error_border" : ""}`}
                            type="text"
                            name="landmark"
                            {...register("landmark")}
                            placeholder="Landmark"
                            onChange={setStateFromInput}
                          />
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Town/City</div>
                          <input
                            //className="form-control"
                            type="text"
                            className={`${errors.city ? "error_border" : ""}`}
                            name="city"
                            {...register("city", { required: true })}
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">{errors.city && "select one city"}</span>
                        </div>
                        <div className="form-group col-md-12 col-sm-6 col-xs-12">
                          <div className="field-label">State / County</div>
                          <input
                            //className="form-control"
                            type="text"
                            className={`${errors.state ? "error_border" : ""}`}
                            name="state"
                            {...register("state", { required: true })}
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">{errors.state && "select one state"}</span>
                        </div>
                        <div className="form-group col-md-12 col-sm-6 col-xs-12">
                          <div className="field-label">Postal Code</div>
                          <input
                            //className="form-control"
                            type="text"
                            name="pincode"
                            className={`${errors.postalcode ? "error_border" : ""}`}
                            {...register("postalcode", { pattern: /\d+/ })}
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">{errors.postalcode && "Required integer"}</span>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Country</div>
                          <input type="text" className={`${errors.country ? "error_border" : ""}`}
                            name="country"
                            {...register("country", { required: true })}
                            onChange={setStateFromInput}
                          />
                          <span className="error-message">{errors.country && "Country is required"}</span>
                        </div>

                      </div>
                      <br></br>
                      <br></br>
                      <Button type="submit" className="btn-solid btn" >
                        Save Address
                      </Button>
                    </div>

                  )}
                </Col>
                <Col lg="6" sm="12" xs="12">
                  {cartItems && cartItems.length > 0 > 0 ? (
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div>
                            Product <span>Total</span>
                          </div>
                        </div>
                        <ul className="qty">
                          {cartItems.map((item, index) => (
                            <li key={index}>
                              {item.title} × {item.quantity}{" "}
                              <span>
                                {selectedCurr.symbol}
                                {convertPrice(item.price, selectedCurr)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className="sub-total">
                          <li>
                            Subtotal{" "}
                            <span className="count">
                              {selectedCurr.symbol}
                              {convertPrice(cart.total, selectedCurr)}
                            </span>
                          </li>
                          <li>
                            Shipping
                            <div className="shipping">
                              <div className="shopping-option">
                                <input type="checkbox" name="free-shipping" id="free-shipping" />
                                <label htmlFor="free-shipping">Free Shipping</label>
                              </div>
                              <div className="shopping-option">
                                <input type="checkbox" name="local-pickup" id="local-pickup" />
                                <label htmlFor="local-pickup">Local Pickup</label>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <ul className="total">
                          <li>
                            Total{" "}
                            <span className="count">
                              {selectedCurr.symbol}
                              {convertPrice(cart.total, selectedCurr)}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="payment-box">
                        <div className="upper-box">
                          <div className="payment-options">
                            <ul>
                              <li>
                                <div className="radio-option stripe">
                                  <input type="radio" name="payment-group" id="payment-2" defaultChecked={true} onClick={() => checkhandle("cod")} />
                                  <label htmlFor="payment-2">COD</label>
                                </div>
                              </li>
                              <li>
                                <div className="radio-option paypal">
                                  <input type="radio" name="payment-group" id="payment-1" onClick={() => checkhandle("paypal")} />
                                  <label htmlFor="payment-1">
                                    PayPal
                                    <span className="image">
                                      <Media src={paypal.src} alt="" />
                                    </span>
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {cart.total !== 0 ? (
                          <div className="text-end">
                            {payment === "cod" ? (
                              <button type="submit" className="btn-solid btn">
                                Place Order
                              </button>
                            ) : (
                              <PayPalScriptProvider options={{ clientId: "test" }}>
                                <PayPalButtons
                                  createOrder={(data, actions) => {
                                    return actions.order.create({
                                      purchase_units: [
                                        {
                                          amount: {
                                            value: "1.99",
                                          },
                                        },
                                      ],
                                    });
                                  }}
                                  onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                      const name = details.payer.name.given_name;
                                      alert(`Transaction completed by ${name}`);
                                    });
                                  }}
                                />
                              </PayPalScriptProvider>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
               
              </Row>
              {/* <div style={{ paddingTop: '20px', paddingLeft: '40%' }}>
                <Button type="submit" className="btn-solid btn" style={{ paddingTop: '20px', paddingBottom: '20px' }} onClick={handleSubmit(onSubmit)}>
                  Place Order
                </Button>
              </div> */}

            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;