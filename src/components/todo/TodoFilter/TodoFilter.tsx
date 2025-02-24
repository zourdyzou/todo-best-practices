// External imports
import { useState } from "react";

// Components
import { UserSelectField } from "@/components/user/UserSelectField/UserSelectField";
import { TodoSearch } from "../TodoSearch/TodoSearch";

// Stores
import { useFilterStore } from "@/lib/stores/filter.store";

export const TodoFilter = () => {
  const { setSelectedUserId } = useFilterStore();
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleUserChange = (value: string) => {
    setSelectedUser(value);
    setSelectedUserId(value === "all" ? null : parseInt(value));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <TodoSearch />
      </div>
      <UserSelectField
        value={selectedUser}
        onValueChange={handleUserChange}
        className="w-[200px]"
      />
    </div>
  );
};