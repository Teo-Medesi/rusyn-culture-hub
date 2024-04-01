"use client";
import Image from 'next/image'
import React, { ChangeEvent, useRef, useState } from 'react'
import KnittingBear from "../public/bears/knitting-bear.png"
import KnittingBear2 from "../public/bears/knitting-bear-2.png"
import KnittingBear3 from "../public/bears/knitting-bear-3.png"
import AxeBear from "../public/bears/axe-bear.png"
import AxeBear2 from "../public/bears/axe-bear-2.png"
import FolkloreBear from "../public/bears/folklore-bear.png"
import FolkloreBear2 from "../public/bears/folklore-bear-2.png"
import TractorBear from "../public/bears/tractor-bear.png"
import GuitarBear from "../public/bears/guitar-bear.png"
import GuitarBear2 from "../public/bears/guitar-bear-2.png"
import GuitarBear3 from "../public/bears/guitar-bear-3.png"
import Bear from "../public/bears/bear.png"
import { FaHeart } from "react-icons/fa";
import { db } from '@/firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import { NewsletterUser } from '@/types';

const Home = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const newsletterRef = useRef();

  const handleSubmit = async () => {
    try {
      if (email && name) {

        // TO-DO Validate or preprocess data if needed
        const user: NewsletterUser = {
          name,
          email
        }

        const collectionRef = collection(db, "newsletterUsers");
        const result = await addDoc(collectionRef, user);

        if (result) {
          // UI thing, show success alert
          setIsSubmitted(true);
        }
      }
    } catch (error: any) {
      console.error("Error subscribing to newsletter:", error);
    }
  }

  const scrollToNewsletter = () => {
    if (newsletterRef.current) {
      (newsletterRef.current as Element).scrollIntoView({behavior: "smooth"})
    }
  }

  return (
    <main className='flex flex-col'>
      <div className="h-[90vh] flex flex-col sm:items-center bg-base-100">
        <div className='sm:flex lg:gap-12 sm:justify-center lg:px-24 sm:mt-12 sm:items-center'>
          <Image alt='Bear knitting something' src={KnittingBear} className='w-full sm:shadow-xl sm:rounded-xl sm:rotate-6 sm:w-3/5 lg:w-2/5 xl:w-1/3 aspect-square' />
          <Image alt='Bear knitting something' src={AxeBear2} className='hidden lg:block sm:shadow-xl sm:rounded-xl sm:-rotate-6 lg:w-2/5 xl:w-1/3 aspect-square' />
          <Image alt='Bear knitting something' src={KnittingBear3} className='hidden xl:block sm:shadow-xl sm:rounded-xl sm:rotate-6 xl:w-1/3 aspect-square' />
        </div>
        <div className="px-5 lg:items-center flex flex-col h-[inherit] justify-center">
          <h1 className='text-5xl font-bold mt-5'>Discover Ruthenian Heritage </h1>
          <p className="mt-5">Learn about Ruthenian culture, music, and language.</p>
          <button onClick={scrollToNewsletter} className="mt-5 btn btn-primary text-white w-full lg:w-1/2">Subscribe to Newsletter</button>
        </div>
      </div>
      <div className='min-h-screen h-max'>
        <div className='mt-20'>
          <div className='sm:flex lg:gap-12 sm:justify-center lg:px-24 sm:items-center'>
            <Image alt='Bear knitting something' src={Bear} className='w-full sm:shadow-xl sm:rounded-xl sm:rotate-6 sm:w-3/5 lg:w-2/5 aspect-square' />
            <Image alt='Bear knitting something' src={KnittingBear2} className='hidden lg:block sm:shadow-xl sm:rounded-xl sm:-rotate-6 scale-x-[-1] lg:w-2/5 aspect-square' />
          </div>
          <div className="px-5 lg:items-center flex flex-col">
            <h1 className='text-4xl font-bold mt-5 lg:mt-10 xl:mt-16'>Celebrating Ruthenians!</h1>
            <p className="mt-5">Join our newsletter for updates and insights.</p>
            <button className="mt-5 btn btn-white lg:w-1/2 text-white w-full">Go to About</button>
          </div>
        </div>

        <div className='mt-20'>
          <div className='sm:flex lg:gap-12 sm:justify-center lg:px-24 sm:items-center'>
            <Image alt='Bear knitting something' src={GuitarBear} className='w-full sm:shadow-xl sm:rounded-xl sm:rotate-6 sm:w-3/5 lg:w-2/5 xl:w-1/3 aspect-square' />
            <Image alt='Bear knitting something' src={GuitarBear2} className='hidden lg:block sm:shadow-xl sm:rounded-xl sm:-rotate-6 lg:w-2/5 xl:w-1/3 aspect-square' />
            <Image alt='Bear knitting something' src={GuitarBear3} className='hidden xl:block sm:shadow-xl sm:rounded-xl scale-x-[-1] sm:rotate-6 xl:w-1/3 aspect-square' />
          </div>
          <div className="px-5 lg:items-center flex flex-col">
            <h1 className='text-4xl font-bold mt-5 lg:mt-10 xl:mt-16'>Celebrating Ruthenians!</h1>
            <p className="mt-5">Join our newsletter for updates and insights.</p>
            <button className="mt-5 btn btn-white lg:w-1/2 text-white w-full">Go to About</button>
          </div>
        </div>

        <div className='mt-20'>
          <div className='sm:flex lg:gap-12 sm:justify-center lg:px-24 sm:items-center'>
            <Image alt='Bear knitting something' src={FolkloreBear} className='w-full sm:shadow-xl sm:rounded-xl sm:rotate-6 sm:w-3/5 lg:w-2/5 aspect-square' />
            <Image alt='Bear knitting something' src={FolkloreBear2} className='hidden lg:block sm:shadow-xl sm:rounded-xl sm:-rotate-6 scale-x-[-1] lg:w-2/5 aspect-square' />
          </div>
          <div className="px-5 lg:items-center flex flex-col">
            <h1 className='text-4xl font-bold mt-5 lg:mt-10 xl:mt-16'>Celebrating Ruthenians!</h1>
            <p className="mt-5">Join our newsletter for updates and insights.</p>
            <button className="mt-5 btn btn-white lg:w-1/2 text-white w-full">Go to About</button>
          </div>
        </div>

        <div className='mb-20'>
          <div className='sm:flex lg:gap-12 sm:justify-center lg:px-24 sm:items-center'>
            <Image alt='Bear knitting something' src={TractorBear} className='w-full sm:shadow-xl sm:rounded-xl sm:rotate-6 sm:w-3/5 lg:w-2/5 xl:w-1/3 aspect-square' />
            <Image alt='Bear knitting something' src={TractorBear} className='hidden lg:block sm:shadow-xl sm:rounded-xl sm:-rotate-6 lg:w-2/5 xl:w-1/3 aspect-square' />
            <Image alt='Bear knitting something' src={TractorBear} className='hidden xl:block sm:shadow-xl sm:rounded-xl scale-x-[-1] sm:rotate-6 xl:w-1/3 aspect-square' />
          </div>
          <div className="px-5 lg:items-center flex flex-col">
            <h1 className='text-4xl font-bold mt-5 lg:mt-10 xl:mt-16'>Celebrating Ruthenians!</h1>
            <p className="mt-5">Join our newsletter for updates and insights.</p>
            <button className="mt-5 btn btn-white lg:w-1/2 text-white w-full">Go to About</button>
          </div>
        </div>

        <div ref={newsletterRef} className='h-screen px-5 md:px-20 lg:px-5 bg-primary justify-center flex'>
          {
            !isSubmitted ? (
              <div className='flex w-full lg:w-1/2 justify-center h-full flex-col '>
              <h1 className='lg:text-center text-4xl font-bold  text-white'>Subscribe to our Newsletter!</h1>
              <p className='text-white mb-10 lg:text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  
              <input onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)} type="text" placeholder='Zvonko Kostelnik' className='textarea rounded-none bg-primary border-b border-b-white !text-white placeholder:text-white mb-5' />
              <input onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} type="text" placeholder='example@example.com' className='textarea rounded-none bg-primary border-b border-b-white !text-white placeholder:text-white mb-10' />
              <button onClick={handleSubmit} className='btn w-full'>subscribe</button>
            </div>
            )
            : (
              <div className='flex animate-pulse flex-col items-center justify-center gap-4'>
                <FaHeart className='w-28 h-28 text-white' />
                <h1 className='text-white text-5 xl md:text-6xl'>Thank you!</h1>
              </div>
            )
          }
        </div>
      </div>
    </main>
  )
}

export default Home