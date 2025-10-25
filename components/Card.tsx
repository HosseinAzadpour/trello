import React, { useState } from "react";
import { X } from "lucide-react";
interface CardProps {
  title: string;
  comments: CommentsProps[] | [];
}
interface CommentsProps {
  author: string;
  time: string;
  content: string;
}
const Card = ({ title, comments }: CardProps) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <>
      <div className='relative w-full bg-white rounded-sm break-all p-4 pb-12 whitespace-pre-line'>
        <p>{title}</p>
        <button className='bg-gray-200 py-1 px-2 rounded-sm absolute bottom-2 right-2'>
          Comments (0)
        </button>
      </div>
      {showComments && (
        <div className='fixed flex flex-col xl:w-md  w-sm  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md p-3 gap-3'>
          <section className='w-full flex justify-between items-center'>
            <h5 className='text-xl font-extralight text-gray-800'>
              Comments for {`"${title}"`}
            </h5>
            <X />
          </section>
          <section>
            {comments.length > 0 ? (
              comments.map((item, i) => {
                return (
                  <div
                    key={`comments-item-${i}`}
                    className='bg-gray-200 p-1 rounded-sm'
                  >
                    <div className='text-gray-500 flex justify-start items-center gap-1 '>
                      <p>{item.author}</p>.<p>{item.time}</p>
                    </div>
                    <p>{item.content}</p>
                  </div>
                );
              })
            ) : (
              <div className='w-full p-2 bg-gray-200 rounded-sm'>
                No comments yet. Be the first to comment!
              </div>
            )}
          </section>
          <section className='w-full flex flex-col items-end justify-start gap-2'>
            <textarea
              className='w-full p-3'
              placeholder='Write a comment ...'
            />
            <button className='bg-lime-600 hover:bg-lime-700 text-white py-2 px-3 rounded-md cursor-pointer duration-300'>
              Add Comment
            </button>
          </section>
        </div>
      )}
    </>
  );
};

export default Card;
