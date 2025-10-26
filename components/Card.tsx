"use client";
import React, { useEffect, useState } from "react";
import { useBoardStore } from "@/store/store";
import CommentModal from "./CommentModal";
import { CardProps } from "@/types/type";
const Card = ({ title, comments, listId, cardId }: CardProps) => {
  const [showComments, setShowComments] = useState(false);
  const addComment = useBoardStore((state) => state.addComment);

  const handleAddComment = (content: string) => {
    addComment(listId, cardId, {
      id: String(Date.now()),
      author: "you",
      time: new Date().toLocaleString("en-US"),
      content,
    });
  };
  console.log("sss");
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
        <CommentModal
          title={title}
          comments={comments}
          onClose={() => setShowComments(false)}
          onAddComment={handleAddComment}
        />
      )}
    </>
  );
};

export default Card;
