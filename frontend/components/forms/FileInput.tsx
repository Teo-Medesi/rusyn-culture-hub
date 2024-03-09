import React, { ChangeEventHandler, ChangeEvent, useState } from 'react'

interface FileInput {
  name: string;
  onFileChange: (file: File | null) => void;
  maxFileSize?: number;
}

const FileInput = ({ name, onFileChange, maxFileSize = 5 * 1024 * 1024 /* 5 MB */ }: FileInput) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (process.env.NEXT_PUBLIC_DEBUG) console.log(`File size: ${file.size}`)

      // TO-DO, add error UI for when file size is exceeded, for now we only have the debug console 
      if (maxFileSize && file.size > maxFileSize) {
        // Handle file size exceeded error
        console.error('File size exceeded');
        return;
      }

      setSelectedFile(file);
      onFileChange(file);
    } else {
      setSelectedFile(null);
      onFileChange(null);
    }
  };
  
  return (
    <>
      <label
        htmlFor="judul"
        className="text-gray-700 text-xs sm:text-md mt-4">
        Sheet Music
      </label>
      <input
        onChange={handleFileChange}
        type="file"
        className="file-input file-input-secondary file-input-bordered w-full mt-2"
      />
    </>
  )
}

export default FileInput