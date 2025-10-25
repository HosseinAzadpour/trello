import { Ellipsis } from "lucide-react";
import { Plus } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";
import Card from "./Card";
interface ListProps {
  title: string;
}
const List = ({ title }: ListProps) => {
  const [titleUpdate, setTitleUpdate] = useState(false);
  const [addCard, setAddCard] = useState(false);
  return (
    <div className='w-2xs h-auto  bg-gray-200 text-gray-900 flex flex-col justify-start items-center gap-4  rounded-sm '>
      <section className='w-full flex justify-between  p-3 '>
        {titleUpdate ? (
          <input value={title} />
        ) : (
          <p onClick={() => setTitleUpdate(true)}>{title}</p>
        )}
        <Ellipsis />
      </section>
      <section className='w-full px-3 flex flex-col items-center justify-start gap-2'>
        <Card
          title='Add Something'
          comments={[{ author: "d", time: "asdasdsaads", content: "ssss" }]}
        />
      </section>
      <section className='w-full '>
        {addCard ? (
          <div className='flex flex-wrap items-center p-3 gap-4'>
            <textarea
              autoFocus
              className=' resize-none p-3'
              placeholder='Enter a card title ...'
            />
            <button className='bg-lime-600 hover:bg-lime-700 text-white py-2 px-3 rounded-md cursor-pointer duration-300'>
              Create Card
            </button>
            <X
              className='hover:text-gray-500 cursor-pointer duration-300'
              onClick={() => setAddCard(false)}
            />
          </div>
        ) : (
          <div
            onClick={() => setAddCard(true)}
            className='w-full flex items-center justify-start p-3 gap-3 hover:bg-gray-400 transition duration-300 cursor-pointer'
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
