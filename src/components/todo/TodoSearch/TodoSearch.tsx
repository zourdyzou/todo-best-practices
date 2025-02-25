// External imports
import { Search } from "lucide-react";

// Components
import { Input } from "@/components/ui/input";

// Stores
import { useFilterStore } from "@/lib/stores/filter.store";

export const TodoSearch = () => {
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <Input
      startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
      placeholder="Search todos..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};
