"use client";
import React, { useState, useEffect } from "react";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [SubTotal, setSubTotal] = useState(0);

  useEffect(() => {
    try {
      let savedCart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : {};
      setCart(savedCart);
      calculateSubtotal(savedCart);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const calculateSubtotal = (mycart) => {
    let subt = 0;
    Object.keys(mycart).forEach((key) => {
      subt += mycart[key].price * mycart[key].qty;
    });
    setSubTotal(subt);
  };

  const saveCart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart));
    calculateSubtotal(mycart);
  };

  const addToCart = (itemcode, size, qty, price, name, varient) => {
    let newCart = { ...cart };
    if (itemcode in newCart) {
      newCart[itemcode].qty += qty;
    } else {
      newCart[itemcode] = { qty, price, name, varient, size };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemcode, qty) => {
    let newCart = { ...cart };
    if (itemcode in newCart) {
      newCart[itemcode].qty -= qty;
      if (newCart[itemcode].qty <= 0) {
        delete newCart[itemcode];
      }
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  return (
    <>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        SubTotal={SubTotal}
      />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        SubTotal={SubTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
