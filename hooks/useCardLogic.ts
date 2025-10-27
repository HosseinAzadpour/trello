"use client";
import { useState } from "react";
import { useBoardStore } from "@/store/store";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useAutoScrollLastChild } from "@/hooks/useAutoScrollLastChild";
import { useAutoFocusScroll } from "./useAutoFocus";
export const useCardLogic = (
  listId: string = "0",
  cardId: string = "0",
  commentsLength: number = 0
) => {
  // Zustand actions
  const addComment = useBoardStore((state) => state.addComment);
  const setIsModalOpen = useBoardStore((state) => state.setIsModalOpen);

  // Local states

  const [commentValue, setCommentValue] = useState("");

  //handlers
  const handleOnClose = () => {
    setIsModalOpen(cardId, false);
  };
  const handleOnOpen = () => {
    setIsModalOpen(cardId, true);
  };

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
  const autoFocusRef = useAutoFocusScroll<HTMLTextAreaElement>(commentValue);

  return {
    setIsModalOpen,
    setCommentValue,
    commentValue,
    modalRef,
    autoFocusRef,
    commentsRef,
    handleAddComment,
    handleOnClose,
    handleOnOpen,
  };
};
