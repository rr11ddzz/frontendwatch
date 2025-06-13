
import React, { useContext } from 'react'
import CartComp from "@/components/account/cart"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import NoAuth from '@/components/NoAuth';
import context from '@/context/context';
import Loader from '../Loading/Loading';

const stripePromise = loadStripe(process.env.NEXT_APP_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
    const a = useContext(context)
    const loggedIn = a.loggedIn;
    return (
        <>
            {loggedIn === "Loading" ? <Loader /> :
                <>
                    {loggedIn === "yes" ?
                        <Elements stripe={stripePromise}>
                            <CartComp />
                        </Elements> : <NoAuth />}
                </>

            }
        </>
    )
}

export default Cart