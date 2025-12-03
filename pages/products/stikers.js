import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ProductPage = ({ addToCart }) => {
  const router = useRouter();
  const [slug, setSlug] = useState(null);
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);

  // Example product details
  const item = {
    code: "Stikers002",
    name: slug || "Stikers by CodeWear",
    price: 30,
    
  };

  useEffect(() => {
    if (router.query.slug) {
      setSlug(router.query.slug);
    }
  }, [router.query.slug]);

  const checkServiceability = async () => {
    try {
      let res = await fetch("/api/pincode");
      let pins = await res.json();
      setService(pins.includes(Number(pin)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="product"
            className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded"
            src="https://th.bing.com/th/id/OIP.1MFbexwcoKOuN09feHYBNwHaHa?w=178&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
          />

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>

            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {item.name}
            </h1>

            <p className="leading-relaxed mb-5">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.
            </p>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              {/* Color & Size selection */}
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex ml-6 items-center">
                <div className="relative">
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center mb-5">
              <span className="title-font font-medium text-2xl text-gray-900">Rs {item.price}</span>
              <button
                onClick={() => addToCart(item.code, item.size, 1, item.price, item.name, item.varient)}
                className="ml-8 text-white bg-pink-500 py-2 px-6 rounded hover:bg-pink-600"
              >
                Add to Cart
              </button>
            </div>

            {/* Pincode Section */}
            <div className="pin flex mt-6 space-x-2 text-sm">
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="px-2 border border-pink-600 rounded"
                placeholder="Enter Pincode"
              />
              <button
                onClick={checkServiceability}
                className="text-white bg-pink-500 py-2 px-6 rounded hover:bg-pink-600"
              >
                Check
              </button>
            </div>

            {service === false && (
              <div className="text-red-700 text-sm mt-5">
                Sorry! We do not deliver to this pin code yet
              </div>
            )}
            {service === true && (
              <div className="text-green-700 text-sm mt-5">
                This pin code is serviceable
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
