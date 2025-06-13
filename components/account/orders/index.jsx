import React, { useContext, useEffect, useState } from 'react';
import Loader from '@/pages/Loading/Loading';
import context from '@/context/context';
import { useRouter } from "next/router";
import { ArrowForwardIos } from '@mui/icons-material';
import Link from 'next/link';

const OrdersPage = () => {
  const a = useContext(context);
  const router = useRouter()
  const getalldata = a.getorders;
  const setActive=a.setActive;
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getdata = async () => {
      setloading(true)
      console.log(orders)
      const response = await getalldata();
      if (response?.success) {
        setorders(response.data)
      }
      setloading(false)
    }
    getdata()
  }, []);

  const getShippingPrice = (SelectedShippingpolicy, quantity) => {
    // Calculate total shipping charges
    if (!SelectedShippingpolicy) {
      return 0
    }
    let totalShippingCharges = 0;
    if (!SelectedShippingpolicy.isFreeDelivery) {
      totalShippingCharges = SelectedShippingpolicy.deliveryCharge || 0; // Delivery charge for the first item
      if (quantity > 1) {
        // Add additional charges for each extra item
        totalShippingCharges += (quantity - 1) * (SelectedShippingpolicy.additionalCharge || 0);
      }
    }
    return totalShippingCharges?.toFixed(2);
  }

  const convertToESTtime = (dateStr) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <div className='accpages'>
      {loading ? <Loader /> :
        <div className='acc-content'>
           <div className='PagesNav my-3' >
              <Link onClick={() => setActive('/home')} href={'/'} className="">
                Your Account<ArrowForwardIos fontSize='10px' className='m-1' />
              </Link>
              <span className="c-light-main">
                Orders
              </span>
            </div>
          <h2 className="my-3 text-center">All Orders</h2>
          <div className="table-responsive">
            <table className='custom-table' style={{ color: "white" }} >
              <thead>
                <tr className="tableHeadrow">
                  <th>Product</th>
                  <th>Charge Summary</th>
                  <th>Status</th>
                  <th>Fulfillment Schedule</th>
                  <th>Delivery Address</th>
                  <th>Ordered At</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td data-label='Product'>
                      <div className='OrderDataDetails'>
                        <div className="imgcontainerprod">
                          <img src={order.product.image} alt='Image of product' />
                        </div>
                        <div className='d-flex flex-column OrderTextDetails' style={{ fontSize: "14px" }}>
                          <a target='_blank' href={`/product/${order.product.productid}`}>{order.product.title}</a>
                          <span><span className="c-gray">Price : </span> £{order.product.price}</span>
                          <span><span className="c-gray">Size : </span> {order.product.size}</span>
                        </div>
                      </div>
                    </td>
                    <td data-label='Charge Summary'>
                      <div className='d-flex flex-column gap-1'>
                        <div className='small' style={{ minWidth: "200px" }} ><span className='font-medium c-gray'>Product Cost:</span> £{(order.product?.price * order.product?.quantity)?.toFixed(2)}</div>
                        <div className='small' style={{ minWidth: "200px" }} ><span className='font-medium c-gray'>Delivery Fee:</span> £{getShippingPrice(order.product?.SelectedShippingpolicy, order.product.quantity)}</div>
                        <div className='small' style={{ minWidth: "200px" }} ><span className='font-medium c-gray'>Units:</span> {order.product.quantity}</div>
                      </div>
                    </td>
                    <td data-label='Status'>
                      <div className={`status ${order.status}`}>
                        {order.status.toUpperCase()}
                      </div>
                    </td>
                    <td data-label='Schedule'>
                      <div>
                          <><span className='font-medium c-gray small'>Estimated Delivery: </span> <br /> <small>{convertToESTtime(order.DeliveryDate)}</small></>
                      </div>
                    </td>
                    <td data-label='Delivery Address'><small>{order.DeliveryAddress}</small></td>
                    <td data-label='Ordered At'><small>{convertToESTtime(order.createdAt)}</small></td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
};

export default OrdersPage;
