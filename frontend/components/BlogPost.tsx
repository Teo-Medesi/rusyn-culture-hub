import React from 'react'

const BlogPost = ({blogId}: { blogId: string }) => {
  return (
    <div>{blogId}</div>
  )
}

export default BlogPost