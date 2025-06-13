import "../styles/ACCNAV.css"
import '@/styles/globals.css'
import "../styles/Signin.css"
import "../styles/loading.css"
import "../styles/acc.css"
import "../styles/course.css"
import "../styles/cart.css"
import "../styles/payment.css"
import "../styles/product.css"
import "../styles/order.css"
import "../styles/home.css"
import State from '../context/state'
import Navbar from './Home/Navbar.jsx'
import Footer from './Footer/index'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"
const stripePromise = loadStripe(process.env.NEXT_APP_STRIPE_PUBLISHABLE_KEY);
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Poppins } from 'next/font/google'
import Head from "next/head"
import { Router } from "next/router"
import NProgress from "nprogress";
import "../styles/Nprogress.css";
const poppins = Poppins({ subsets:['devanagari'],weight:["400","100","200","300","500","600","700","800","900"] })
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
// Flags
import "/node_modules/flag-icons/css/flag-icons.min.css";
export default function App({ Component, pageProps }) {
  return <State>
    <GoogleOAuthProvider clientId={process.env.NEXT_APP_GOOGLE_OAUTH_KEY}>
      <main className={poppins.className}>
        <Head>
        <title>Timeless Archives</title>
        </Head>
        <Navbar />
        <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
        <Footer />
        <ToastContainer />
      </main>
    </GoogleOAuthProvider>
  </State>
}
