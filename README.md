# Trello Clone — Next.js 16 + TypeScript

A modern Trello-like board management app built with **Next.js 16**, **React 19**, and **TypeScript**.  
This project demonstrates clean architecture, reusable hooks, smooth drag-and-drop interactions, and efficient state management with **Zustand**.

## About the Project

This app is a **lightweight clone of Trello**, designed to manage boards, lists, and cards in a visually intuitive way.  
It focuses on smooth animations, modular code, and flexibility — perfect as a learning project for modern React and Next.js developers.

### Key Highlights

- Clean and scalable folder structure  
- Drag & Drop with `@dnd-kit`  
- Real-time board updates and list reordering  
- Custom hooks for scrolling, click detection, and board logic  
- Zustand store for predictable, minimal state management  
- Fully responsive and styled with TailwindCSS

## Folder Structure

app/
├── layout.tsx # Global layout
├── page.tsx # Main board page
├── globals.css # Global styles
components/
├── Card.tsx
├── List.tsx
├── CommentItem.tsx
├── CommentModal.tsx
hooks/
├── useBoardLogic.ts
├── useClickOutside.ts
├── useHorizontalScroll.ts
├── useAutoScrollLastChild.ts
store/
├── store.ts
types/
├── type.ts

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/HosseinAzadpour/trello.git
   cd trello
2. **Install dependencies**
   npm install
3. **Run the development server**
   npm run dev
4. **Visit the app in your browser:**
    http://localhost:3000

## Custom Hooks

useBoardLogic – Handles all board state and logic

useListLogic – Handles all list state and logic

useCardLogic – Handles all card state and logic

useClickOutside – Detects clicks outside modals or dropdowns

useHorizontalScroll – Enables smooth horizontal scrolling for lists

useAutoScrollLastChild – Automatically scrolls to the latest added card or comment

useAutoFocusScroll- Automatically focus on new inputs and textareas and scroll to give a better view of the card

## Components

Card – Displays each individual card or task

List – Represents a list containing multiple cards

CommentItem – Renders user comments

CommentModal – Modal for adding or editing comments

## Technologies Used

Frontend: Next.js 16, React 19, TypeScript
UI Styling: TailwindCSS 4
State Management: Zustand
Drag & Drop: @hello-pangea/dnd (core, sortable, modifiers)
Icons: lucide-react
Linting: ESLint with Next.js config

## Preview

Here’s what the project offers:

Smooth drag-and-drop board experience

Elegant and minimal UI with Tailwind

Interactive modals and comment sections

Fully responsive for desktop and mobile

## Improvements

I used @hello-pangea/dnd instead of react-beautiful-dnd since it's a maintained and optimized fork, providing better performance and compatibility with the latest React versions.

Additionally, the board supports horizontal scrolling for easier navigation between lists, improving the overall user experience.

Keep new card input value when open another list's add new card section exactly similar to trello app.