"use client";
import { X } from "lucide-react";
import CommentItem from "./CommentItem";
import { CommentsModalProps } from "@/types/type";
const CommentModal = ({
  title,
  comments,
  commentValue,
  setCommentValue,
  modalRef,
  autoFocusRef,
  commentsRef,
  handleOnClose,
  handleAddComment,
}: CommentsModalProps) => {
  return (
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
            onClick={handleOnClose}
          />
        </section>
        <section
          ref={commentsRef}
          className='flex flex-col gap-2 overflow-auto'
        >
          {comments.length > 0 ? (
            comments.map((item, i) => {
              return (
                <CommentItem
                  key={`comments-item-${i}`}
                  author={item.author}
                  time={item.time}
                  content={item.content}
                  id={item.id}
                />
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
            ref={autoFocusRef}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            className='w-full p-3'
            placeholder='Write a comment ...'
          />
          <button
            onClick={() => handleAddComment(commentValue)}
            className='bg-lime-600 hover:bg-lime-700 text-white py-2 px-3 rounded-md cursor-pointer duration-300'
          >
            Add Comment
          </button>
        </section>
      </div>
    </div>
  );
};

export default CommentModal;
