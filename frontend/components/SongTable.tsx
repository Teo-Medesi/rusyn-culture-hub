"use client";
import type { Post } from "@/types"
import Link from "next/link";
import Tag from "./Tag";
import { useRouter } from "next/navigation";

const TableRow = ({ songTitle, region, tags, id }: Post) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`posts/${id}`)
  }
  
  return (
    <tr onClick={handleClick} className="cursor-pointer hover:bg-gray-100 border-b w-full border-dashed last:border-b-0">
      <td className="py-4 w-1/3 pl-0">
        <div className="flex items-center">
          <div className="flex flex-col justify-start">
            <p className="mb-1 px-2 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
              {songTitle}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-2 w-1/3 pr-0 text-start">
        <p className=" uppercase">{region}</p>
      </td>
      <td className="py-4 px-2 w-1/3 flex justify pr-0 text-start">
        {tags?.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </td>
    </tr>
  );
};

const SongTable = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-5">
      <div className="w-full max-w-full px-3 mb-6 mx-auto">
        <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
          <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                <span className="mr-3 font-semibold text-dark">Projects Deliveries</span>
              </h3>
              <div className="relative flex flex-wrap items-center my-2">
                <a
                  href="javascript:void(0)"
                  className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"
                >
                  See other projects
                </a>
              </div>
            </div>
            <div className="flex-auto block py-8 pt-6 px-9">
              <div className="overflow-x-auto">
                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                  <thead className="align-bottom">
                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                      <th className="pb-3 text-start w-1/3">SONG TITLE</th>
                      <th className="pb-3 text-start w-1/3">REGION</th>
                      <th className="pb-3 text-start w-1/3">TAGS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <TableRow key={index} {...post}/>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SongTable;
