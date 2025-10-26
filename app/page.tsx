"use client";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import List from "@/components/List";
import { useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Plus, X } from "lucide-react";
import { useBoardLogic } from "@/hooks/useBoardLogic";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Board() {
  const { lists, title, setBoardTitle, addList, onDragEnd } = useBoardLogic();
  const scrollRef = useHorizontalScroll();
  const [changeTitle, setChangeTitle] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [newList, setNewList] = useState(false);
  const titleRef = useClickOutside<HTMLDivElement>(() => setChangeTitle(false));
  const listRef = useClickOutside<HTMLDivElement>(() => setNewList(false));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main
        ref={scrollRef}
        className='h-screen overflow-x-auto overflow-y-hidden whitespace-nowrap flex flex-col items-start justify-start gap-8 p-8 bg-sky-700'
      >
        <div ref={titleRef} className='inline-block'>
          {changeTitle ? (
            <input
              autoFocus
              className='text-3xl font-semibold text-black'
              style={{ width: `${title.length}ch` }}
              value={title}
              onChange={(e) => setBoardTitle(e.target.value)}
            />
          ) : (
            <h1
              onClick={() => setChangeTitle(true)}
              className='text-3xl font-semibold'
            >
              {title}
            </h1>
          )}
        </div>

        {/* لیست‌ها */}
        <Droppable
          droppableId='board'
          type='LIST'
          isDropDisabled={false}
          isCombineEnabled={true}
          ignoreContainerClipping={true}
          direction='horizontal'
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='h-screen overflow-x-auto overflow-y-hidden whitespace-nowrap flex items-start justify-start gap-8'
            >
              {lists.map((list, index) => (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='inline-block'
                    >
                      <Droppable
                        isDropDisabled={false}
                        isCombineEnabled={true}
                        ignoreContainerClipping={true}
                        droppableId={list.id}
                        type='CARD'
                        direction='vertical'
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className='inline-block'
                          >
                            <List list={list} />
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              {/* اضافه کردن لیست جدید */}
              {newList ? (
                <div
                  ref={listRef}
                  className='flex w-2xs flex-wrap items-center p-3 gap-4 bg-gray-200 rounded-md'
                >
                  <input
                    autoFocus
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    className='w-full text-black p-3'
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
                  className='bg-gray-200/10 flex p-2 gap-2 w-2xs rounded-md'
                >
                  <Plus />
                  <p>Add another list</p>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </main>
    </DragDropContext>
  );
}
