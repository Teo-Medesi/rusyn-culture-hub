"use client";
import Image from 'next/image';
import { useState } from "react";
import { TextInput } from "../forms";
import { signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { auth, provider } from "@/firebase.config"
import { GoogleButton } from '.';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MouseEvent } from 'react';

const SignIn = ({ logo }: { logo: string }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSignIn = (event: any) => {
    event.preventDefault();

    if (email && password) {
      router.prefetch("/app");

      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        router.push("/app");
      }).catch((error) => {
        setError(error.message);
      });
    }
  }

  // TO-DO: Add Google Sign In with Redirect for Mobile Users! Pop Up is not Prefferable for Mobile!
  const handleGoogleSignIn = (event: any) => {
    event.preventDefault();
    router.prefetch("/app");

    signInWithPopup(auth, provider).then(() => {
      router.push("/app");
    });
  }

  return (
    <div>
      <section className="bg-base-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-base-content"
          >
            <Image
              className="w-12 h-12 mr-2"
              src={logo}
              alt="logo"
            />
          </a>
          <div className="w-full bg-white rounded-lg shadow-sm border border-base-200 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-base-content md:text-2xl">
                Sign in to your account
              </h1>
              <form className="" action="#">
                <TextInput type='email' name='Email' placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} />
                <TextInput type='password' name='Password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                {error && <p className="text-error italic">{error}</p>}

                <div className="flex items-center mt-4 justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <button onClick={(event) => handleSignIn(event)} className="w-full btn mt-4 btn-primary">
                  Sign in
                </button>
                <p className="text-sm mt-4 font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/auth/sign-up"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
                <div className='!h-[1px] bg-gray-500 mt-6 w-full'></div>
                <div className='mt-6 w-full flex justify-center'><GoogleButton onClick={(event) => handleGoogleSignIn(event)} /></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignIn