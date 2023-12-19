import { UserInfo } from "@/components";
import { getUser } from "@/utils";
import Link from "next/link";

export default async function Me() {
  const user = await getUser();
  console.log("user", user);

  if (user)
    return (
      <div className="h-full flex items-center">
        <UserInfo user={user} />
      </div>
    )
  else {
    return <div className="h-full flex flex-col justify-center gap-4 items-center">
      <h1 className="text-2xl">Not Signed In</h1>
      <Link href="/auth/sign-in" className="btn btn-primary btn-wide">SIGN IN</Link>
    </div>
  }
}