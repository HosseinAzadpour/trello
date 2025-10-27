"use client";
import React from "react";
import CommentModal from "./CommentModal";
import { CardProps } from "@/types/type";
import { useCardLogic } from "@/hooks/useCardLogic";
import { useBoardStore } from "@/store/store";
const Card = ({ title, comments, listId, cardId }: CardProps) => {
  const {
    commentValue,
    setCommentValue,
    modalRef,
    commentsRef,
    autoFocusRef,
    handleOnClose,
    handleOnOpen,
    handleAddComment,
  } = useCardLogic(listId, cardId, comments.length);
  const isModalOpen = useBoardStore((state) => state.openModals);
  return (
    <>
      <div className='relative w-full bg-white rounded-sm break-all p-4 pb-12 whitespace-pre-line'>
        <p>{title}</p>
        <button
          onClick={handleOnOpen}
          className='bg-gray-200 py-1 px-2 rounded-sm absolute bottom-2 right-2 cursor-pointer'
        >
          Comments ({comments.length})
        </button>
      </div>
      {isModalOpen.includes(cardId) && (
        <CommentModal
          title={title}
          comments={comments}
          commentValue={commentValue}
          setCommentValue={setCommentValue}
          modalRef={modalRef}
          commentsRef={commentsRef}
          handleOnClose={handleOnClose}
          handleAddComment={handleAddComment}
          autoFocusRef={autoFocusRef}
        />
      )}
    </>
  );
};

export default React.memo(Card);
