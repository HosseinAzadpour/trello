import { useBoardStore } from "@/store/store";
import { DropResult } from "@hello-pangea/dnd";

export const useBoardLogic = () => {
  const lists = useBoardStore((state) => state.lists);

  const addList = useBoardStore((state) => state.addList);
  const setBoardTitle = useBoardStore((state) => state.setBoardTitle);
  const title = useBoardStore((state) => state.title);

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

  return { lists, title, setBoardTitle, addList, onDragEnd };
};
