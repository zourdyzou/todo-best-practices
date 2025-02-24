// Components
import { TodoCreate } from "@/components/todo/TodoCreate/TodoCreate";
import { TodoList } from "@/components/todo/TodoList/TodoList";
import { TodoPagination } from "@/components/todo/TodoPagination/TodoPagination";
import { TodoSearch } from "@/components/todo/TodoSearch/TodoSearch";
import { UserSelect } from "@/components/user/UserSelect/UserSelect";

export default function HomePage() {
  return (
    <div className="container mx-auto py-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <TodoCreate />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <TodoSearch />
        </div>
        <UserSelect />
      </div>

      <TodoList />

      <TodoPagination />
    </div>
  );
}