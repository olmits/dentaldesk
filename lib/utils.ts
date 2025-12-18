import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePaginationItems(currentPage: number, totalPages: number) {
  const items: (number | "ellipsis")[] = [];
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
  } else {
    items.push(1);
    
    if (currentPage <= 4) {
      for (let i = 2; i <= 5; i++) {
        items.push(i);
      }
      items.push("ellipsis");
      items.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      items.push("ellipsis");
      for (let i = totalPages - 4; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push("ellipsis");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        items.push(i);
      }
      items.push("ellipsis");
      items.push(totalPages);
    }
  }
  
  return items;
}