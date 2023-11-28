import React from 'react'

const CreateNewPost = () => {
  return (
    <div
      className="max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg shadow-shadowLight rounded-xl mt-16 px-6"
    >
      <div className="mt-3  sm:mt-5">
        <h1 className="text-xl text-gray-600 tracking-wider text-sm sm:text-md font-black">
          Create New Post
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          If possible, write the song's title and lyrics in Cyrillic, but the Latin script can also be used.
        </p>
      </div>
      <div className="mt-1 sm:mt-8">
        <form action="" className="flex-col flex w-full">
          <label htmlFor="judul" className="text-gray-700 text-xs sm:text-md">
            Song Title
          </label>
          <input
            name="judul"
            type="text"
            className="
                      w-full
                      h-4
                      sm:h-9
                      border-b-2 border-gray-300
                      focus:border-blue-300
                      outline-none
                  "
          />
          <label
            htmlFor="judul"
            className="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md"
          >
            Region / Country
          </label>
          <select className="select select-bordered w-full ">
            <option disabled selected>Where is this song played?</option>
            <option value="panonia">Panonia (Croatia & Serbia)</option>
            <option value="ukraine">Ukraine</option>
            <option value="slovakia">Slovakia</option>
            <option value="poland">Poland</option>
            <option value="romania">Romania</option>
            <option value="hungary">Hungary</option>
            <option value="other">Other</option>
          </select>
          <label
            htmlFor="judul"
            className="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md"
          >
            Lyrics
          </label>
          <textarea rows={5} className="textarea textarea-bordered" placeholder="Ей, Нє видно тот мой валал..."></textarea>
          <label htmlFor="judul" className="text-gray-700 text-xs sm:text-md mt-2">
            External Links
          </label>
          <input
            name="judul"
            type="text"
            className="
                      w-full
                      h-4
                      sm:h-9
                      border-b-2 border-gray-300
                      focus:border-blue-300
                      outline-none
                  "
          />
          <label htmlFor="judul" className="text-gray-700 text-xs sm:text-md mt-2">
            Sheet Music
          </label>
          <input type="file" className="file-input file-input-bordered w-full mt-2" />

        </form>
      </div>
      <div className="justify-center flex-col items-center mt-2 sm:mt-8 flex">
        <div className='flex gap-2 justify-center'>
          <button
            className="
            btn 
            max-w-1/3
            w-full
            btn-primary
          "
          >
            Post
          </button>
          <button
            className="
            btn
            max-w-1/3
            w-full
            btn-accent
            btn-outline
          "
          >
            Save Draft
          </button>
        </div>
        <p className="text-gray-600 text-xs my-2 sm:my-5 sm:text-md">
          By signing up you are agreeing to our
          <a href="#" className="text-black text-xs sm:text-md">
            Terms and Conditions
          </a>
        </p>
      </div>
    </div>

  )
}

export default CreateNewPost