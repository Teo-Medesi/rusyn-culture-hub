import { UserInfo } from "@/components";
import { getUser } from "@/utils";

export default async function Me() {
  const user = await getUser();

  if (user)
    return (
      <div className="h-full flex items-center">
        <UserInfo user={user} />
      </div>
    )
  else {
    return <div className="h-full flex flex-col gap-4 items-center">
      <h1 className="text-2xl">Not logged in</h1>
      <button className="btn btn-primary btn-wide">SIGN IN</button>
    </div>
  }
}