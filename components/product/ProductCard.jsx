import React, { useContext } from 'react';
import Link from 'next/link';
import context from '@/context/context';
import Swal from 'sweetalert2';

const truncateTitle = (title, maxLength) => {
  if (title?.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
};

const ProductCard = ({ product }) => {
  const a = useContext(context);
  const truncatedTitle = truncateTitle(product?.title, 80);
  const loggedIn = a.loggedIn;
  const addToCart = a.addToCart;

  const handleaddtoCart = async (data) => {
    if (loggedIn !== "yes") {
      return Swal.fire("Login to Continue", "", "info")
    }
    const btn = document.getElementById(data.btnid);
    btn.disabled=true
    const oldinnerText = btn.innerHTML
    btn.innerText = "Loading...";
    await addToCart(data);
    btn.innerHTML = oldinnerText
    btn.disabled=false
  }

  return (
    <div className={`productcard`}>
      <Link style={{ margin: "auto", textDecoration: 'none', position: 'relative', width: "100%" }} href={`/product/${product?._id}`}>
        <div className="imgcover">
          <img
            src={product?.image}
            alt=""
            srcSet=""
          />
        </div>
        <div className='my-3 title'>{truncatedTitle}</div>
        {/* Add to Cart Button */}
      </Link>
       <div className="card-column">
        <div className="card-row">
          <div className='price fw-bold'>Price: £{Number(product?.price)?.toFixed(2)}</div>
          <button className="btn btn-success add-to-cart-btn" id={`cartbtn2${product?._id}`} style={{ borderRadius: "0px" }} onClick={() => handleaddtoCart({ id: product._id,btnid: `cartbtn2${product._id}`,quantity:1})}>
            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
