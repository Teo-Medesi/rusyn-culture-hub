"use client";
import Link from 'next/link';
import { useState } from 'react';
import { IoMdMenu, IoMdClose } from 'react-icons/io';

const MobileNavbar = ({ className }: {className: string}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <div className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 ${className}`}>
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <p className='text-xl font-bold'>Ruthenia</p>
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? (
            <IoMdClose className='w-6 h-6' />
          ) : (
            <IoMdMenu className='w-6 h-6' />
          )}
        </div>
      </div>
      <div className={`absolute top-16 left-0 w-full bg-white shadow-md ${menuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <ul className="flex flex-col py-2">
          <Link onClick={toggleMenu} href="/app" className="px-4 py-2 transition-all duration-300 ease-in-out hover:bg-gray-100">Home</Link>
          <Link onClick={toggleMenu} href="/app/discover" className="px-4 py-2 transition-all duration-300 ease-in-out hover:bg-gray-100">Discover</Link>
          <Link onClick={toggleMenu} href="/app/blog" className="px-4 py-2 transition-all duration-300 ease-in-out hover:bg-gray-100">Blog</Link>
          <Link onClick={toggleMenu} href="/app/about" className="px-4 py-2 transition-all duration-300 ease-in-out hover:bg-gray-100">About</Link>
          <Link onClick={toggleMenu} href="/app/contact" className="px-4 py-2 transition-all duration-300 ease-in-out hover:bg-gray-100">Contact</Link>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
