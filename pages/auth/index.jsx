"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import Loader from '../Loading/Loading';
import context from '@/context/context';
import Link from 'next/link';

const Index = () => {
    const a = useContext(context);
    const register = a.register;
    const loginuser = a.login;
    const [FormData, setFormData] = useState({
        country: ""
    })
    const [btnLoading, setbtnLoading] = useState(false)
    const [authType, setauthType] = useState("login");
    const containerRef = useRef(null);  // Create a ref to hold the container element

    useEffect(() => {
        containerRef.current = document.getElementById('container');

    }, [])
    
  
    const handleSigninSubmit = async (e) => {
        e.preventDefault();
        setbtnLoading(true);
        await loginuser(FormData)
        setbtnLoading(false);
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setbtnLoading(true)
        const response = await register(FormData);
        setbtnLoading(false);
        if (response.success) {
            window.location.href = "/"
        }
    };
    const handledataChange = (e) => {
        setFormData({
            ...FormData, [e.target.name]: e.target.value
        })
    }
    return (
        <div className='color-black '>
         <>
              <div className={`authcontainer authpage`} id="container">
                    <div className={`form-container ${authType === "signup" ? "activeMobile" : "notactiveMobile"} sign-up-container`}>
                        <form className="auth-form" onSubmit={handleSignupSubmit}>
                            <h1 >Create Account</h1>
                           
                            <input value={FormData.name} onChange={handledataChange} name='name' type="text" placeholder="Name" required />
                            <input value={FormData.email} onChange={handledataChange} name='email' type="email" placeholder="Email" required />
                            <input value={FormData.password} onChange={handledataChange} name='password' type="password" placeholder="Password" required />
                            <p className='mobile-auth-btns mt-1 mb-3'>Already Have an Account? <a className='changeauthtypelink' onClick={() => setauthType("login")} href="#login">Login</a></p>
                            <button disabled={btnLoading} className='btn btn-main'> {btnLoading ? "Loading..." : "Sign Up"}</button>
                        </form>
                    </div>
                    <div className={`form-container ${authType === "login" ? "activeMobile" : "notactiveMobile"}  sign-in-container`}>
                        <form className="auth-form" onSubmit={handleSigninSubmit}>
                            <h1>Sign in</h1>
                            
                            <input value={FormData.email} onChange={handledataChange} name='email' type="email" placeholder="Email" required />
                            <input value={FormData.password} onChange={handledataChange} name='password' type="password" placeholder="Password" required />
                            <p className='mobile-auth-btns mt-1 mb-3' >Not a User? <a onClick={() => setauthType("signup")} className='changeauthtypelink' href="#signup">Signup</a></p>
                            <button className='btn btn-main' disabled={btnLoading}> {btnLoading ? "Loading..." : "Sign In"}</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost btn" id="signIn" onClick={() => containerRef.current?.classList.remove("right-panel-active")}> Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost btn" id="signUp" onClick={() => {
                                    console.log(containerRef.current)
                                    containerRef.current?.classList.add("right-panel-active")
                                }}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Index