import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BoardState } from "@/types/type";
export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      title: "My Trello Board",
      lists: [
        { id: "default-1", title: "TODO", cards: [] },
        { id: "default-2", title: "In Progress", cards: [] },
        { id: "default-3", title: "Done", cards: [] },
      ],
      openModals: [],
      setIsModalOpen: (cardId, open) => {
        set((state) => ({
          openModals: open
            ? [...state.openModals, cardId]
            : state.openModals.filter((id) => id !== cardId),
        }));
      },
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
      removeAllCard: (listId) =>
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId ? { ...l, cards: [] } : l
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
