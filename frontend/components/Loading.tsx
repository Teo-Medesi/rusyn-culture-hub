import React from 'react'

const Loading = () => {
  return (
    <div className="absolute left-0 top-0 pointer-events-none w-screen h-screen flex justify-center items-center">
      <div className="loading-spinner loading loading-lg"></div>
    </div>
  )
}

export default Loading