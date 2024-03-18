import React, { ChangeEvent, useState } from 'react';

interface FilesInputProps {
  name: string;
  onFilesChange: (files: File[]) => void;
  maxFileSize?: number;
}

const FilesInput = ({ name, onFilesChange, maxFileSize = 5 * 1024 * 1024 /* 5 MB */ }: FilesInputProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;

    if (files && files.length > 0) {
      const newFiles = Array.from(files);

      // TO-DO: Add error UI for when individual file sizes are exceeded
      if (maxFileSize) {
        const oversizedFiles = newFiles.filter(file => file.size > maxFileSize);
        if (oversizedFiles.length > 0) {
          console.error('One or more files exceed the allowed size');
          return;
        }
      }

      setSelectedFiles(newFiles);
      onFilesChange(newFiles);
    } else {
      setSelectedFiles([]);
      onFilesChange([]);
    }
  };

  return (
    <>
      <label
        className="text-gray-700 text-xs sm:text-md mt-4"
      >
        {name}
      </label>
      <input
        onChange={handleFilesChange}
        type="file"
        multiple
        className="file-input file-input-secondary file-input-bordered w-full mt-2"
      />
    </>
  );
};

export default FilesInput;
