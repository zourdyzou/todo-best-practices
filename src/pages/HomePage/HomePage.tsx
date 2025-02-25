// Components
import { TodoCreate } from "@/components/todo/TodoCreate/TodoCreate";
import { TodoFilter } from "@/components/todo/TodoFilter/TodoFilter";
import { TodoList } from "@/components/todo/TodoList/TodoList";
import { TodoPagination } from "@/components/todo/TodoPagination/TodoPagination";
import { TodoDialogProvider } from "@/context/TodoDialogContext";

export default function HomePage() {
  return (
    <TodoDialogProvider>
      <div className="container mx-auto py-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Todo List</h1>
          <TodoCreate />
        </div>

        <TodoFilter />

        <TodoList />

        <TodoPagination />
      </div>
    </TodoDialogProvider>
  );
}
