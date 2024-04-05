"use client";
import Markdown from "react-markdown";
import { encodeMarkdownForJSON } from "@/utils";
import { ChangeEvent, useState } from "react";
import { TextAreaInput, TextInput } from "./forms";
import { useUser } from "@/context/UserContext";
import { BlogPost } from "@/types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase.config";
import Link from "next/link";

const MarkdownInput = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [newPostId, setNewPostId] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { user, isLoading } = useUser();

  const handlePost = async () => {
    try {
      // perhaps an unneccesarry safeguard?
      if (user && !isLoading && !isSuccess) {
        // TO-DO Validate or preprocess data if needed
        const blogPost: BlogPost = {
          title,
          description,
          markdown: encodeMarkdownForJSON(markdown),
          userId: user.uid,
          coverImage
        };

        if (process.env.NEXT_PUBLIC_DEBUG) console.log(blogPost);

        const collectionRef = collection(db, "blogPosts");
        const result = await addDoc(collectionRef, blogPost);

        if (result) {
          // UI thing, show success alert
          setIsSuccess(true);
          setNewPostId(result.id);
        }
      }
    } catch (error: any) {
      console.error("Error creating new post:", error);
      setError(error);
    }
  };

  return (
    <>
      <div className='lg:hidden items-center flex-col h-[90vh] px-5 md:px-20 lg:px-5 bg-primary justify-center flex'>
        <h1 className='lg:text-center mb-4 text-4xl font-bold  text-white'>Unavailable on Mobile!</h1>
        <p className='text-white lg:text-center'>Please use a desktop computer or laptop in order to create blog posts!</p>
      </div>
      <div className="hidden lg:flex  h-full overflow-x-hidden">
        <div className="w-1/2 flex flex-col p-8">
          <div
            className={`fixed text-xl ml-8 mb-8 left-0 bottom-0 ${markdown.length < 500 || markdown.length > 20000
              ? "text-red-500"
              : "text-green-500"
              }`}>
            {markdown.length}
          </div>
          <TextInput className="mb-8 border-t-0 border-x-0 rounded-none !border-b !outline-none" name="Title" onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
          <TextInput placeholder="https://" className="mb-8 border-t-0 border-x-0 rounded-none !border-b !outline-none" name="Cover Image ( URL )" onChange={(e: ChangeEvent<HTMLInputElement>) => setCoverImage(e.target.value)} />
          <TextAreaInput placeholder="Meta descriptions improve SEO ratings and makes it easier for people to find your post!" className="mb-8 border-t-0 border-x-0 rounded-none !border-b !outline-none" name="Description (Optional) -> displayed as a meta description tag in google search listings" onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
          <textarea
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Start writing your markdown here!"
            name="markdown"
            className="w-full h-full outline-none"
          />
        </div>
        <div className="divider divider-horizontal "></div>
        <div className="p-8 w-1/2 relative">
          <button
            onClick={() => setIsPreview((current) => !current)}
            className="fixed btn btn-primary btn-alternative mr-8 mt-[10vh] right-0 top-0">
            {isPreview ? "Switch to Cheat Sheet" : "Switch to Preview"}
          </button>

          <button onClick={handlePost} className={`fixed btn btn-alternative btn-primary mr-10 mb-4 right-0 bottom-0 ${(markdown.length < 500 || markdown.length > 20000 || !title) && "btn-disabled"}`}>
            Post
          </button>

          {isPreview ? (
            <div className="flex flex-col">
              <Markdown className="prose mb-12">{`# ${title}`}</Markdown>
              {coverImage && <img className="w-full aspect-video mb-12" src={coverImage} alt="Cover Image" />}
              <Markdown className="prose mb-12 px-4 lg:px-0">{markdown}</Markdown>
            </div>
          ) : (
            <p className="mb-12 px-4 lg:px-0">
              <MarkdownCheatSheet />
            </p>
          )}

        </div>
      </div>
      <div
        role="alert"
        className={`alert z-10 flex justify-between fixed left-0 bottom-0 alert-success rounded-none transition duration-500 ease-in-out ${isSuccess ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
        <div className="flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Post successfully created!</span>
        </div>
        <Link href={`/app/blog/posts/${newPostId}`} className="btn">
          GO TO POST
        </Link>
      </div>
      <div
        role="alert"
        className={`alert z-10 alert-error flex justify-between fixed left-0 bottom-0 rounded-none transition duration-500 ease-in-out ${error ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
        <div className="flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>
            Couldn't create post! <span className="ml-4 italic">{error}</span>
          </p>
        </div>
        <Link href="/app" className="btn">
          GO TO HOME
        </Link>
      </div>
    </>
  );
};

const MarkdownCheatSheet = () => (
  <div className="prose">
    <h1>Markdown Cheat Sheet</h1>
    <h2>Text Formatting</h2>
    <ul>
      <li>
        <strong>Bold</strong>:{" "}
        <pre>
          {"**"}Bold Text{"**"}
        </pre>
      </li>
      <li>
        <em>Italic</em>:{" "}
        <pre>
          {"*"}Italic Text{"*"}
        </pre>
      </li>
      <li>
        <s>Strikethrough</s>:{" "}
        <pre>
          {"~~"}Strikethrough Text{"~~"}
        </pre>
      </li>
    </ul>
    <h2>Headings</h2>
    <h1>Heading 1</h1>
    <pre># Heading 1</pre>
    <h2>Heading 2</h2>
    <pre># Heading 2</pre>
    <h3>Heading 3</h3>
    <pre># Heading 3</pre>
    <h4>Heading 4</h4>
    <pre># Heading 4</pre>
    <h5>Heading 5</h5>
    <pre># Heading 5</pre>

    <h2>Lists</h2>
    <h3>Unordered List</h3>
    <pre>- Item 1 - Item 2 - Subitem 1 - Subitem 2</pre>
    <h3>Ordered List</h3>
    <pre>1. First Item 2. Second Item 1. Subitem 1 2. Subitem 2</pre>
    <h2>Links and Images</h2>
    <ul>
      <li>
        <strong>Links</strong>: <pre>{"[Link Text](URL)"}</pre>
      </li>
      <a href="#">Link</a>
      <li>
        <strong>Images</strong>: <pre>{"![Alt Text](Image URL)"}</pre>
      </li>
      <img
        src="https://images.unsplash.com/photo-1702893574757-e3b26e142b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNDI4NzkwNQ&ixlib=rb-4.0.3&q=80&w=1080"
        alt="example image"
        className="w-90 aspect-auto"
      />
    </ul>
    <h2>Blockquotes</h2>
    <pre>{">"} This is a blockquote.</pre>
    <pre>{">"} It can span multiple lines.</pre>
    <p className="pl-4 border-l-4 border-gray-400 italic">
      This is a blockquote.
    </p>
    <p className="pl-4 border-l-4 border-gray-400 italic">
      It can span multiple lines.
    </p>
    <h2>Horizontal Line</h2>
    <pre>---</pre>
    <div className="w-full h-[1px] bg-gray-400"></div>
    <h2>Tables</h2>
    <pre>
      {`| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        | `}
    </pre>
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
        </tr>
        <tr>
          <td>Cell 3</td>
          <td>Cell 4</td>
        </tr>
      </tbody>
    </table>
    <h2>Conclusion</h2>
    <p>
      This cheat sheet provides a quick reference to common Markdown syntax and
      formatting options. By familiarizing yourself with these elements, you can
      quickly and effectively create structured and formatted documents using
      Markdown.
    </p>
  </div>
);

export default MarkdownInput;