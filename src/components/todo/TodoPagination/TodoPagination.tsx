// External imports
import { ChevronLeft, ChevronRight } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";

// Stores
import { useTodoStore } from "@/lib/stores/todo.store";

export const TodoPagination = () => {
  const { currentPage, itemsPerPage, totalTodos, setCurrentPage } = useTodoStore();

  const totalPages = Math.ceil(totalTodos / itemsPerPage);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={!canGoPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center gap-1 text-sm">
        <span className="text-muted-foreground">Page</span>
        <span className="font-medium">{currentPage}</span>
        <span className="text-muted-foreground">of</span>
        <span className="font-medium">{totalPages}</span>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={!canGoNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};