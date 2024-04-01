"use client";
import type { Post } from "@/types";
import Tag from "./Tag";
import { useRouter } from "next/navigation";
import { Option, SelectInput } from "./forms";
import { useDiscover } from "./Discover";
import { ChangeEvent } from "react";
import ukraine from "@/public/ukraine.svg";
import slovakia from "@/public/slovakia.svg";
import serbia from "@/public/serbia.svg";
import romania from "@/public/romania.svg";
import poland from "@/public/poland.svg";
import hungary from "@/public/hungary.svg";
import croatia from "@/public/croatia.svg";
import universal from "@/public/europe.svg";

const TableRow = ({ songTitle, region, tags, id }: Post) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`posts/${id}`);
  };

  const flagSrc = () => {
    switch (region) {
      case "ukraine":
        return ukraine.src;
      case "slovakia":
        return slovakia.src;
      case "romania":
        return romania.src;
      case "poland":
        return poland.src;
      case "hungary":
        return hungary;
      case "universal":
        return universal.src;
      default:
        return universal.src;
    }
  };

  return (
    <tr
      onClick={handleClick}
      className="hover:text-primary cursor-pointer border-b w-full last:border-b-0">
      <td className="py-4 w-1/3 pl-0">
        <div className="flex items-center">
          <div className="flex flex-col justify-start ">
            <p className="mb-1 px-2 font-semibold transition-colors duration-100 ease-in-out text-lg/normal text-secondary-inverse text-inherit">
              {songTitle}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-2 w-1/3 pr-0 text-start">
        {region === "panonia" ? (
          <div className="flex gap-2">
            <img src={serbia.src} className="w-8 aspect-square" alt="flag" />
            <img src={croatia.src} className="w-8 aspect-square" alt="flag" />
          </div>
        ) : (
          <img src={flagSrc()} className="w-8 aspect-square" alt="flag" />
        )}
      </td>
      <td className="hidden md:flex py-4 px-2 w-1/3 justify gap-2 pr-0 text-start">
        {tags?.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </td>
    </tr>
  );
};

const SongTable = ({ posts }: { posts: Post[] }) => {
  const { setFilter } = useDiscover();

  const regionOptions: Option[] = [
    { value: "panonia", displayText: "Panonia (Croatia & Serbia)" },
    { value: "ukraine", displayText: "Ukraine" },
    { value: "slovakia", displayText: "Slovakia" },
    { value: "poland", displayText: "Poland" },
    { value: "romania", displayText: "Romania" },
    { value: "hungary", displayText: "Hungary" },
    { value: "universal", displayText: "Universal" },
    { value: "other", displayText: "Other" },
    { value: "all", displayText: "All" },
  ];

  return (
    <div className="flex flex-wrap md:-mx-3 mb-5">
      <div className="w-full max-w-full md:px-3 mb-6 mx-auto">
        <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white md:m-5">
          <div className="relative flex flex-col min-w-0 break-words md:border md:bg-clip-border rounded-2xl md:border-stone-200 bg-light/30">
            <div className="md:px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 className="flex flex-col items-start justify-center md:m-2 ml-0 font-medium text-xl/tight text-dark">
                <span className="mr-3 font-semibold text-dark">
                  Ruthenian Song Lyrics
                </span>
              </h3>
              <div className="relative flex flex-wrap items-center my-2 gap-2 md:gap-4">
                {/* FILTER */}
                <SelectInput
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    setFilter((prevState) => ({
                      ...prevState,
                      alphabetical: event.target.value,
                    }))
                  }
                  defaultValue="ascending"
                  name="Sort by"
                  options={[
                    { displayText: "A-Z", value: "ascending" },
                    { displayText: "Z-A", value: "descending" },
                  ]}
                  className="w-full md:w-auto"
                />
                <SelectInput
                  name="Region"
                  options={regionOptions}
                  defaultValue="all"
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    setFilter((prevState) => ({
                      ...prevState,
                      region: event.target.value,
                    }))
                  }
                  className="w-full md:w-auto"
                />
              </div>
            </div>
            <div className="flex-auto block py-8 pt-6 md:px-9">
              <div className="overflow-x-auto">
                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                  <thead className="align-bottom">
                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                      <th className="pb-3 text-start w-1/3">SONG TITLE</th>
                      <th className="pb-3 text-start w-1/3">REGION</th>
                      <th className="hidden md:block pb-3 text-start w-1/3">TAGS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <TableRow key={index} {...post} />
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
