"use server";

import { User, signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { auth } from "@/firebase.config";
import { revalidatePath } from "next/cache";

const getUser = async (): Promise<User | null> => {
  const token = cookies().get("sb-allqdhvtvglimqphvaat-auth-token");

  if (token) {
    const user = jwtDecode(token?.value);
    return user as User;
  }

  return null;
};

const signUserOut = async (): Promise<void> => {
  await signOut(auth);
  console.log("bruh");
  revalidatePath("/app");
};

export { getUser, signUserOut };
