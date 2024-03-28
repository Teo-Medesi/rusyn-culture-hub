import Image from 'next/image'
import React from 'react'
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
import PhoneBear from "../public/bears/phone-bear.png"
import Link from 'next/link'

const Home = () => {
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
          <button className="mt-5 btn btn-primary text-white w-full lg:w-1/2">Subscribe to Newsletter</button>
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

        <div className='mt-20'>
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


      </div>
    </main>
  )
}

export default Home