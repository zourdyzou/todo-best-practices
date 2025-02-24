// External imports
import { useEffect } from "react";

// API hooks
import { useTodos } from "@/api/apiHooks/useTodos";

// Components
import { Spinner } from "@/components/ui/spinner";
import { TodoItem } from "../TodoItem/TodoItem";

// Stores
import { useTodoStore } from "@/lib/stores/todo.store";
import { useUIStore } from "@/lib/stores/ui.store";
import { useUserStore } from "@/lib/stores/user.store";

export const TodoList = () => {
  const { todos, setTodos, currentPage, itemsPerPage } = useTodoStore();
  const { searchQuery } = useUIStore();
  const { selectedUser } = useUserStore();

  const { data, isLoading } = useTodos((currentPage - 1) * itemsPerPage, itemsPerPage);

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data, setTodos]);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.todo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUser = selectedUser ? todo.userId === selectedUser.id : true;
    return matchesSearch && matchesUser;
  });

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