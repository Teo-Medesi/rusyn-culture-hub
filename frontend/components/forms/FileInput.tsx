import React, { ChangeEventHandler } from 'react'

interface FileInput {
  name: string;
  onChange: ChangeEventHandler;
  maxFileSize?: number;
}

const FileInput = ({ name, onChange, maxFileSize }: FileInput) => {
  return (
    <>
      <label
        htmlFor="judul"
        className="text-gray-700 text-xs sm:text-md mt-4">
        Sheet Music
      </label>
      <input
        type="file"
        className="file-input file-input-bordered w-full mt-2"
      />
    </>
  )
}

export default FileInput