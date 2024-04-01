"use client";
import { auth } from "@/firebase.config";
import logo from "@/public/logo.svg"
import Image from "next/image";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const UserProfile = () => {
  const { user, isLoading } = useUser();

  const handleLogout = async () => {
    await signOut(auth);
  }

  if (isLoading) {
    return <div className="h-full p-4 flex items-center"><div className="loading-spinner loading "></div></div>
  }
  else if (user) {
    return (
      <>
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="My Profile" src={user?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/800px-Dwayne_Johnson_2014_%28cropped%29.jpg"} />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <Link href="/app/users/me" className="justify-between">
              Profile
            </Link>
          </li>
          <li><Link href="#">Settings</Link></li>
          <li><Link href="#" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </>
    )
  }
  else {
    return <Link href="/auth/sign-in" tabIndex={0} className="btn btn-primary">SIGN IN</Link>
  }

}

const DesktopNavbar = ({ className }: { className: string }) => {


  return (
    <div className={`${className} navbar bg-base-100`}>
      <div className="flex-1">
        <Link href="/" className=""><Image className="w-8 mr-2 aspect-square" src={logo} alt="logo" /></Link>
        <p className='text-2xl font-bold'>Ruthenia</p>
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/app/">Home</Link>
          </li>
          <li>
            <Link href="/app/discover">Discover</Link>
          </li>
          <li>
            <Link href="/app/blog">Blog</Link>
          </li>
          <li>
            <Link href="/app/about">About</Link>
          </li>
          <li>
            <Link href="/app/contact">Contact</Link>
          </li>

        </ul>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <div className="dropdown dropdown-end">
          <UserProfile />
        </div>
      </div>
    </div>
  )
}

export default DesktopNavbar