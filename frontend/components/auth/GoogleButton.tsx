import { FaGoogle } from "react-icons/fa"

const GoogleButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick} className="p-3 btn btn-primary btn-circle">
      <FaGoogle className="w-full h-full" />
    </div>
  )
}

export default GoogleButton