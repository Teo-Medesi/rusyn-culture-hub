"use client";
import Image from 'next/image';
import { ChangeEvent, useState } from "react";
import { TextInput } from "../forms";
import { createUserWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { auth, provider } from "@/firebase.config"
import { GoogleButton } from '.';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MouseEvent } from 'react';

const SignUp = ({ logo }: { logo: string }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSignUp = (event: any) => {
    event.preventDefault();

    if (email && password) {
      router.prefetch("/app");

      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        router.push("/app")
      })
        .catch((error) => {
          setError(error.message);
        });

    }
  }

  // TO-DO: Add Google Sign In with Redirect for Mobile Users! Pop Up is not Prefferable for Mobile!
  const handleGoogleSignIn = () => {
    router.prefetch("/app");

    signInWithPopup(auth, provider).then(() => {
      router.push("/app");
    });
  }

  return (
    <div>
      <section className="bg-base-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div className="w-full bg-white rounded-lg shadow-sm border border-base-200 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-base-content md:text-2xl">
                Sign Up
              </h1>
              <form className="" action="#">
                <TextInput type='email' name='Email' placeholder="name@company.com" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <TextInput type='password' name='Password' placeholder="Password" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />

                {error && <p className="text-error italic">{error}</p>}

                <div className="flex items-center mt-4 justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                       
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
                <button onClick={(event) => handleSignUp(event)} className="w-full btn mt-4 btn-primary">
                  Sign Up
                </button>
                <p className="text-sm mt-4 font-light text-gray-500">
                  Already have an account ?{" "}
                  <Link
                    href="/auth/sign-in"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
                <div className='!h-[1px] bg-gray-500 mt-6 w-full'></div>
                <div className='mt-6 w-full flex justify-center'><GoogleButton onClick={() => handleGoogleSignIn()} /></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignUp