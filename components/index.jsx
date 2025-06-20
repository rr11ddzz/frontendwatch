import React from 'react'

const Home = () => {
  return (
    <div className='container '>
      <div className="hero-container gap-2">
        <div className="text-content my-4">
          <h1 className=' '>Discover limited <span className='main-color'>watches</span> without limitation</h1>
          <p style={{ color: "#989898" }}>We'ev been offering the best level of timeless style and attention to detail for years</p>
          <div className='my-3'>
            <button className='home-btn' onClick={()=>window.location.href="/men"}>Shop now <i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
        <div className="image-content">
          <img src="/LandingPage/section1.png" alt="" />
        </div>
      </div>
      <div className="featuredCards mt-5">
        <div className="featuredCard">
          <div className="top-row"><div className='top-row-text'>Richard millie black Oak</div><i className="fa-solid fa-arrow-right top-row-icon"></i></div>
          <div className="featuredCard-image">
            <img src="/LandingPage/card1.png" alt="" />
          </div>
        </div>
        {/*  */}
        <div className="featuredCard">
          <div className="top-row"><div className='top-row-text'>Rolex Submariner Hulk</div><i className="fa-solid fa-arrow-right top-row-icon"></i></div>
          <div className="featuredCard-image">
            <img src="/LandingPage/card2.png" alt="" />
          </div>
        </div>
        {/*  */}
        <div className="featuredCard">
          <div className="top-row"><div className='top-row-text'>Cartier Skeleton</div><i className="fa-solid fa-arrow-right top-row-icon"></i></div>
          <div className="featuredCard-image">
            <img src="/LandingPage/card3.png" alt="" />
          </div>
        </div>
      </div>
      <div className=" mt-5">
        <h1 style={{borderBottom:"1px solid",padding:"10px"}}>Our Testimonials</h1>
        <div className='testimonails mt-5'>
          <div className="testimonial">
            <div className="testimonial-content">         
             <i class="fa-solid fa-quote-left fa-2xl"></i> <br />
             Timeless Archives made finding the perfect watches a breeze! With their extensive selection and easy-to-use platform, I found my dream piece in minutes. Plus, their fast shipping is unbeatable!
=            </div>
            <div className="testimonial-userdetails">
              <h5>Emily S.</h5>
              <p>Ceo Of Google</p>
              <p>March 2024</p>
            </div>
          </div>
          <div className="testimonial testimonial-2">
            <div className="testimonial-content">         
             <i class="fa-solid fa-quote-left fa-2xl"></i> <br />
             I'm impressed by the personalized recommendations and seamless checkout process at Timeless Archives. The whole experience was smooth, and my watch arrived quickly and fit perfectly!
=            </div>
            <div className="testimonial-userdetails">
              <h5>Mark T.</h5>
              <p>Ceo Of Amazon</p>
              <p>January 2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
