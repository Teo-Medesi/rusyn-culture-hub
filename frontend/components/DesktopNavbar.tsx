"use client";
import logo from "@/public/logo.svg"
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client"

const UserProfile = ({ src }: { src: string }) => {
  return (
    <>
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="My Profile" src={src || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/800px-Dwayne_Johnson_2014_%28cropped%29.jpg"} />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <Link href="app/users/me" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link href="#">Settings</Link></li>
        <li><Link href="api/auth/logout">Logout</Link></li>
      </ul>
    </>

  )
}

const DesktopNavbar = ({ className }: { className: string }) => {
  const { user, error, isLoading }: any = useUser();

  return (
    <div className={`${className} navbar bg-base-100`}>
      <div className="flex-1">
        <Link href="/" className=""><Image className="w-12 aspect-square" src={logo} alt="logo" /></Link>
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/discover">Discover</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/forum">Forum</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>

        </ul>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <div className="dropdown dropdown-end">
          {
            user
              ?
              <UserProfile src={user?.picture} />
              :
              <Link href="api/auth/login" tabIndex={0} className="btn btn-primary">LOGIN</Link>
          }
        </div>
      </div>
    </div>
  )
}

export default DesktopNavbar