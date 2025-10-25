import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BoardState } from "@/types/type";
export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      title: "My Trello Board",
      lists: [
        { id: crypto.randomUUID(), title: "TODO", cards: [] },
        { id: crypto.randomUUID(), title: "In Progress", cards: [] },
        { id: crypto.randomUUID(), title: "Done", cards: [] },
      ],
      setBoardTitle: (newTitle) => set({ title: newTitle }),
      addList: (title) =>
        set((state) => ({
          lists: [
            ...state.lists,
            { id: crypto.randomUUID(), title, cards: [] },
          ],
        })),
      removeList: (id) =>
        set((state) => ({
          lists: state.lists.filter((l) => l.id !== id),
        })),
      updateListTitle: (listId: string, newTitle: string) =>
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId ? { ...l, title: newTitle } : l
          ),
        })),
      addCard: (listId, title) =>
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId
              ? {
                  ...l,
                  cards: [
                    ...l.cards,
                    { id: crypto.randomUUID(), title, comments: [] },
                  ],
                }
              : l
          ),
        })),
      removeCard: (listId, cardId) =>
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId
              ? { ...l, cards: l.cards.filter((c) => c.id !== cardId) }
              : l
          ),
        })),
      addComment: (listId, cardId, comment) =>
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId
              ? {
                  ...l,
                  cards: l.cards.map((c) =>
                    c.id === cardId
                      ? { ...c, comments: [...c.comments, comment] }
                      : c
                  ),
                }
              : l
          ),
        })),
    }),
    {
      name: "trello-storage",
    }
  )
);
