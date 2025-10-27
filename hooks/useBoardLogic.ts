import { useBoardStore } from "@/store/store";
import { DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

export const useBoardLogic = () => {
  // Zustand actions
  const lists = useBoardStore((state) => state.lists);
  const addList = useBoardStore((state) => state.addList);
  const setBoardTitle = useBoardStore((state) => state.setBoardTitle);
  const title = useBoardStore((state) => state.title);
  //local states
  const [changeTitle, setChangeTitle] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [newList, setNewList] = useState(false);
  //handlers
  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    const newLists = [...lists];

    if (type === "LIST") {
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);
      useBoardStore.setState({ lists: newLists });
      return;
    }

    if (type === "CARD") {
      const sourceList = newLists.find((l) => l.id === source.droppableId);
      const destList = newLists.find((l) => l.id === destination.droppableId);
      if (!sourceList || !destList) return;

      const [movedCard] = sourceList.cards.splice(source.index, 1);
      destList.cards.splice(destination.index, 0, movedCard);

      useBoardStore.setState({ lists: newLists });
      return;
    }
  };
  const handleAddList = () => {
    newListTitle.length > 0 && addList(newListTitle);
    setNewListTitle("");
  };
  //refs
  const scrollRef = useHorizontalScroll();
  const listRef = useClickOutside<HTMLDivElement>(() => setNewList(false));
  const titleRef = useClickOutside<HTMLDivElement>(() => setChangeTitle(false));

  return {
    lists,
    title,
    changeTitle,
    setChangeTitle,
    setBoardTitle,
    newListTitle,
    setNewListTitle,
    newList,
    setNewList,
    addList,
    listRef,
    titleRef,
    scrollRef,
    onDragEnd,
    handleAddList,
  };
};
