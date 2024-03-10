"use client";
import type { Post } from "@/types"
import Link from "next/link";
import Tag from "./Tag";
import { useRouter } from "next/navigation";
import { SelectInput } from "./forms";
import { useDiscover } from "./Discover";
import { ChangeEvent } from "react";

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
  const { setFilter } = useDiscover();

  const handleSortChange = async (event: ChangeEvent<Element>) => {
    setFilter(prevState => ({...prevState, alphabetical: event.target.value}));
  }
  
  return (
    <div className="flex flex-wrap -mx-3 mb-5">
      <div className="w-full max-w-full px-3 mb-6 mx-auto">
        <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
          <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                <span className="mr-3 font-semibold text-dark">Ruthenian Song Lyrics</span>
              </h3>
              <div className="relative flex flex-wrap items-center my-2">
                <SelectInput onChange={(event) => handleSortChange(event)} defaultValue="ascending" name="Sort by" options={[{displayText: "A-Z", value: "ascending"}, {displayText: "Z-A", value: "descending"}]}/>
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
