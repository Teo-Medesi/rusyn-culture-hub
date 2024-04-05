import Bear from "@/public/bears/angry-bear.png"
import Image from "next/image"

const Forbidden = () => {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-4">
        <Image alt='Bear knitting something' src={Bear} className='w-full sm:shadow-xl sm:rounded-xl sm:w-2/5 lg:w-1/3 aspect-square' />
        <h1 className="text-4xl">403</h1>
        <p>You do not have access to this resource</p>
      </div>
    )
  }
  
  export default Forbidden