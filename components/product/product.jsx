import React, { useContext, useEffect, useState } from 'react'
import context from '../../context/context';
import Loader from '../../pages/Loading/Loading';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Course = ({ id, deliveryCountry }) => {
  const a = useContext(context);
  const getProductbyId = a.getProductbyId;
  const product = a.product;
  const addToCart = a.addToCart;
  const loggedIn = a.loggedIn;
  const [dataloading, setdataloading] = useState(true);
  // Variations

  const getdata = async () => {
    if (!id) {
      return
    }
    setdataloading(true)
    await getProductbyId(id, deliveryCountry);
    setdataloading(false)
  }

  useEffect(() => {
    getdata();
    // getreviewfunc()
  }, [id]);

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [size, setsize] = useState("")

  const handleQuantityChange = (value) => {
    setSelectedQuantity(parseInt(value));
  };

  const handleaddtoCart = async () => {
    const data = { id: product._id, type: "product", btnid: `cartbtn${product._id}`, quantity: selectedQuantity,size }
    if (loggedIn !== "yes") {
      return Swal.fire("Login to Continue", "", "info")
    }
    if(!size){
      return toast.error("Please Select a Size")
    }
    const btn = document.getElementById(data.btnid);
    const oldinnerText = btn.innerHTML
    btn.innerText = "Loading...";
    await addToCart(data);
    btn.innerHTML = oldinnerText
  };


  return (
    <div>
      {dataloading ? <Loader /> :
        <>
          <div className="ProductMainDetailsContainer">
            <div className='ProductImagesContainer'>
              <img style={{marginLeft:"30px",maxWidth:"70%"}} src={product.image} alt="" className='product_Image' />
            </div>
            <div className="ProductMainDetails mx-2">
              <h2 className="title">{product.title}</h2>
              <div className='d-flex align-items-center gap-2'>
                <h4 className="my-2 fw-bold">
                £{product?.price && product.price?.toFixed(2)}
                </h4>
              </div>
              <div className="stockDetails">
                <div className="stockstatus">
                  {product?.quantity > 0 ? <div className="inStock">In Stock</div> : <div className="outofStock">Out Of Stock</div>}
                </div>
                <div className="stockquantity">{product?.quantity} Items Remanining</div>
              </div>
              <div className="AddTocartDetails my-3">
                <div style={{gap: "10px",flexWrap: "wrap"}} className="btn-group">
                  <button type="button" className="btn-quantity dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Quantity : {product?.quantity > 0 ? selectedQuantity : 0}
                  </button>
                  <ul className="dropdown-menu">
                    {[...Array(product?.quantity).keys()].map((quant) => (
                      <li key={quant} onClick={() => handleQuantityChange(quant + 1)}><span className="dropdown-item" >{quant + 1}</span></li>
                    ))}
                  </ul>
                  
                <select onChange={(e)=>setsize(e.target.value)} className="form-select form-select-sm custom-size-dropdown" aria-label=".form-select-sm example">
                  <option  disabled selected>Size</option>
                  <option value="xsmall">X Small</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">X Large</option>
                </select>
                </div>

                <button id={`cartbtn${product._id}`} disabled={product?.quantity === 0} className="btn btn-success add-to-cart-btn" style={{ borderRadius: "0px" }} onClick={() => handleaddtoCart()}>
                  <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
              </div>
              <div className="description">
                <h4 className='my-3'>About this Item</h4>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Course;