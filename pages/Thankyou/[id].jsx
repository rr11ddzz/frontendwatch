import React, { useContext, useEffect, useState } from 'react';
import styles from "./thankyou.module.css";
import axiosInstance from '@/util/axiosInstance';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import SecondaryLoading from '../Loading/SecondaryLoading';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBTypography,
} from "mdb-react-ui-kit";
import context from '@/context/context';
const Thankyou = () => {
    const [thankyoudata, setThankyouData] = useState(null);
    const [loading, setloading] = useState(true)
    const router = useRouter()
    const id = router.query.id
    const a=useContext(context)
    const getme=a.getme;
    const fetchData = async (id) => {
        try {
            setloading(true);
            let response = await axiosInstance.get(`/api/payments/session/${id}`);
            const json = response.data
            if (json.success) {
                setThankyouData(json.data);
            } else {
                Swal.fire("Error", json.message, "error")
            }
            setloading(false)
        } catch (error) {
            Swal.fire('Error', error?.response?.data?.message, "error");
        }
    };
    useEffect(() => {
        if (id) {
            fetchData(id);
            getme()
        }
    }, [id]);

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
        <div className={`container `}>
            {
                loading ? <div className='bigloadercontainer'>
                    <SecondaryLoading />
                </div> :
                    <div className={styles.thankyoumain}>
                        <div className={styles.information}>
                            <h1 className={styles.banner_text}>Thank you for your purchase</h1>
                            <div className='my-2' style={{ width: "30px", color: "#c4ff43" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 thankyou">
                                    <path strokeLinecap="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div style={{ fontSize: "20px" }}>
                                Payment Successful
                            </div>
                            <div style={{ fontSize: "20px" }}>
                                Reciept # : {thankyoudata?.receiptNumber}
                            </div>
                            <div style={{ marginBottom: "2rem", fontSize: "30px", marginTop: "2rem" }}>

                            </div>
                        </div>
                        <div className={styles.invoice}>
                            <hr className="my-3" />
                            {thankyoudata?.products?.length!==0&& <h3>Products</h3>}

                            {thankyoudata.products?.map((elem, index) => {
                                return <MDBCard background='transparent' key={index} className="mb-3">
                                    <MDBCardBody>
                                        <div className="d-flex justify-content-between">
                                            <div className="cartprodleftcont">
                                                <div className='imgcontainerprod'>
                                                    <MDBCardImage
                                                        src={elem.image ? elem.image : "/Assets/placeholder-image.png"}
                                                        fluid className="rounded-3" 
                                                        alt="Shopping item" />
                                                </div>
                                                <div className="cartprodtitle">
                                                    <MDBTypography tag="h6">
                                                        {truncateString(elem.title)}
                                                    </MDBTypography>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center gap-2">
                                                <span style={{ fontSize: "small" }} className="c-gray">x{elem.quantity} </span>
                                                <div style={{ width: "fit-content" }}>
                                                    <MDBTypography tag="h6" className="mb-0">
                                                    £{elem.price.toFixed(2)}
                                                    </MDBTypography>
                                                </div>
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            })}
                            <div className={styles.row}>
                                <div style={{ borderBottom: "1px solid #8a89898f", marginTop: "7px" }} className={styles["row-content"]}>
                                    <div style={{ marginLeft: "50px", display: "inline-block" }}>Total</div>
                                    <div style={{ float: "right" }}>£{thankyoudata?.totalAmount.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Thankyou;

