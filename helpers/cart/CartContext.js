import React, { useState, useEffect } from "react";
import Context from "./index";
import { toast } from "react-toastify";
import axios from "axios";

const getLocalCartItems = () => {
  try {
    const list = localStorage.getItem("cartList");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
  } catch (err) {
    return [];
  }
};

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState("InStock");

  useEffect(() => {
    const Total = cartItems.reduce((a, b) => a + b.total, 0);
    setCartTotal(Total);

    localStorage.setItem("cartList", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Product To Cart
  const addToCart = async (user, product, colors, sizes, quantity) => {
    try {
      const response = await axios.post("/api/cart/addToCart", {
        userId: user._id,
        productId: product.Product_id,
        skuId: product.Sku_id,
        title: product.Title,
        description: product.Description,
        price: product.Price,
        image: product.Medium_file,
        sizeId: sizes.Size_id,
        colorId: colors.Color_id,
        quantity: quantity,
      });
      
      if (response.data.success) {
        toast.success("Product added to cart successfully!");
        // setCartItems([...cartItems, response.data.cartItem]);
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart");
    }
  };

  const removeFromCart = (item) => {
    toast.error("Product Removed Successfully !");
    setCartItems(cartItems.filter((e) => e.id !== item.id));
  };

  

  // Update Product Quantity
  const updateQty = (item, quantity) => {
    if (quantity >= 1) {
      const index = cartItems.findIndex((itm) => itm.id === item.id);
      if (index !== -1) {
        cartItems[index] = {
          ...item,
          qty: quantity,
          total: item.price * quantity,
        };
        setCartItems([...cartItems]);
        toast.info("Product Quantity Updated !");
      } else {
        const product = {
          ...item,
          qty: quantity,
          total: (item.price - (item.price * item.discount) / 100) * quantity,
        };
        setCartItems([...cartItems, product]);
        toast.success("Product Added Updated !");
      }
    } else {
      toast.error("Enter Valid Quantity !");
    }
  };

  return (
    <Context.Provider
      value={{
        ...props,
        state: cartItems,
        cartTotal,
        setQuantity,
        quantity,
        stock,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        updateQty: updateQty,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CartProvider;
