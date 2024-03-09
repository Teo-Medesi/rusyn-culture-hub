"use client";
import { ChangeEvent, useState } from 'react';

interface Search {
    placeholder?: string; 
    onChange?: (search: string) => void;
    onSubmit?: (search: string) => void;
    className?: string;
}

const SearchComponent = ({placeholder, onChange, onSubmit, className} : Search) => {
    const [search, setSearch] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        if (onChange) onChange(event.target.value);
    }

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter" && onSubmit) {
            onSubmit(search);
        }
    }

    const handleClick = (event: any) => {
        event.preventDefault();

        if (onSubmit) onSubmit(search);
    }

  return (
      <div className={`${className} flex items-center mx-auto bg-white rounded-lg`}>
        <input
          className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
          placeholder={placeholder || "search"}
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleClick}
          className={`flex transition ease-in-out duration-500 items-center ${search.length > 0 ? 'bg-primary text-black' : 'bg-gray-500'} justify-center w-12 h-12 text-white rounded-r-lg`}
          disabled={search.length === 0}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>

  );
};

export default SearchComponent;
