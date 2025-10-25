export interface CommentType {
  id: string;
  author: string;
  time: string;
  content: string;
}

export interface CardType {
  id: string;
  title: string;
  comments: CommentType[];
}

export interface ListType {
  id: string;
  title: string;
  cards: CardType[];
}

export interface BoardState {
  title: string;
  lists: ListType[];
  setBoardTitle: (newTitle: string) => void;
  addList: (title: string) => void;
  removeList: (id: string) => void;
  updateListTitle: (id: string, newTitle: string) => void;
  addCard: (listId: string, title: string) => void;
  removeCard: (listId: string, cardId: string) => void;
  addComment: (listId: string, cardId: string, comment: CommentType) => void;
}
export interface ListProps {
  list: ListType;
}
