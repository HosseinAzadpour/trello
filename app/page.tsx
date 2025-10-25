"use client";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import List from "@/components/List";
export default function Home() {
  const scrollRef = useHorizontalScroll();
  return (
    <main
      ref={scrollRef}
      className='h-screen overflow-x-auto overflow-y-hidden whitespace-nowrap'
    >
      <List title='TODO' />
    </main>
  );
}
