"use server";

import { User, signOut, revokeAccessToken } from "firebase/auth";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { auth } from "@/firebase/firebase-admin.config";
import { revalidatePath } from "next/cache";

const getUser = async (): Promise<User | null> => {
  const cookieList = cookies().getAll();

  // getting only the ID token (auth-token) and not the refresh token (code-verifier)
  const token = cookieList.find(
    (cookie) =>
      cookie.name.includes("auth-token") &&
      !cookie.name.includes("code-verifier")
  );

  if (token) {
    const user: User = jwtDecode(token?.value);

    // check if ID token is valid, if not return null
    auth
      .verifyIdToken(token?.value)
      .then(() => {
        console.log("ID token verified at getUser(), index.ts");
        return user;
      })
      .catch(() => {
        console.log("Invalid ID token at getUser(), index.ts");
      });
  }

  return null;
};

const signUserOut = async (): Promise<void> => {
  revalidatePath("/");
};

export { getUser, signUserOut };
