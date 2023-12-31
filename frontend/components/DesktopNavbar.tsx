"use client";
import logo from "@/public/logo.svg"
import Image from "next/image";
import Link from "next/link";
import { User, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { signUserOut } from "@/utils";
import { useEffect } from "react";

const UserProfile = ({ src, handleSignOut }: { src: string | null | undefined, handleSignOut: () => Promise<void> }) => {
  return (
    <>
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="My Profile" src={src || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/800px-Dwayne_Johnson_2014_%28cropped%29.jpg"} />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <Link href="/app/users/me" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link href="#">Settings</Link></li>
        <li><Link href="#" onClick={handleSignOut}>Logout</Link></li>
      </ul>
    </>

  )
}

interface DesktopNavbar {
  className: string;
  user: User | null | undefined;
}

const DesktopNavbar = ({ className, user }: DesktopNavbar) => {

  const handleSignOut = async () => {
    // sign user out on the client
    await signOut(auth);

    // handle user sign out logic on the server
    await signUserOut();
  }

  useEffect(() => {
    console.log("USER EVENT", user)
  }, [user])

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
              <UserProfile handleSignOut={handleSignOut} src={user.photoURL} />
              :
              <Link href="/auth/sign-in" tabIndex={0} className="btn btn-primary">SIGN IN</Link>
          }
        </div>
      </div>
    </div>
  )
}

export default DesktopNavbar