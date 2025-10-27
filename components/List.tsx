"use client";
import React from "react";
import { Ellipsis, Plus, X } from "lucide-react";
import Card from "./Card";
import { ListProps } from "@/types/type";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useListLogic } from "@/hooks/useListLogic";
import { useBoardStore } from "@/store/store";
const List = ({ list }: ListProps) => {
  const {
    updateListTitle,
    removeList,
    removeAllCard,
    titleUpdate,
    setTitleUpdate,
    newCard,
    setNewCard,
    showMore,
    setShowMore,
    newCardTitle,
    setNewCardtitle,
    titleRef,
    addRef,
    optionRef,
    cardsRef,
    handleAddCard,
  } = useListLogic(list.id, list.cards.length);
  const openModals = useBoardStore((state) => state.openModals);
  return (
    <div className='relative w-2xs h-auto max-h-[75vh] bg-gray-200 text-gray-900 flex flex-col justify-start items-center rounded-sm'>
      {/* Title */}
      <section
        ref={titleRef}
        className='relative w-full flex justify-between p-3'
      >
        {titleUpdate ? (
          <input
            autoFocus
            value={list.title}
            onChange={(e) => updateListTitle(list.id, e.target.value)}
          />
        ) : (
          <p onClick={() => setTitleUpdate(true)}>{list.title}</p>
        )}
        <Ellipsis
          className='cursor-pointer'
          onClick={() => setShowMore(true)}
        />
        {showMore && (
          <div
            ref={optionRef}
            className='absolute left-7/8 top-full w-full z-10 bg-white rounded-sm shadow-lg shadow-gray-500/50'
          >
            <div className='relative w-full flex justify-center border-b border-gray-400 text-gray-400 p-3'>
              <p>List Actions</p>
              <X
                className='absolute right-2 cursor-pointer hover:text-gray-500 duration-300'
                onClick={() => setShowMore(false)}
              />
            </div>
            <div className='w-full flex flex-col justify-start items-start gap-2 p-3 font-bold'>
              <p className='cursor-pointer' onClick={() => removeList(list.id)}>
                Delete List
              </p>
              <p
                className='cursor-pointer'
                onClick={() => removeAllCard(list.id)}
              >
                Delete All Cards
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Cards */}
      <Droppable
        droppableId={list.id}
        type='CARD'
        isDropDisabled={openModals.length > 0}
      >
        {(provided) => (
          <section
            ref={(el) => {
              provided.innerRef(el);
              cardsRef.current = el as HTMLDivElement | null;
            }}
            {...provided.droppableProps}
            className='w-full flex-1 overflow-y-auto p-3  flex flex-col items-start gap-2 scrollable-vertical'
          >
            {list.cards.map((card, index) => (
              <Draggable
                key={card.id}
                draggableId={card.id}
                index={index}
                isDragDisabled={openModals.length > 0}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='w-full'
                  >
                    <Card
                      title={card.title}
                      comments={card.comments}
                      listId={list.id}
                      cardId={card.id}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>

      {/* Add card */}
      <section className='w-full'>
        {newCard ? (
          <div ref={addRef} className='flex flex-wrap items-center p-2 gap-4'>
            <textarea
              value={newCardTitle}
              onChange={(e) => setNewCardtitle(e.target.value)}
              autoFocus
              className='w-full resize-none p-3'
              placeholder='Enter a card title ...'
            />
            <button
              onClick={handleAddCard}
              className='bg-lime-600 hover:bg-lime-700 text-white py-2 px-3 rounded-md cursor-pointer duration-300'
            >
              Create Card
            </button>
            <X
              className='hover:text-gray-500 cursor-pointer duration-300'
              onClick={() => setNewCard(false)}
            />
          </div>
        ) : (
          <div
            onClick={() => setNewCard(true)}
            className='w-full flex items-center justify-start p-2 gap-3 hover:bg-gray-400 rounded-b-sm transition duration-300 cursor-pointer'
          >
            <Plus />
            <p> Add another card</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default React.memo(List);
