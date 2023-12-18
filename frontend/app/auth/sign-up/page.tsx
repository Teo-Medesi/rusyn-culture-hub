import logo from "@/public/logo.svg"
import { SignUpForm } from "@/components/auth"

export default async function SignUp() {
  return <SignUpForm logo={logo} />
}