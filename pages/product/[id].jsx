import React, { useContext, useEffect, useState } from 'react'
import ProductComp from "@/components/product/product.jsx"
import context from '@/context/context';
import { useRouter } from 'next/router';
import SecondaryLoading from '../Loading/SecondaryLoading';


const Courses = () => {
  const a = useContext(context)
  const router = useRouter();
  const iploading = a.iploading;
  return (
    <>
      {iploading ?  <div className='BigLoaderContainer'>
        <SecondaryLoading />
      </div>  :
        <>
          <ProductComp id={router.query.id} />
        </>
      }
    </>
  )
}

export default Courses