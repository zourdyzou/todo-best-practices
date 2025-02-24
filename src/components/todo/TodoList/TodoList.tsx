import { useEffect } from "react";

// API hooks
import { useTodos } from "@/api/apiHooks/useTodos";

// Components
import { Spinner } from "@/components/ui/spinner";
import { TodoItem } from "../TodoItem/TodoItem";
import { useTodoStore } from "@/lib/stores/todo.store";
import { useFilterStore } from "@/lib/stores/filter.store";
import { ErrorState } from "@/components/error/ErrorState/ErrorState";

export const TodoList = () => {
  const { todos, setTodos, currentPage, itemsPerPage } = useTodoStore();
  const { searchQuery } = useFilterStore();
  const { selectedUserId } = useFilterStore();

  const { data, isLoading, isError, error} = useTodos(
    (currentPage - 1) * itemsPerPage, // skip
    itemsPerPage, // limit
  );

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data, setTodos]);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.todo
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesUser = selectedUserId ? todo.userId === selectedUserId : true;
    return matchesSearch && matchesUser;
  });

  if (isError) {
    return <ErrorState description={error?.message} title="Failed to fetch todos" />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] rounded-lg border border-dashed">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Spinner size="lg" />
          <p>Loading todos...</p>
        </div>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px] rounded-lg border border-dashed">
        <p className="text-muted-foreground">No todos found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
