import React, { useContext } from 'react'
import OrdersComp from "@/components/account/orders/index"
import NoAuth from '@/components/NoAuth';
import context from '@/context/context';
import Loader from '@/pages/Loading/Loading';


const Cart = () => {
  const a = useContext(context)
  const loggedIn = a.loggedIn;
  return (
    <>
      {loggedIn === "Loading" ? <Loader /> :
        <>
          {loggedIn === "yes" ?
            <OrdersComp /> : <NoAuth />}
        </>

      }
    </>
  )
}

export default Cart