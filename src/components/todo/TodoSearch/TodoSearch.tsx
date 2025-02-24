// External imports
import { Search } from "lucide-react";

// Components
import { Input } from "@/components/ui/input";

// Stores
import { useUIStore } from "@/lib/stores/ui.store";

export const TodoSearch = () => {
  const { searchQuery, setSearchQuery } = useUIStore();

  return (
    <Input
      startIcon={<Search />}
      placeholder="Search todos..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};