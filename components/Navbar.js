import Link from "next/link";
import { useRouter } from "next/router";  // <-- add this
import { BiCartAlt, BiSolidPlusCircle } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import { IoBagCheck } from "react-icons/io5";
import { FaMinusCircle } from "react-icons/fa";
import { useRef } from "react";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, SubTotal }) => {
  const ref = useRef();
  const router = useRouter();   // <-- initialize router
  
  // Navigate to checkout page
  const goToCheckout = () => {
    router.push("/checkout");// <-- navigate programmatically
    
  };

  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full');
      ref.current.classList.add('translate-x-0');
    } else {
      ref.current.classList.remove('translate-x-0');
      ref.current.classList.add('translate-x-full');
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-4 shadow-md relative">
      {/* Logo */}
      <div className="logo mx-0">
        <Link href={"/"}>
          <img src="/logo.png" alt="Logo" className="w-90 h-15"/>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="nav flex-1 ml-4">
        <ul className="flex items-center space-x-8 font-bold md:text-xl">
          <li><Link href={"/tshirt"}>Tshirts</Link></li>
          <li><Link href={"/mugs"}>Mugs</Link></li>
          <li><Link href={"/hoodies"}>Hoodies</Link></li>
          <li><Link href={"/stickers"}>Stickers</Link></li>
          <li><Link href={"/mousepads"}>Mousepads</Link></li>
          <li className="bg-pink-500 r-0 rounded-4xl px-5 py-2 ml-106"><Link href={"/login"}>Login</Link></li>
        </ul>
      </div>

      {/* Cart Icon */}
      <div onClick={toggleCart} className="cart mx-8 cursor-pointer">
        <BiCartAlt className="text-5xl"/>
      </div>

      {/* Sidebar Cart */}
      <div ref={ref} className="sidebar absolute top-0 right-0 w-80 h-screen bg-pink-100 p-5 py-10 transform transition-transform translate-x-full shadow-lg z-50">
        <h2 className="font-bold text-xl text-center mb-4">Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-5 cursor-pointer text-pink-500 text-2xl">
          <IoIosCloseCircle />
        </span>

        <ol className="list-decimal">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-semibold text-center">Your Cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => (
            <li key={k} className="mb-3">
              <div className="item flex justify-between items-center">
                <div>{cart[k].name}</div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      addToCart(
                        k,
                        cart[k].size,
                        1,
                        cart[k].price,
                        cart[k].name,
                        cart[k].varient
                      )
                    }
                  >
                    <BiSolidPlusCircle className="text-2xl text-pink-400"/>
                  </button>
                  <span>{cart[k].qty}</span>
                  <button onClick={() => removeFromCart(k, 1)}>
                    <FaMinusCircle className="text-xl text-pink-400"/>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* SubTotal */}
        <div className="mt-4 font-bold text-lg text-center">Total: Rs {SubTotal}</div>

        {/* Cart Buttons */}
        <div className="flex mt-6 justify-center space-x-4">
          <button
            onClick={goToCheckout}   // <-- updated function
            className="flex items-center text-white bg-pink-500 border-0 py-2 px-4 rounded hover:bg-pink-600"
          >
            <IoBagCheck className="mr-2"/> CheckOut
          </button>
          <button
            onClick={clearCart}
            className="flex items-center text-white bg-pink-500 border-0 py-2 px-4 rounded hover:bg-pink-600"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
