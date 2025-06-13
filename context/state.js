import React, { useEffect, useState } from 'react';
import context from './context.js';
import moment from 'moment';
import Swal from 'sweetalert2';
import axiosInstance from "../util/axiosInstance.js"
import { toast } from 'react-toastify';
import { useRouter } from 'next/router.js';
const host = process.env.NEXT_APP_HOST

const State = (props) => {
  const [loading, setloading] = useState(false);
  const [loggedIn, setloggedIn] = useState('Loading');
  const [me, setme] = useState({ cartnumber: null });
  const [product, setproduct] = useState({});
  const [hasMoreproducts, sethasMoreproducts] = useState(false);
  const [cart, setcart] = useState({ courses: [], products: [] });
  const [TotalData, setTotalData] = useState(0)
  // navbar
  const [active, setActive] = useState("/home");

  const login = async (data) => {
    const response = await fetch(`${host}/api/user/login`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('secret-login-token', json.token)
      window.location.href = "/"
      return { success: true, message: "none" }
    } else {
      Swal.fire(json.message, "", "error")
      return { success: false, message: json.message }
    }
  }

  const register = async (data) => {
    const response = await fetch(`${host}/api/user/register`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('secret-login-token', json.token)
      return { success: true, message: "none" }
    } else {
      Swal.fire(json.message, "", "error")
      return { success: false, message: json.message }
    }
  }


  const getme = async () => {
    setloading(true);
    if (localStorage.getItem("secret-login-token")) {
      const response = await fetch(`${host}/api/user/getme`, {
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
          "Authentication": localStorage.getItem('secret-login-token')
        }
      });

      const json = await response.json();
      if (json.success) {
        setme(json.user)
        setloggedIn("yes")
      } else {
        Swal.fire(json.message, "", "error")
        localStorage.clear()
        setloggedIn("no")
      }
    } else {
      setloggedIn("no")
    }
    setloading(false)
  };



  const getproducts = async (data, search, category, subcategory) => {
    try {

      const response = await axiosInstance.get(`/api/user/products?limit=${data}&search=${decodeURIComponent(search)}&category=${category}&subcategory=${subcategory}`, data);
      const json = response.data;
      if (json.success) {
        sethasMoreproducts(json.hasMore);
        return json.data
      } else {
        alert(json.message);
        return false
      }
    } catch (error) {
      Swal.fire('Error', error?.response?.data?.message, "error");
    }
    return
  };

  const getProductbyId = async (data, deliverycountry) => {
    try {
      const response = await axiosInstance.get(`/api/user/product/${data}`, data);
      const json = response.data;
      if (json.success) {
        console.log(json)
        setproduct(json.data)
        return true
      } else {
        alert(json.message);
        return false
      }
    } catch (error) {
      Swal.fire('Error', error?.response?.data?.message, "error");
    }
    return
  };


  // cart
  const addToCart = async (data) => {
    try {
      const response = await axiosInstance.post(`/api/cart/`, data);
      const json = response.data;
      if (json?.success) {
        setme((prev) => ({ ...prev, cartnumber: prev.cartnumber + 1 }))
        toast.success("Product added successfully!", {
          theme: "colored"
        })
        return true;
      } else {
        Swal.fire("Error", json.message, "error");
        return false;
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', error?.response?.data?.message, "error");
      return false;
    }
  };

  const removefromcart = async (data, type) => {
    try {
      const response = await axiosInstance.delete(`/api/cart/${data}?type=${type}`);
      const json = response.data;
      if (json?.success) {
        setcart(json.data);
        setTotalData(json.TotalData)
        setme((prev) => ({ ...prev, cartnumber: prev.cartnumber - 1 }))
        toast.success("Item Removed successfully!", {
          theme: "dark",
        })
        return true;
      } else {
        Swal.fire("", json.message, "warning");
        return false;
      }
    } catch (error) {
      Swal.fire('Error', error?.response?.data?.message, "error");
      return false;
    }
  };

  const getcart = async (data) => {
    try {
      const response = await axiosInstance.get(`/api/cart/`, data);
      const json = response.data;
      if (json?.success) {
        setcart(json.data);
        setTotalData(json.data.TotalData)
        return true;
      } else {
        Swal.fire("Error", json.message, "error");
        return false;
      }
    } catch (error) {
      Swal.fire('Error', error?.response?.data?.message, "error");
      return false;
    }
  };

  // Checkout
  const CreateCheckoutSession = async (data) => {
    try {
      const response = await axiosInstance.post(`/api/payments/createcheckoutsession`, data);
      const json = response.data;
      if (json?.success) {
        window.location.href = json.session
        return true;
      } else {
        Swal.fire("Error", json.message, "error").then(() => {
          window.location.reload()
        })
        return false;
      }
    } catch (error) {
      Swal.fire('Error', error?.response?.data?.message, "error").then(() => {
        window.location.reload()
      })
      return false;
    }
  };



  const getorders = async (data) => {
    try {
      const response = await axiosInstance.get(`/api/order`);
      const json = response.data;
      if (json?.success) {
        return json
      } else {
        Swal.fire("Error", json.message, "error");
        return false
      }
    } catch (error) {
      Swal.fire('Error', error?.response?.data?.message, "error");
    }
    return
  };

  const submitcontactform = async (data) => {
    try {
      const response = await axiosInstance.post(`/api/user/contact`, data);
      const json = response.data;
      if (json?.success) {
        toast.success("Form submitted successfully!", {
          theme: "colored"
        });
        setTimeout(() => {
          window.location.reload()
        }, 3000);
        return true;
      } else {
        toast.error(json.message);
        return false;
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', error?.response?.data?.message, "error");
      return false;
    }
  };
  return (
    <context.Provider value={{
      // Order
      getorders,submitcontactform,
      // Items
      getproducts, getProductbyId, product, hasMoreproducts, setproduct,
      // 
      cart, TotalData, addToCart, removefromcart, getcart, CreateCheckoutSession,
      me, getme, setme, loading, setloading, register, login, loggedIn, setloggedIn,
      setActive, active
    }}>
      {props.children}
    </context.Provider>
  );
};

export default State;