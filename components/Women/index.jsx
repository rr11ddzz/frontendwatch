import React, { useContext, useEffect, useState } from 'react';
import context from '@/context/context.js';
import ProductCard from "../product/ProductCard.jsx";
import { useRouter } from 'next/router';
import { Box, Skeleton } from '@mui/material';
import categories from "./subcategories.json"

const Courses = () => {
  const a = useContext(context);
  const getproducts = a.getproducts;
  const [products, setproducts] = useState([])
  const hasMore = a.hasMoreproducts;
  const [skip, setskip] = useState(0);
  const [dataloading, setdataloading] = useState(false);
  const router = useRouter();
  const [categoryFilter, setcategoryFilter] = useState('casual')
  const [searchQuery, setsearchQuery] = useState('')
  const getdata = async (enter) => {
    setdataloading(true);
    const params = new URLSearchParams(window.location.search);
    let q = params.get('q') || '';
    let category = params.get('category') || '';
    if (!enter) {
      setsearchQuery(q);
    } else {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, q: searchQuery,category },
      });
      q = searchQuery;
      setskip(0)
    }
    setcategoryFilter(category);
    const resdata = await getproducts(0, q,'women',category);
    if (resdata) {
      setproducts(resdata)
    }
    setdataloading(false);
  };

  useEffect(() => {
    getdata();
  }, []);

  const fetchMoreData = async () => {
    const button = document.getElementById("LoadMore");
    button.innerText = "Loading...";
    button.disabled = true;
    const newskip = skip + 9;
    setskip(newskip);
    const resdata = await getproducts(newskip, searchQuery,'women',categoryFilter);
    if (resdata) {
      setproducts((prev) => [...prev, ...resdata])
    }
    button.innerText = "Load More";
    button.disabled = false;
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setsearchQuery(value);
  };

  const handleCategorySelect = async (category) => {
    setcategoryFilter(category);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, category: category },
    }).then(() => {
      getdata("enter")
    })
  };

  return (
    <>
      <div className='top-row-courses' style={{ position: "relative" }}>
      <div className='ml-4'>
          <h4 className='filterHead mt-2'>Filter <i className="fa-solid mx-1 fa-filter"></i></h4>
          <div className="categoriesFilter ">
            {
              categories.length !== 0 ?
                (categories.map((elem, index) => {
                  return <div key={index} className="categoriesHover" >
                    <div className="filter-dropdown" >
                      <button onClick={()=>handleCategorySelect(elem)} className={`filter-dropdown-toggle ${elem===categoryFilter&&'active'}`}>
                        {elem} 
                      </button>
                      {
                        elem===categoryFilter&&<i onClick={()=>handleCategorySelect('')} className="fa-solid fa-sm fa-xmark pointer"></i>
                      }
                    </div>
                  </div>
                })) : "No Results"
            }
          </div>
        </div>
        <div className="search-container mr-3 mb-2">
          <input
            onKeyDown={(e) => { if (e.key === "Enter") { getdata('enter') } }}
            value={searchQuery}
            onChange={handleSearchChange}
            type="text"
            name='q'
            className="search-input"
            placeholder="Search..."
          />
          <button onClick={() => getdata("enter")} className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div style={{ marginTop: "0" }} className='main-container'>
        <h2 className='my-3 querytitle'>{!router.query.q ? "Best Selling" : `Results for ${router.query.q}`}</h2>
        {dataloading ?<div className='products mt-3'>
          {
            Array.from(new Array(10)).map((elem,index) => {
              return <div key={index} style={{ maxWidth: "400px" }}>
                <Skeleton variant="rectangular" className='imgcover' style={{ background: "rgba(255, 255, 255, 0.1)", position: "relative", maxWidth: "400px" }} width={'100%'} height={"auto"} />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton style={{ background: "rgba(255, 255, 255, 0.1)" }} />
                  <Skeleton width="60%" style={{ background: "rgba(255, 255, 255, 0.1)" }} />
                </Box>
              </div>
            })
          }
        </div>:
          <>
            <div className='products mt-3'>
              {products?.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
            {hasMore ? <div style={{ width: "200px" }} className='mx-auto'><button onClick={fetchMoreData} id='LoadMore' className='btn btn-info'>Load More</button></div>
              : ""}
          </>
        }
      </div>
    </>
  );
};

export default Courses;
