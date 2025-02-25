import { Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";

// Components
import { Input } from "@/components/ui/input";

// Stores
import { useFilterStore } from "@/lib/stores/filter.store";

export const TodoSearch = () => {
  const { setSearchQuery } = useFilterStore();
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  const handleClear = () => {
    setInputValue("");
    setSearchQuery("");
  };

  return (
    <div className="relative w-full">
      <Input
        startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
        placeholder="Search todos..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue && (
        <button
          className="absolute right-2.5 top-1/2 -translate-y-1/2"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
};
