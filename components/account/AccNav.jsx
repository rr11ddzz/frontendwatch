import React, { useState } from 'react';
import Link  from "next/link";
import Image from "next/image";

const ACCNAV = ({ name, email, profileimg, role, balance,active,setActive}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
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


  return (
    <div className="acc-nav-container">
      <div onClick={handleToggle} className={`cursor-pointer`}>
        <div className="profileimg">
          <Image style={{background:"white"}} src={profileimg ? profileimg : '/avatar.png'} width={150} height={150} alt='Avatar' />
        </div>
        <span className={`${balance ? "balance" : "d-none"}`}>{balance}</span>
      </div>
      {isOpen && (
        <div className="acc-nav-menu rounded-xl bg-black-gradient">
          <div className={`accnav`}>
            <div className="profileimg">
              <Image style={{background:"white"}} src={profileimg ? profileimg : '/avatar.png'} width={150} height={150} alt='Avatar' />
            </div>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              <div>{name}</div>
              <small className={"email"}>{truncateString(email)}</small>
            </div>
          </div>
          {/* Navigation links */}
          <ul className="nav-links">
            <hr />
            <li className={` ${active === `/account/orders` ? "text-white" : "text-dimWhite"}`} >
              <Link className="acc-details-li" onClick={(e) => {
                setActive(`/account/orders`)
              }} href={`/account/orders`}>Orders</Link>
            </li>
            <li className={`acc-details-li text-dimWhite`} onClick={() => {
              localStorage.clear();
              window.location.href = "/"
            }}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ACCNAV;
