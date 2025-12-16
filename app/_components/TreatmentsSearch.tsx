"use client";
import React, { useRef, useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { useSearchStateContext } from "@/context/SearchProvider";
import { useSearchStateAction } from "@/hooks/useSearchStateAction";

// interface SearchTreatmentProps {
//   search: string;
//   onSearchChange: (value: string) => void;
//   debounceMs?: number;
// }

export default function SearchTreatment() {
  const { search } = useSearchStateContext();
  const { setSearch } = useSearchStateAction();

  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update input value when search prop changes (for external updates)
  useEffect(() => {
    setInputValue(search);
  }, [search]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced search
    timeoutRef.current = setTimeout(() => {
      setSearch(value);
    }, 500);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Input
      placeholder="Search patients, procedures, dentists..."
      value={inputValue}
      onChange={handleChange}
    />
  );
}