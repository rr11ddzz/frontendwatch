import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import context from "@/context/context";
import Link from "next/link";

export default function Basic() {
    const a = useContext(context);
    const CreateCheckoutSession = a.CreateCheckoutSession;
    const cartcourses = a.cart.courses;
    const cartproducts = a.cart.products;
    const cart = a.cart;
    const TotalData = a.TotalData;
    const getcart = a.getcart;
    const removefromcart = a.removefromcart;
    const [cartproductsloading, setcartproductsloading] = useState(false);
    const [DeliveryAddress, setDeliveryAddress] = useState("");
    let disabled = (!cart?.products || cart.products.length === 0)||!DeliveryAddress;

    const getdata = async () => {
        setcartproductsloading(true);
        await getcart();
        setcartproductsloading(false);
    }

    useEffect(() => {
        getdata();
    }, []);

    function truncateString(inputString) {
        console.log(window.innerWidth)
        const lenghtaccordtowindow = window.innerWidth < 770 ? 40 : (window.innerWidth > 1320 ? 70 : 50)
        if (typeof inputString === 'string') {
            if (inputString.length > lenghtaccordtowindow) {
                return inputString.slice(0, lenghtaccordtowindow) + '...';
            } else {
                return inputString;
            }
        } else {
            return inputString;
        }
    }

    return (
        <section className="h-100 cart-page" style={{ backgroundColor: "#eee" }}>
            <div className="py-3 h-100 main-container">
                <MDBRow className="justify-content-center align-items-center h-100 m-0">
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody className="p-4">
                                <MDBRow>
                                    <MDBCol lg="7">
                                        <MDBTypography tag="h5">
                                            <Link href="/" className="text-body">
                                                <MDBIcon fas icon="long-arrow-alt-left me-2" />Continue
                                                shopping
                                            </Link>
                                        </MDBTypography>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <p className="mb-1">Shopping cart</p>
                                                <p className="mb-0">You have {(cartcourses?.length || 0) + (cartproducts?.length || 0)} items in your cart</p>
                                            </div>
                                        </div>

                                        {cartproductsloading ?
                                            <div className="spinner-border d-block mx-auto" style={{color:"#c4ff43", width: "3rem", height: "3rem", marginTop: "100px", marginBottom: "100px" }} role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div> :
                                            <>
                                                <hr className="my-3" />
                                                <h3>Products</h3>
                                                {cartproducts?.map((elem, index) => {
                                                    return <MDBCard key={index} className="mb-3">
                                                        <MDBCardBody>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="cartprodleftcont">
                                                                    <div>
                                                                        <MDBCardImage
                                                                            src={elem.image ? elem.image : "/Assets/placeholder-image.png"}
                                                                            fluid className="rounded-3" style={{ width: "65px" }}
                                                                            alt="Shopping item" />
                                                                    </div>
                                                                    <div className="cartprodtitle">
                                                                        <MDBTypography tag="h6">
                                                                            {truncateString(elem.title)}
                                                                        </MDBTypography>
                                                                        <small>{elem.size}</small>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row align-items-center gap-2">
                                                                    <span style={{ fontSize: "small" }} className="c-gray">x{elem.quantity} </span>
                                                                    <div style={{ width: "fit-content" }}>
                                                                        <MDBTypography tag="h6" className="mb-0">
                                                                        £{elem.price.toFixed(2)}
                                                                        </MDBTypography>
                                                                    </div>
                                                                    <button id={`removebtn${elem._id}`} onClick={async () => {
                                                                        var removebtn = document.getElementById(`removebtn${elem._id}`);
                                                                        removebtn.disabled = true;
                                                                        await removefromcart(elem._id, "product");
                                                                        removebtn.disabled = false;
                                                                    }} style={{ color: "#cecece" }}>
                                                                        <MDBIcon fas icon="trash-alt" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            
                                                            
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                })}
                                            </>}

                                    </MDBCol>

                                    <MDBCol lg="5">
                                        <MDBCard className="bg-cart text-white rounded-3">
                                            <MDBCardBody>
                                               
                                                    <div className='p-1'>
                                                        
                                                        <h3 className='add-method-heading mb-3'>Checkout</h3>
                                                        <div className="deliveryAddress">
                                                            <textarea value={DeliveryAddress} onChange={(e)=>setDeliveryAddress(e.target.value)} placeholder="Enter Your Delivery Address" name="address"cols="30" rows="4"></textarea>
                                                        </div>
                                                        <div className='add-payment-method my-3'>
                                                            <p className="small">Supported Payment Methods</p>
                                                            <div className="methods d-flex gap-2 align-items-center">
                                                                <div>
                                                                    <img height={50} src="/Assets/bank.svg" alt="Bank" />
                                                                </div>
                                                                <div>
                                                                    <img height={50} width={50} src="/Assets/mastercard.png" alt="Bank" />
                                                                </div>
                                                                <div>
                                                                    <img height={50} width={50} src="/Assets/visa.png" alt="Bank" />
                                                                </div>
                                                                <div>
                                                                    <img height={50} width={50} src="/Assets/amex.png" alt="Bank" />
                                                                </div>
                                                                <div>
                                                                    <img height={50} width={50} src="/Assets/discover.png" alt="Card" />
                                                                </div>
                                                            </div>
                                                            <button onClick={async () => {
                                                                const btn = document.getElementById("checkout")
                                                                btn.innerText = "Loading...";
                                                                btn.disabled=true
                                                                await CreateCheckoutSession({DeliveryAddress})
                                                                btn.disabled=false
                                                                btn.innerText = "Goto Checkout"
                                                            }} style={{ marginLeft: "auto", width: "max-content", display: "block", background: "black" }} id='checkout' className='btn btn-dark' disabled={disabled } >Goto Checkout</button>
                                                        </div>
                                                    </div>

                                                <hr />

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Subtotal</p>
                                                    <p className="mb-2">£{TotalData.subtotal}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Service Fee</p>
                                                    <p className="mb-2">£{TotalData.servicefee} (0%)</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Total(Incl. taxes)</p>
                                                    <p className="mb-2">£{TotalData.total}</p>
                                                </div>

                                                <button id="confirmcartbuybtn" onClick={async () => {
                                                                const btn = document.getElementById("checkout")
                                                                btn.innerText = "Loading...";
                                                                btn.disabled=true
                                                                await CreateCheckoutSession({DeliveryAddress})
                                                                btn.disabled=false
                                                                btn.innerText = "Goto Checkout"
                                                            }} disabled={disabled } style={{ display: "block", width: "max-content", marginLeft: "auto" }} className="btn btn-dark mt-2">
                                                    <div className="d-flex justify-content-between gap-2 fw-bold">
                                                        <span>£{TotalData.total}</span>
                                                        <span className="d-flex flex-wrap">
                                                            Confirm{" "}
                                                            <i className="fas fa-long-arrow-alt-right ms-2 m-auto"></i>
                                                        </span>
                                                    </div>
                                                </button>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        </section>
    );
}
