"use client";
import { useState } from "react";
import { useBoardStore } from "@/store/store";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useAutoScrollLastChild } from "@/hooks/useAutoScrollLastChild";

export const useCardLogic = (
  listId: string = "0",
  cardId: string = "0",
  commentsLength: number = 0
) => {
  // Zustand actions
  const addComment = useBoardStore((state) => state.addComment);

  // Local states
  const [showComments, setShowComments] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  //handlers
  const handleOnClose = () => {
    setShowComments(false);
  };
  console.log("show", showComments);
  const handleAddComment = (content: string) => {
    addComment(listId, cardId, {
      id: String(Date.now()),
      author: "you",
      time: new Date().toLocaleString("en-US"),
      content,
    });
    setCommentValue("");
  };
  // Refs
  const modalRef = useClickOutside<HTMLDivElement>(handleOnClose);
  const commentsRef = useAutoScrollLastChild<HTMLDivElement>([commentsLength]);

  return {
    showComments,
    setShowComments,
    setCommentValue,
    commentValue,
    modalRef,
    commentsRef,
    handleAddComment,
    handleOnClose,
  };
};
