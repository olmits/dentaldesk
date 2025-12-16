"use client";

import React, { useRef, useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { useSearchStateContext } from "@/context/SearchProvider";
import { useSearchStateAction } from "@/hooks/useSearchStateAction";

export default function TreatmentsSearch() {
  const { search } = useSearchStateContext();
  const { setSearch } = useSearchStateAction();

  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearch(value);
    }, 200);
  };

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