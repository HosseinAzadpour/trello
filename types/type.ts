export interface CardType {
  id: string;
  title: string;
  comments: CommentType[];
}
export interface CardProps {
  title: string;
  comments: CommentType[] | [];
  listId: string;
  cardId: string;
}
export interface CommentType {
  id: string;
  author: string;
  time: string;
  content: string;
}
export interface CommentsModalProps {
  title: string;
  comments: CommentType[];
  commentValue: string;
  setCommentValue: (value: string) => void;
  modalRef: React.RefObject<HTMLDivElement | null>;
  commentsRef: React.RefObject<HTMLDivElement | null>;
  autoFocusRef: React.RefObject<HTMLTextAreaElement | null>;
  handleOnClose: () => void;
  handleAddComment: (value: string) => void;
}
export interface ListType {
  id: string;
  title: string;
  cards: CardType[];
}
export interface ListProps {
  list: ListType;
}

export interface BoardState {
  title: string;
  openModals: string[];
  setIsModalOpen: (cardId: string, open: boolean) => void;
  lists: ListType[];
  setBoardTitle: (newTitle: string) => void;
  addList: (title: string) => void;
  removeList: (id: string) => void;
  updateListTitle: (id: string, newTitle: string) => void;
  addCard: (listId: string, title: string) => void;
  removeCard: (listId: string, cardId: string) => void;
  removeAllCard: (listId: string) => void;
  addComment: (listId: string, cardId: string, comment: CommentType) => void;
}
