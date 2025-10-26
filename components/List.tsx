import { Ellipsis } from "lucide-react";
import { Plus } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";
import Card from "./Card";
import { ListProps } from "@/types/type";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useAutoScrollLastChild } from "@/hooks/useAutoScrollLastChild";
import { useBoardStore } from "@/store/store";

const List = ({ list }: ListProps) => {
  console.log("list", list);
  const { updateListTitle, addCard, removeList, removeAllCard } =
    useBoardStore();
  const [titleUpdate, setTitleUpdate] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [newCardTitle, setNewCardtitle] = useState("");
  const titleRef = useClickOutside<HTMLDivElement>(() => {
    setTitleUpdate(false);
  });
  const addRef = useClickOutside<HTMLDivElement>(() => {
    setNewCard(false);
  });
  const optionRef = useClickOutside<HTMLDivElement>(() => {
    setShowOption(false);
  });
  const cardsRef = useAutoScrollLastChild<HTMLDivElement>([list.cards.length]);
  return (
    <div className='relative w-2xs h-auto max-h-[75vh]   bg-gray-200 text-gray-900 flex flex-col justify-start items-center   rounded-sm '>
      <section
        ref={titleRef}
        className='relative w-full flex justify-between  p-3 '
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
          onClick={() => setShowOption(true)}
        />
        {showOption && (
          <div
            ref={optionRef}
            className='absolute left-7/8 top-full w-full z-10 bg-white rounded-sm  shadow-lg shadow-gray-500/50'
          >
            <div className='relative w-full flex justify-center border-b border-gray-400 text-gray-400 p-3'>
              <p>List Actions</p>
              <X
                className='absolute right-2 cursor-pointer hover:text-gray-500 duration-300'
                onClick={() => setShowOption(false)}
              />
            </div>
            <div className='w-full flec flex flex-col justify-start items-start gap-2 p-3 font-bold'>
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
      <section
        ref={cardsRef}
        className='w-full flex-1  overflow-y-auto  px-3 flex flex-col items-start  gap-2 scrollable-vertical'
      >
        {list.cards.map((card, i) => {
          return (
            <Card
              key={`card-${list.title}-${i}`}
              title={card.title}
              comments={card.comments}
              listId={list.id}
              cardId={card.id}
            />
          );
        })}
      </section>
      <section className='w-full '>
        {newCard ? (
          <div ref={addRef} className='flex flex-wrap items-center p-2 gap-4 '>
            <textarea
              value={newCardTitle}
              onChange={(e) => setNewCardtitle(e.target.value)}
              autoFocus
              className='w-full resize-none p-3'
              placeholder='Enter a card title ...'
            />
            <button
              onClick={() => {
                newCardTitle.length > 0 && addCard(list.id, newCardTitle);

                setNewCardtitle("");
              }}
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

export default List;
