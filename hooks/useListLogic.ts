"use client";
import { useCallback, useState } from "react";
import { useBoardStore } from "@/store/store";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useAutoScrollLastChild } from "@/hooks/useAutoScrollLastChild";

export const useListLogic = (listId: string, cardsLength: number) => {
  // Zustand actions
  const updateListTitle = useBoardStore((s) => s.updateListTitle);
  const addCard = useBoardStore((s) => s.addCard);
  const removeList = useBoardStore((s) => s.removeList);
  const removeAllCard = useBoardStore((s) => s.removeAllCard);

  // Local states
  const [titleUpdate, setTitleUpdate] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [newCardTitle, setNewCardtitle] = useState("");

  // Refs
  const titleRef = useClickOutside<HTMLDivElement>(() => setTitleUpdate(false));
  const addRef = useClickOutside<HTMLDivElement>(() => setNewCard(false));
  const optionRef = useClickOutside<HTMLDivElement>(() => setShowMore(false));
  const cardsRef = useAutoScrollLastChild<HTMLDivElement>([cardsLength]);

  //handlers
  const handleAddCard = useCallback(() => {
    if (newCardTitle.length > 0) addCard(listId, newCardTitle);
    setNewCardtitle("");
  }, [newCardTitle, addCard, listId]);

  return {
    updateListTitle,
    addCard,
    removeList,
    removeAllCard,
    titleUpdate,
    setTitleUpdate,
    newCard,
    setNewCard,
    showMore,
    setShowMore,
    newCardTitle,
    setNewCardtitle,
    titleRef,
    addRef,
    optionRef,
    cardsRef,
    handleAddCard,
  };
};
