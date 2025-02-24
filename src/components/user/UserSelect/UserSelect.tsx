import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/lib/stores/user.store";
import { useUsers } from "@/api/apiHooks/useUsers";
import { useEffect } from "react";

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
      value={selectedUser?.id.toString()}
      onValueChange={(value) => {
        const user = users.find((u) => u.id.toString() === value);
        setSelectedUser(user || null);
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All Users</SelectItem>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id.toString()}>
            {user.firstName} {user.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
