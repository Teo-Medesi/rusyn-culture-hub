import logo from "@/public/logo.svg"
import { SignInForm } from "@/components/auth"

export default async function SignIn() {
  return <SignInForm logo={logo} />
}