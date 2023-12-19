import { UserInfo } from "@/components";
import { auth } from "@/firebase.config";

export default async function Me() {
  const user = auth.currentUser;

  return (
    <div className="h-full flex items-center">
      {user && <UserInfo user={user} />}
    </div>
  )
}