"use client";
import React from "react";
import { CommentType } from "@/types/type";
const CommentItem = ({ author, time, content, id }: CommentType) => {
  return (
    <div className='bg-gray-200 p-2 rounded-sm'>
      <div className='text-gray-500 flex justify-start items-center gap-1 '>
        <p>{author}</p>.<p>{time}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default React.memo(CommentItem);
