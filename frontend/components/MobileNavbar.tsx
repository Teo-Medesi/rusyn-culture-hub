import React from 'react'
import { IoMdMenu } from "react-icons/io";

const MobileNavbar = ({ className }: {className: string}) => {
  return (
    <div className={`${className} px-5 h-[10vh] flex justify-between items-center`}>
      <p className='text-xl font-bold'>Ruthenia</p>
      <IoMdMenu className='w-8 h-8' />
    </div>
  )
}

export default MobileNavbar