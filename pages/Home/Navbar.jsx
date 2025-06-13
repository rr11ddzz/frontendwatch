"use client"
import { useContext, useEffect, useState } from "react";
// import { close, logo, menu } from "@/public/Assets/index";
import context from '@/context/context.js';
import Link from "next/link";
import ACCNAV from "@/components/account/AccNav.jsx";
import { useRouter } from "next/router";
import { styles } from "@/util/style";
import Image from "next/image";
import { Fade as Hamburger } from 'hamburger-react'
const { getName } = require('country-list');
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const a = useContext(context);
  const getme = a.getme;
  const active=a.active;
  const setActive=a.setActive;
  const me = a.me;
  const loggedIn = a.loggedIn;
  const router = useRouter(); // Use the useRouter hook
  useEffect(() => {
    if (router.pathname !== "/") {
      setActive(router.pathname);
    }
    getme();
  }, []);

 
  
  function truncateString(inputString) {
    if (typeof inputString === 'string') {
      if (inputString.length > 15) {
        return inputString.slice(0, 15) + '...';
      } else {
        return inputString;
      }
    } else {
      return inputString;
    }
  }

  const navLinks = [
    {
      link: "",
      title: "Home",
    },
    {
      link: "men",
      title: "Men",
    },
    {
      link: "women",
      title: "Women",
    },
    {
      link: "kids",
      title: "Kids",
    },
    {
      link: "about",
      title: "About",
    },
    {
      link: "contact",
      title: "Contact",
    }
  ];
  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <nav className="w-full flex py-3 justify-between items-center navbar">
          <div className="d-flex flex-wrap align-items-center gap-1">
            <Link onClick={(e) => {
              setActive('home')
            }} href={"/"}>
              <img src={"/logo.png"} alt="hoobank" className="w-[100px] navbar-logo" />
            </Link>
          </div>

          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            {navLinks.map((nav, index) => (
              <li
                key={index}
                className={` mr-5 font-normal cursor-pointer text-[16px] ${active === `/${nav.title.toLowerCase()}` ? "text-white" : "text-dimWhite"
                  } `}
              >
                <Link className="text-inherit" onClick={(e) => {
                  setActive(`/${nav.title.toLowerCase()}`)
                }} href={`/${nav.link}`}>{nav.title}</Link>
              </li>
            ))}
            {
              loggedIn === "no" ? <>
                <li className={` font-normal cursor-pointer text-[16px] ${active === "auth" ? "text-white" : "text-dimWhite"
                  }`}
                >
                  <Link href="/auth" onClick={(e) => {
                    setActive("auth")
                  }} className="text-inherit" >
                    Sign In
                  </Link>
                </li>
              </>
                : <li className={` font-normal mr-5 cursor-pointer text-[16px] ${router.pathname === "/account/cart" ? "text-white" : "text-dimWhite"
                  }`}
                >
                  <Link className="text-inherit" onClick={(e) => {
                    setActive('/account/cart')
                  }} href="/account/cart">
                    <i className="fa-sharp fa-lg fa-solid fa-cart-shopping"></i>({me.cartnumber ? me.cartnumber : 0})
                  </Link>
                </li>
            }
            {
              loggedIn === "yes" ?
                <ACCNAV active={active} setActive={setActive} name={me?.name} role={me?.role} email={me?.email} profileimg={me?.profile_img?.url} /> : ""
            }
          </ul>

          <div style={{ zIndex: "10" }} className="sm:hidden flex flex-1 justify-end items-center acc-nav-container ">
            <Hamburger type="tilt" toggled={toggle} toggle={setToggle} />

            {toggle && (
              <div className="acc-nav-menu rounded-xl bg-black-gradient">
                {loggedIn === "yes" ? <div className={`accnav`}>
                  <div className="profileimg">
                    <Image style={{ background: "white" }} src={me.profile_img?.url ? me.profile_img.url : '/avatar.png'} width={150} height={150} alt='Avatar' />
                  </div>
                  <div style={{ display: 'flex', flexDirection: "column" }}>
                    <div>{me.name}</div>
                    <small className={"email"}>{truncateString(me.email)}</small>
                  </div>
                </div> : ""}
                {/* Navigation links */}
                <ul className="nav-links">
                  {loggedIn === "no" ?
                    <li className={` ${active === 'home' ? "text-white" : "text-dimWhite"}`} >
                      <Link className="acc-details-li" onClick={(e) => {
                        setActive('home')
                      }} href="/">Home</Link>
                    </li>
                    : ""}
                  {loggedIn === "yes" ?
                    <>
                      <li className={` ${active === "/account/cart" ? "text-white" : "text-dimWhite"}`} >
                        <Link className="acc-details-li" onClick={(e) => {
                          setActive('/account/cart')
                        }} href="/account/cart"><i className="fa-sharp fa-lg fa-solid fa-cart-shopping"></i> Cart ({me.cartnumber ? me.cartnumber : 0})</Link>
                      </li>
                      <li className={` ${active === "/account/orders" ? "text-white" : "text-dimWhite"}`} >
                        <Link className="acc-details-li" onClick={(e) => {
                          setActive('/account/orders')
                        }} href="/account/orders">Order</Link>
                      </li>
                      <hr />
                      <hr />
                      <li className={`acc-details-li text-dimWhite`} onClick={() => {
                        localStorage.clear();
                        window.location.href = '/'
                      }}>Logout</li>
                    </>
                    : <li className={`acc-details-li ${active === "/auth" ? "text-white" : "text-dimWhite"}`} >
                      <Link onClick={(e) => {
                        setActive('/auth')
                      }} href="/auth">Login & Register</Link>
                    </li>}
                </ul>
              </div>
            )}

          </div>
        </nav >
      </div>
    </div>
  );
};

export default Navbar;
