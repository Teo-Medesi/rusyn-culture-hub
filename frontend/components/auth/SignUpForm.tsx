"use client";
import Image from 'next/image';
import { useState } from "react";
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

  const handleSignUp = (credentials: { email: string, password: string }, event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (email && password) {

      console.log(credentials);

      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in
        console.log(userCredential)
        console.log("succes")
        router.push("/");
      }).catch((error) => {
        setError(error.message);
      });
    }
  }

  // TO-DO: Add Google Sign In with Redirect for Mobile Users! Pop Up is not Prefferable for Mobile!
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider);
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
                Sign Up
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
                <button onClick={handleSignUp} className="w-full btn mt-4 btn-primary">
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
                <div className='mt-6 w-full flex justify-center'><GoogleButton onClick={handleGoogleSignIn} /></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignUp