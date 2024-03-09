"use client";
import { Loading, UserInfo } from "@/components";
import { useUser } from "@/context/UserContext";
import { auth } from "@/firebase.config";

export default async function Me() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loading />
  else if (user) {
    return (
      <div className="h-full flex items-center">
        {user && <UserInfo user={user} />}
      </div>
    )
  }
}