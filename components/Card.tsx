import React, { useState } from "react";
import { X } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useBoardStore } from "@/store/store";
import { useAutoScrollLastChild } from "@/hooks/useAutoScrollLastChild";

interface CardProps {
  title: string;
  comments: CommentsProps[] | [];
  listId: string;
  cardId: string;
}
interface CommentsProps {
  author: string;
  time: string;
  content: string;
}
const Card = ({ title, comments, listId, cardId }: CardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const { addComment } = useBoardStore();
  const modalRef = useClickOutside<HTMLDivElement>(() => {
    setShowComments(false);
  });
  const commentsRef = useAutoScrollLastChild<HTMLDivElement>([comments.length]);

  return (
    <>
      <div className='relative w-full bg-white rounded-sm break-all p-4 pb-12 whitespace-pre-line'>
        <p>{title}</p>
        <button
          onClick={() => setShowComments(true)}
          className='bg-gray-200 py-1 px-2 rounded-sm absolute bottom-2 right-2 cursor-pointer'
        >
          Comments ({comments.length})
        </button>
      </div>
      {showComments && (
        <div className='fixed w-screen h-screen left-0 top-0 flex items-center justify-center z-20 bg-black/50'>
          <div
            ref={modalRef}
            className=' flex flex-col xl:w-[30%] w-sm  bg-gray-100 rounded-md p-4 gap-3 max-h-4/5 '
          >
            <section className='w-full flex justify-between items-center'>
              <h5 className='text-xl font-extralight text-gray-800'>
                Comments for {`"${title}"`}
              </h5>
              <X
                className='cursor-pointer text-gray-400 size-4 hover:text-black'
                onClick={() => setShowComments(false)}
              />
            </section>
            <section
              ref={commentsRef}
              className='flex flex-col gap-2 overflow-auto'
            >
              {comments.length > 0 ? (
                comments.map((item, i) => {
                  return (
                    <div
                      key={`comments-item-${i}`}
                      className='bg-gray-200 p-2 rounded-sm'
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
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                className='w-full p-3'
                placeholder='Write a comment ...'
              />
              <button
                onClick={() => {
                  addComment(listId, cardId, {
                    id: String(Date.now()),
                    author: "you",
                    time: new Date().toLocaleString("en-US"),
                    content: commentValue,
                  }),
                    setCommentValue("");
                }}
                className='bg-lime-600 hover:bg-lime-700 text-white py-2 px-3 rounded-md cursor-pointer duration-300'
              >
                Add Comment
              </button>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
