"use client";
import { auth } from '@/firebase.config';
import { signOut, User } from 'firebase/auth';
import Link from 'next/link'

const UserInfo = ({ user }: { user: User }) => {
  const handleLogout = async () => {
    await signOut(auth);
  }
  
  return (
    <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 md:shadow-lg md:shadow-shadowLight rounded-xl mt-16">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative flex justify-center lg:block">
              <img
                src={user?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/800px-Dwayne_Johnson_2014_%28cropped%29.jpg"}
                className="shadow-xl rounded-full align-middle border-none lg:absolute lg:-m-16 md:ml-20 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>
          <div className="hidden w-full text-center mt-20">

                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    0
                  </span>
                  <span className="text-sm text-slate-400">Posts</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    0
                  </span>
                  <span className="text-sm text-slate-400">Followers</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    0
                  </span>
                  <span className="text-sm text-slate-400">Following</span>
                </div>
              </div>
              
          </div>
        </div>
        <div className="text-center mt-20">
          <h3 className="text-xl lg:text-2xl text-slate-700 font-bold leading-normal mb-1">
            {user?.name || user.email}
          </h3>
          <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75" />
            {user?.location || "location unspecified"}
          </div>
        </div>
        <div className="mt-6 py-6 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <p className="font-light leading-relaxed text-slate-600 mb-4">
                {user?.description || "No description added."}
              </p>
              <div className='flex flex-col items-center gap-4 justify-center'>
                <Link href="/app/users/me/posts/create-new"
                  className="btn-primary w-full md:rounded-md md:!w-1/2  !uppercase font-normal btn mb-3 md:mb-0"
                >
                  new song post
                </Link>
                <Link href="/app/users/me/blogPosts/create-new"
                  className="btn-primary w-full md:rounded-md md:!w-1/2  btn-outline mb-3 !uppercase font-normal btn"
                >
                  new blog post
                </Link>
              </div>
                <button onClick={handleLogout} className='btn btn-neutral !w-full md:!w-1/2  md:rounded-md md:hidden !uppercase mt-3 md:mt-0'>SIGN OUT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo