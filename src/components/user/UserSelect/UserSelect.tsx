// External imports
import { useEffect } from "react";

// API hooks
import { useUsers } from "@/api/apiHooks/useUsers";

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

// Stores
import { useUserStore } from "@/lib/stores/user.store";

export const UserSelect = () => {
  const { users, setUsers, selectedUser, setSelectedUser } = useUserStore();
  const { data, isLoading } = useUsers();

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  if (isLoading) {
    return (
      <div className="w-[200px] h-10 flex items-center justify-center rounded-md border border-input bg-background">
        <Spinner size="sm" />
      </div>
    );
  }

  return (
    <Select
      value={selectedUser?.id?.toString() || "all"} // Changed default value
      onValueChange={(value) => {
        if (value === "all") {
          setSelectedUser(null);
          return;
        }
        const user = users.find((u) => u.id.toString() === value);
        setSelectedUser(user || null);
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Users</SelectItem> {/* Changed from empty string to "all" */}
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id.toString()}>
            {user.firstName} {user.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};