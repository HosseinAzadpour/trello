"use client";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import List from "@/components/List";
import { useBoardStore } from "@/store/store";
import { useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Plus } from "lucide-react";
import { X } from "lucide-react";

export default function Home() {
  const scrollRef = useHorizontalScroll();
  const { lists, title, setBoardTitle, addList } = useBoardStore();
  const [changeTitle, setChangeTitle] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [newList, setNewList] = useState(false);
  const titleRef = useClickOutside<HTMLDivElement>(() => {
    setChangeTitle(false);
  });
  const listRef = useClickOutside<HTMLDivElement>(() => {
    setNewList(false);
  });
  return (
    <main
      ref={scrollRef}
      className='h-screen overflow-x-auto overflow-y-hidden whitespace-nowrap flex flex-col items-start justify-start gap-8 p-8 bg-sky-700'
    >
      <div ref={titleRef} className='inline-block'>
        {changeTitle ? (
          <input
            autoFocus
            className=' text-3xl font-semibold text-black'
            style={{ width: `${title.length}ch` }}
            value={title}
            onChange={(e) => setBoardTitle(e.target.value)}
          />
        ) : (
          <h1
            onClick={() => setChangeTitle(true)}
            className='text-3xl font-semibold '
          >
            {title}
          </h1>
        )}
      </div>
      <div className='h-screen overflow-x-auto overflow-y-hidden whitespace-nowrap flex items-start justify-start gap-8 '>
        {lists.map((list, i) => {
          return <List key={`trello-list-${i}`} list={list} />;
        })}
        {newList ? (
          <div
            ref={listRef}
            className='flex w-2xs flex-wrap  items-center p-3 gap-4 bg-gray-200 rounded-md'
          >
            <input
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              className='w-full  text-black p-3'
            />
            <button
              className='bg-lime-600 hover:bg-lime-700 text-white py-2 px-3 rounded-md cursor-pointer duration-300'
              onClick={() => {
                newListTitle.length > 0 && addList(newListTitle);
                setNewListTitle("");
              }}
            >
              Add list
            </button>
            <X
              onClick={() => setNewList(false)}
              className='hover:text-gray-500 cursor-pointer duration-300 text-gray-700'
            />
          </div>
        ) : (
          <div
            onClick={() => setNewList(true)}
            className='bg-gray-200/10 flex p-2 gap-2 w-2xs rounded-md '
          >
            <Plus />
            <p>Add another list</p>
          </div>
        )}
      </div>
    </main>
  );
}
