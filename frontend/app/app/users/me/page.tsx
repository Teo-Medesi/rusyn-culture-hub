import { UserInfo } from "@/components";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Me() {
  const { user }: any = await getSession();

  return (
    <div className="h-full flex items-center">
      {user && <UserInfo user={user} />}
    </div>
  )
}